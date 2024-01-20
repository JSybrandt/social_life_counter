import flask
import flask_socketio

import dataclasses

app = flask.Flask(__name__)
sio = flask_socketio.SocketIO(app, logger=True)
sio.init_app(app, cors_allowed_origins="*")

STARTING_LIFE = 20


@dataclasses.dataclass
class PlayerState:
    name: str
    life: int = STARTING_LIFE


class GameState:
    def __init__(self):
        self._players: dict[int, PlayerState] = {}

    def add_player(self, sid, name):
        self._players[sid] = PlayerState(name=name)

    def remove_player(self, sid):
        del self._players[sid]

    def modify_health(self, sid, delta):
        if sid not in self._players:
            raise ValueError("Player not found:", sid)
        self._players[sid].life += delta

    def update_name(self, sid, name):
        if sid not in self._players:
            raise ValueError("Player not found:", sid)
        self._players[sid].name = name

    def serialize(self):
        print(self._players)
        return {
            "players": [
                {"name": p.name, "life": p.life} for _, p in self._players.items()
            ]
        }


game_state = GameState()


@app.route("/")
def root():
    return "Hello world!"


def broadcast_state_update():
    flask_socketio.emit("update", game_state.serialize(), broadcast=True)


def log_event(event_name):
    print(flask.request.sid, ":", event_name)


@sio.on("connect")
def connect():
    log_event("connect")


@sio.on("disconnect")
def disconnect():
    log_event("disconnect")
    leave()


@sio.event
def join(data):
    log_event("join")
    if "name" not in data:
        raise ValueError("Expected join(data) to contain name")
    game_state.add_player(flask.request.sid, data["name"])
    broadcast_state_update()


@sio.event
def leave():
    log_event("leave")
    game_state.remove_player(flask.request.sid)
    broadcast_state_update()


@sio.event
def modify_health(data):
    log_event("modify_health")
    if "delta" not in data:
        raise ValueError("Expected modify_health(data) to contain delta")
    game_state.modify_health(flask.request.sid, data["delta"])
    broadcast_state_update()


@sio.event
def update_name(data):
    log_event("update_name")
    if "name" not in data:
        raise ValueError("Expected update_name(data) to contain name")
    game_state.update_name(flask.request.sid, data["name"])
    broadcast_state_update()


sio.run(app, port=3000, debug=True)

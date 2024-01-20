import flask
import flask_socketio

app = flask.Flask(__name__)
sio = flask_socketio.SocketIO(app, logger=True)
sio.init_app(app, cors_allowed_origins="*")


@app.route('/')
def root():
  return "Hello world!"

@sio.on('connect')
def connect():
  print("Connected!")

@sio.on('disconnect')
def disconnect():
  print("Disconnected!")

@sio.event
def ping(data):
  print("Ping!", data)
  ping._value += 1
  flask_socketio.emit('pong', {"text": f'pong ({ping._value})'}, broadcast=True)

ping._value = 0;

sio.run(app, port=3000, debug=True)

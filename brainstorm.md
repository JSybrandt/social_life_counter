# Social Life Counter

## Selling Point:

Me and my friends can track our FaB games, and see how our decks compare over
time.

## User Stories

### 2-Player

- Me and Jenna want to play a quick game of CC. I click "Create Game" and choose
    my deck. Jenna clicks "Join Game" and enters the presented code (or scans a
    QR code), then clicks her deck. On my phone I see "Jenna Joined" and on both
    phones we see each player's starting life.
- Jenna and I start to play, each of our phones shows our names and life totals.
    We decide to turn off my phone because it has low battery.
- I take my turn in the game and do 5 damange. Jenna taps (-5) on her side
    of her phone. This updates the big life number on her side.
- Later, we dispute the life totals, so we click a button to show the life
    history. It clearly shows the (-5) in context of all other life change
    events.
- Eventually, Jenna reaches zero life. We click "end game" and note that I won.
- Later Jenna and I view our respective profiles. We see a short description of
    the game metadata, and who won.

### N-Player

- Me, Jenna, Trevor, and Thomas start to play CC. Thomas clicks "Create Game"
    and the rest of us join by typing (or scaning) the code. We each see all
    player's life totals on our phones.
- I want to see my life more promenantly, so I change the layout to "1 vs N"
    this shows one life total prominently, and each other life total in a small
    area above. I click a button to swap player locations until my life total is
    in the right place. This does not impact other players.
- Jenna deals three damange to Trevor. Trevor presses (-1) three times, which
    aggregate to a (-3) value before applying to the life total. This update is
    immediately propagated to the other devices.

### Account Management

- I want to login, so I type my email in the login bar and click "login." I get
    an email with a 1-time-pass that I copy into the app.
- I want to test a new deck, so I click "new deck." I give the deck a name and
    some descriptive text, including a link to fabrary.
- I want to view my stats with my deck, so I click "stats" and view my stats
    page.
- I want to view my W/L ratio with Jenna, so I click "my stats." (and something
    happens on that page to let me compare with another user..."

## Requirements

- Must be compatible with all my friends phones. This implies web app?
- Must be responsive when using multiple devices. This implies Angular or
    something?
- Must store game stats like win/loss ratio, decks used per game, and metadata
    of games played. This implies a database?

## Layouts:

https://www.figma.com/file/AVadfTPEuhZmpEZfsBSbm9/Social-Life-Counter?type=design&node-id=1%3A58&mode=design&t=sByGOuy5sH1pbUI0-1

## RPC Flow

Login Initialize
Login Finalize
Game Create
Game Join
Game Start

### Websockets

If we want to be responsive in the game, then we need websockets to have rapid
updates.

Server in python:
https://www.piesocket.com/blog/python-websocket

Frontend:
https://tutorialedge.net/typescript/angular/angular-websockets-tutorial/

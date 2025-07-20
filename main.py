from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret'
socketio = SocketIO(app, cors_allowed_origins="*")

conn_count = 0

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    global conn_count
    print('Client connected:')
    conn_count += 1
    emit('CResponse', {'data': 'Connected!', 'count': conn_count})

@socketio.on('disconnect')
def handle_disconnect():
    conn_count -= 1
    print('Client disconnected:')

@socketio.on_error()
def error_handler(e):
    print(f'An error occurred: {e}')


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True) # allow_unsafe_werkzeug for development
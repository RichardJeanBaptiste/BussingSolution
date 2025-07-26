from flask import Flask, render_template
from login.routes import login_bp
from flask_socketio import SocketIO, emit, send, join_room, leave_room

app = Flask(__name__)
app.register_blueprint(login_bp)
app.config['SECRET_KEY'] = 'your_secret'
socketio = SocketIO(app, cors_allowed_origins="*")

conn_count = 0
is_busing = False

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    global conn_count
    print('Client connected:')
    conn_count += 1

    emit('CResponse', {'data': 'Connected!'})

    if is_busing:
        emit('start')

@socketio.on('test_signal')
def test_signal():
    print("Signal Recieved")
    emit('test_response', {'data': 'Response received'})
    
    
@socketio.on('start_signal')
def start_event():
    global is_busing
    print("Start event signaled")
    is_busing = True
    emit('start', broadcast=True)

@socketio.on('stop_signal')
def stop_event():
    global is_busing
    print("Stop event signaled")
    is_busing = False
    emit('stop', broadcast=True)

@socketio.on('bus_ready')
def bus_ready(bus_name):
    print(f'{bus_name} is ready')
    emit('bus_available', bus_name, broadcast=True)

@socketio.on('bus_return')
def bus_return(bus_name):
    print(f'{bus_name} is not ready')
    emit('bus_unavailable', bus_name, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect(reason):
    global conn_count
    conn_count -= 1
    print(f'Client disconnected: remaining connections : {conn_count} : reason : {reason}')

@socketio.on_error()
def error_handler(e):
    print(f'An error occurred: {e}')


if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True) # allow_unsafe_werkzeug for development
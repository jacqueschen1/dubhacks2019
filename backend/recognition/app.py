import socketio
import time

def main():
    # standard Python
    sio = socketio.Client()

    sio.connect('http://175.0.0.2:8080')
    print('my sid is', sio.sid)

    sio.emit('new-image', {'img': 'theimagestringgoeshere'})

if __name__ == '__main__':
    print("Helo world.")
    time.sleep(5)
    main()

impbase64.b64decode(ort socketio
import time

sio = socketio.Client()

@sio.on('process-image')
def on_message(data):
    print('Recognition service received image!')

def main():
    sio.connect('http://175.0.0.2:8080', namespaces=['/service_recognition'])


if __name__ == '__main__':
    #time.sleep(5)  #Delay so we know node is awake.
    #main()

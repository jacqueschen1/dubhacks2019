import socketio
from socketio.exceptions import ConnectionError
import time

sio = socketio.Client()

def decide_navigation(obj_data):
    navigation = None

    if obj_data['tagName'] != 'exit':
        if obj_data['center']['x'] < 0.3:
            navigation = 'wl'
        elif obj_data['center']['x'] > 0.7:
            navigation = 'wr'
        else:
            navigation = 'wa'
    else:
        if obj_data['center']['x'] < 0.3:
            navigation = 'el'
        elif obj_data['center']['x'] > 0.7:
            navigation = 'er'
        else:
            navigation = 'ea'

    return navigation

@sio.on('navigate', namespace='/service_navigator')
def on_navigate(session_id, data):
    navigate_details = []
    '''
        data: {
            objects [
                {
                    width,
                    height,
                    top,
                    left,
                    tagName
                }
            ]
        }
    '''
    for obj in data:
        obj_data = {
            'center': {
                'x': obj['boundingBox']['left'] + obj['boundingBox']['width'] / 2,
                'y': obj['boundingBox']['top'] + obj['boundingBox']['height'] / 2,
            },
            'ratio': {
                'x': obj['boundingBox']['width'],
                'y': obj['boundingBox']['height']
            },
            'tagName': obj['tagName']
        }

        navigation = decide_navigation(obj_data)
        navigate_details.append(navigation)

    sio.emit('return-navigator-details', {'session_id': session_id, 'payload': navigate_details}, namespace='/service_navigator')

def main():
    while True:
        try:
            sio.connect('http://175.0.0.2:8080', namespaces=['/service_navigator'])
            print("Started python navigator service.")
            break
        except ConnectionError:
            pass


if __name__ == '__main__':
    main()

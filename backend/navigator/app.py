import socketio
from socketio.exceptions import ConnectionError
import time

sio = socketio.Client()

def decide_navigation(obj_data):
    navigation = None

    if obj_data['tagName'] == 'exit':
        # Overhead
        if obj_data['center']['y'] < 0.2 and obj_data['ratio']['x'] > 0.3:
            navigation = {
                'text': 'Passing exit, keep going',
                'forward': 'forward',
                'turn': 'no',
            }
        # Centered, keep walking
        elif abs(obj_data['center']['x'] - 0.5) < 0.3:
            navigation = {
                'text': 'Keep walking forward',
                'forward': 'forward',
                'turn': 'no',
            }
    elif obj_data['tagName'] == 'washroom':
        # Close
        if obj_data['ratio']['x'] > 0.5:
            navigation = {
                'text': 'Entering washroom, keep going',
                'forward': 'yes',
                'turn': 'no',
            }
        # Centered, keep walking
        elif abs(obj_data['center']['x'] - 0.5) < 0.3:
            navigation = {
                'text': 'Keep walking forward',
                'forward': 'yes',
                'turn': 'no',
            }
    elif obj_data['tagName'] == 'washroom sign':
        # Overhead
        if obj_data['center']['y'] < 0.2 and obj_data['ratio']['x'] > 0.3:
            navigation = {
                'text': 'Entering washroom, keep going',
                'forward': 'forward',
                'turn': 'no',
            }
        # Centered, keep walking
        elif abs(obj_data['center']['x'] - 0.5) < 0.3:
            navigation = {
                'text': 'Keep walking forward',
                'forward': 'forward',
                'turn': 'no',
            }

    # Left or right
    # close, should turn left
    if obj_data['ratio']['x'] > 0.3 and obj_data['center']['x'] < 0.5:
        navigation = {
            'text': 'Turn left',
            'forward': 'no',
            'turn': 'left',
        }
    # close, should turn right
    elif obj_data['ratio']['x'] > 0.3 and obj_data['center']['x'] > 0.5:
        navigation = {
            'text': 'Turn right',
            'forward': 'no',
            'turn': 'right',
        }
    # not close, should inform user left
    elif obj_data['center']['x'] < 0.5:
        navigation = {
            'text': 'Keep walking, coming up on your left',
            'forward': 'yes',
            'turn': 'no',
        }
    # not close, should inform user right
    else:
         navigation = {
            'text': 'Keep walking, coming up on your right',
            'forward': 'yes',
            'turn': 'no',
        }
    
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
    for obj in data['objects']:
        obj_data = {
            'center': {
                'x': obj['left'] + obj['width'] / 2,
                'y': obj['top'] + obj['height'] / 2,
            },
            'ratio': {
                'x': obj['width'],
                'y': obj['height']
            },
            'tagName': obj['tagName']
        }

        navigation = decide_navigation(obj_data)
        navigate_details.append(navigation)

    sio.emit('navigate_details', session_id, navigate_details)

def main():
    while True:
        try:
            sio.connect('http://175.0.0.2:8080', namespaces=['/service_navigator'])
            break
        except ConnectionError:
            pass


if __name__ == '__main__':
    main()

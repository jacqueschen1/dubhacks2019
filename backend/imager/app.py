import socketio
from socketio.exceptions import ConnectionError
import cv2
import base64
import numpy as np
from datetime import datetime
import json


sio = socketio.Client()

@sio.on('process-bounding-box', namespace='/service_imager')
def on_bounding_box(session_id, data):
    img_name = str(session_id) + '-' +  datetime.now().strftime("%d-%b-%H:%M:%S") + '.jpg'
    
    encoded_data = data['img'].split(',')[1]
    nparr = np.fromstring(encoded_data.decode('base64'), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    height, width, _ = img.shape

    for obj in data['payload']:
        img = cv2.rectangle(img, \
            (obj['boundingBox']['left'] * width, obj['boundingBox']['top'] * height), \
            ((obj['boundingBox']['left'] + obj['boundingBox']['width']) * width, \
             (obj['boundingBox']['top'] + obj['boundingBox']['height']) * height), (255,0,0), 3)
    
    cv2.imwrite('../mediafiles/images' + img_name, img)
    with open('../mediafiles/images' + img_name + '.txt', 'w') as f:
        f.write(json.dumps(obj, indent=4))


def main():
    while True:
        try:
            sio.connect('http://175.0.0.2:8080', namespaces=['/service_imager'])
            break
        except ConnectionError:
            pass


if __name__ == '__main__':
    main()

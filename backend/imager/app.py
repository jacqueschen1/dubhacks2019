import socketio
from socketio.exceptions import ConnectionError
import cv2
import base64
import numpy as np
from datetime import datetime
import json
from io import BytesIO
from PIL import Image

sio = socketio.Client()

@sio.on('process-bounding-box', namespace='/service_imager')
def on_bounding_box(session_id, data):
    img_name = str(session_id) + '-' +  datetime.now().strftime("%d-%b-%H:%M:%S") + '.jpg'
    
    nparr = np.array(Image.open(BytesIO(base64.b64decode(data['img']))))
    img = cv2.cvtColor(nparr, cv2.COLOR_BGR2RGB)

    height, width, _ = img.shape

    for obj in data['payload']:
        tl = int(obj['boundingBox']['left'] * width), int(obj['boundingBox']['top'] * height)
        br = int((obj['boundingBox']['left'] + obj['boundingBox']['width']) * width), \
             int((obj['boundingBox']['top'] + obj['boundingBox']['height']) * height)
        img = cv2.rectangle(img, tl, br, (0,0,255), 3)
    
    cv2.imwrite('images/' + img_name, img)
    with open('images/' + img_name + '.txt', 'w') as f:
        f.write(json.dumps(data['payload'], indent=4))


def main():
    while True:
        try:
            sio.connect('http://175.0.0.2:8080', namespaces=['/service_imager'])
            print("Started python imager service.")
            break
        except ConnectionError:
            pass


if __name__ == '__main__':
    main()

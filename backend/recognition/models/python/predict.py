# The steps implemented in the object detection sample code:
# 1. for an image of width and height being (w, h) pixels, resize image to (w', h'), where w/h = w'/h' and w' x h' = 262144
# 2. resize network input size to (w', h')
# 3. pass the image to network and do inference
# (4. if inference speed is too slow for you, try to make w' x h' smaller, which defined in object_detection.py DEFAULT_INPUT_SIZE)
import sys
import tensorflow as tf
import numpy as np
from PIL import Image
from object_detection import ObjectDetection

import socketio
import time
from io import BytesIO
import base64

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

sio = socketio.Client()

MODEL_FILENAME = './models/model.pb'
LABELS_FILENAME = './models/labels.txt'


class TFObjectDetection(ObjectDetection):
    """Object Detection class for TensorFlow
    """

    def __init__(self, graph_def, labels):
        super(TFObjectDetection, self).__init__(labels)
        self.graph = tf.Graph()
        with self.graph.as_default():
            input_data = tf.placeholder(tf.float32, [1, None, None, 3], name='Placeholder')
            tf.import_graph_def(graph_def, input_map={"Placeholder:0": input_data}, name="")

    def predict(self, preprocessed_image):
        inputs = np.array(preprocessed_image, dtype=np.float)[:, :, (2, 1, 0)]  # RGB -> BGR

        with tf.Session(graph=self.graph) as sess:
            output_tensor = sess.graph.get_tensor_by_name('model_outputs:0')
            outputs = sess.run(output_tensor, {'Placeholder:0': inputs[np.newaxis, ...]})
            return outputs[0]

@sio.on('process-image', namespace='/service_recognition')
def on_message(session_id, image_base64):
    print('Recognition service received image!')

    # Load a TensorFlow model
    graph_def = tf.GraphDef()
    with tf.gfile.FastGFile(MODEL_FILENAME, 'rb') as f:
        graph_def.ParseFromString(f.read())

    # Load labels
    with open(LABELS_FILENAME, 'r') as f:
        labels = [l.strip() for l in f.readlines()]

    od_model = TFObjectDetection(graph_def, labels)

    #image = Image.open(image_filename)
    image = Image.open(BytesIO(base64.b64decode(image_base64)))
    predictions = od_model.predict_image(image)

    sio.emit('return-process-image', {'session_id': session_id, 'payload': predictions}, namespace='/service_recognition')

def main():
    sio.connect('http://175.0.0.2:8080', namespaces=['/service_recognition'])
    print("Started python recognition service.")

if __name__ == '__main__':
    time.sleep(3)
    main()
    #if len(sys.argv) <= 1:
    #    print('USAGE: {} image_filename'.format(sys.argv[0]))
    #else:
    #    main(sys.argv[1])

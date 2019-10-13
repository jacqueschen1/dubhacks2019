import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { 
    StyleSheet, 
    View, 
    Text,
    Platform,
    Button
} from 'react-native';
import { subscribeToSocket, sendImage } from './Socket';
import styles from './Styles';

class CameraView extends Component {
    camera = null;

    constructor(){
        super();
        subscribeToSocket((err, message) => this.setState({ 
            message
          }));
	    this.state = {

            interval : null,

            hasCameraPermission: null,
            connection: '',
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            ratios: [],
            newPhotos: false,
            pictureSize: undefined,
            pictureSizes: [],
            pictureSizeId: 0,
            message: '',
        };
        this.photo = null;
    }

    async componentWillMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = camera.status === 'granted';
        this.setState({ hasCameraPermission});
    }

    start = () => {
        var ival = setInterval(() => {this.takeAndSend();}, 2200);

        this.setState({
            interval: ival,
        });
    }

    stop = () => {
        clearInterval(this.state.interval);
        this.setState({
            interval : null,
        });
    }
    

    takeAndSend = () => {
        this.takePicture();
        sendImage(this.photo);
    } 

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({quality: 0.82 ,base64: true, onPictureSaved: this.onPictureSaved });
        }
    };

    onPictureSaved = async photoo => {
        this.photo = photoo.base64
        this.setState({ newPhotos: true });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (this.state.hasCameraPermission == false) {
            return <Text>Access to camera has been denied.</Text>;
        } else if (this.state.hasCameraPermission == null) {
            return <View/>
        }

        return (
        <View style={{ flex: 1 }}>
            <Camera
            ref={ref => {
                this.camera = ref;
            }}
                style={styles.camera}
                onCameraReady={this.collectPictureSizes}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                pictureSize={this.state.pictureSize}
                onMountError={this.handleMountError}
            >
            {/* {this.renderTopBar()}
            {this.renderBottomBar()} */}
            </Camera>
            
            <Button 
               style={styles.imageButton}
               title="Start" 
               onPress={() => this.start()}/> 
            
            <Button 
               style={styles.imageButton}
               title="Stop" 
               onPress={() => this.stop()}/> 

        </View>
        );
    }
    
    collectPictureSizes = async () => {
        if (this.camera) {
          const pictureSizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio);
          let pictureSizeId = 0;
          if (Platform.OS === 'ios') {
            pictureSizeId = pictureSizes.indexOf('High');
          } else {
            // returned array is sorted in ascending order - default size is the largest one
            pictureSizeId = pictureSizes.length-1;
          }
          this.setState({ pictureSizes, pictureSizeId, pictureSize: pictureSizes[pictureSizeId] });
        }
      };

    handleMountError = ({ message }) => console.error(message);
    
}
  
export default CameraView;

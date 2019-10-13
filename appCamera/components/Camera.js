import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { 
    StyleSheet, 
    View, 
    Text,
    Platform,
    TouchableOpacity
} from 'react-native';
import { 
    Octicons
  } from '@expo/vector-icons';

import styles from './Styles';

class CameraView extends Component {
    camera = null;

    constructor(){
	    super();
	    this.state = {
            hasCameraPermission: null,
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
        }
    }

    async componentWillMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = camera.status === 'granted';
        this.setState({ hasCameraPermission });
    }

    takePicture = () => {
        if (this.camera) {
          this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
    };

    onPictureSaved = async photo => {
        await FileSystem.moveAsync({
          from: photo.uri,
          to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
        });
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

            <TouchableOpacity style={styles.bottomButton} onPress={this.takePicture}>
                <Text> Take picture </Text>
            </TouchableOpacity>

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

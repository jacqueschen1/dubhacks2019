import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, Text } from 'react-native';
import styles from './Styles';

class CameraView extends Component {
    camera = null;

    constructor(){
	    super();
	    this.state = {
            hasCameraPermission: null,
        }
    }

    async componentWillMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = camera.status === 'granted';
        this.setState({ hasCameraPermission });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View>
                <Camera 
                style={styles.preview}
                ref={camera => this.camera = camera}></Camera>
            </View>
        );
    }
}
  
export default CameraView;

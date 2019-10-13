import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { StyleSheet, View, Text, Button } from 'react-native';
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
            hasCameraPermission: null,
            connection: '',
        }
    }

    async componentWillMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = camera.status === 'granted';
        this.setState({ hasCameraPermission});
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
                <Button 
                    style={styles.imageButton}
                    title="imageSend" 
                    onPress={sendImage()}/> 
            </View> 
        );
    }
}
  
export default CameraView;

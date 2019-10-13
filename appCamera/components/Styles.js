import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    camera: {
        height: winHeight - 200,
        width: winWidth,
        left: 0,
        top: 0,
        right: 0,
        bottom: 200,
    },

    bottomButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        height: 100,
        width: winWidth,
      },
});
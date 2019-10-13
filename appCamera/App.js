import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CameraView from './components/Camera';

export default function App() {
  return (
    <View>
      <CameraView></CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraView from './components/Camera';
import styles from './components/Styles';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default function App() {
  return (
    <View style={styles.container}>
      <CameraView></CameraView>
    </View>
  );
}


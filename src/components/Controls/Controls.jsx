import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

import {Colors} from 'react-native-ui-lib';
import {Home, Left, Right} from './Buttons';

export const Controls = ({
  onLeftPress,
  onRightPress,
  onHomePress,
  isHomeEnabled,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onLeftPress} hitSlop={30}>
          <Left />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={isHomeEnabled ? onHomePress : () => true}
          hitSlop={30}>
          <Home color={isHomeEnabled ? Colors.button : Colors.disabledButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onRightPress} hitSlop={30}>
          <Right />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

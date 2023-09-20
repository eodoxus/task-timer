import React from 'react';
import {TouchableOpacity, StyleSheet, View, SafeAreaView} from 'react-native';

import {Colors} from 'react-native-ui-lib';
import {Home, Left, Right} from './Buttons';

export const Controls = ({
  onLeftPress,
  onRightPress,
  onHomePress,
  onHomeLongPress,
  isHomeEnabled,
}) => {
  const styles = createStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={onLeftPress} hitSlop={30}>
          <Left />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={isHomeEnabled ? onHomePress : () => true}
          onLongPress={onHomeLongPress}
          hitSlop={30}>
          <Home color={isHomeEnabled ? Colors.button : Colors.disabledButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onRightPress} hitSlop={30}>
          <Right />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
    },
    button: {
      flex: 1,
      alignItems: 'center',
    },
  });

import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {stopChime} from '../store/countdown';
import {toggleInterval} from '../store/tasks';

const Bubble = ({interval, isFilled, showLine}) => {
  const {date, hour, quarter, slot} = interval;

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(toggleInterval({date, hour, quarter, slot}));
    dispatch(stopChime());
  };

  const ovalStyles = [styles.oval];
  if (isFilled) {
    ovalStyles.push(styles.filled);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={() => handlePress()} hitSlop={10}>
        {({pressed}) => (
          <>
            {showLine && <View style={styles.line} />}
            <View style={ovalStyles}>
              {pressed && <View style={styles.pressed} />}
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 38,
    marginLeft: 10,
  },
  oval: {
    borderRadius: 20,
    borderWidth: 1,
    width: '100%',
    height: 30,
    borderColor: Colors.$outlineDisabled,
    backgroundColor: Colors.$backgroundNeutral,
  },
  pressed: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  filled: {
    backgroundColor: Colors.filledBubble,
    borderColor: Colors.filledBubble,
  },
  line: {
    width: 2,
    height: 51,
    position: 'absolute',
    top: -10,
    left: 19,
    backgroundColor: Colors.quarterLine,
    zIndex: 1,
  },
});

export default Bubble;

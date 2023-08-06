import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {stopChime, useQuarter} from '../../store/countdown';
import {createBubble, deleteBubble, useBubble} from '../../store/tasks';

const Bubble = ({date, hour, slot, quarter}) => {
  const dispatch = useDispatch();
  const shouldShowLine = quarter === useQuarter();
  const bubble = useBubble({date, hour, slot, quarter});

  const handlePress = () => {
    dispatch(stopChime());
    dispatch(
      bubble ? deleteBubble(bubble) : createBubble({date, hour, slot, quarter}),
    );
  };

  const ovalStyles = [styles.oval];
  if (bubble) {
    ovalStyles.push(styles.filled);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={() => handlePress()} hitSlop={10}>
        {({pressed}) => (
          <>
            {shouldShowLine && <View style={styles.line} />}
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

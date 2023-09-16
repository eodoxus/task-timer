import React, {useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {
  stopAlarm,
  useDate,
  useHour,
  useQuarter,
} from '../../../../store/countdown';
import {createBubble, deleteBubble, useBubble} from '../../../../store/tasks';

const Bubble = ({date, hour, slot, quarter}) => {
  const dispatch = useDispatch();
  const bubble = useBubble({date, hour, slot, quarter});
  const currentDate = useDate();
  const currentHour = useHour();
  const currentQuarter = useQuarter();
  const shouldShowLine =
    date === currentDate && hour === currentHour && quarter === currentQuarter;

  const handlePress = useCallback(() => {
    dispatch(stopAlarm());
    dispatch(
      bubble ? deleteBubble(bubble) : createBubble({date, hour, slot, quarter}),
    );
  }, [bubble, date, dispatch, hour, quarter, slot]);

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
    width: 30,
    marginLeft: 5,
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
    height: 41,
    position: 'absolute',
    top: -5,
    left: 15,
    backgroundColor: Colors.quarterLine,
    zIndex: 1,
  },
});

export default Bubble;

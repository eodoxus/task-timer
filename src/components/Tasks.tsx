import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Task} from './Task';
import {useDate, useHour} from '../store/countdown';
import {
  generateRange,
  getCurrentHourDirection,
  makeFindTask,
  createTasksForDateIfNoneExist,
} from '../utils/tasks';
import {upsertTask, useTasks} from '../store/tasks';
import {formatDate, formatHourWindow, nextDate, prevDate} from '../utils/time';
import {Controls} from './Controls';
import {useDispatch} from 'react-redux';

const NUM_TASK_SLOTS = 18;
const PAGINATION_HOUR_OFFSETS = [-1, 0, 1];
const VIEWPORT_WIDTH = Dimensions.get('window').width;

export const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const horizontalScrollViewRef = useRef(null);
  const currentDate = useDate();
  const currentHour = useHour();
  const tasks = useTasks();
  const isNavEnabledRef = useRef(true);
  const [visibleDate, setVisibleDate] = useState(currentDate);
  const [visibleHour, setVisibleHour] = useState(currentHour);

  const findTask = makeFindTask(tasks);
  const prevHour = () => visibleHour - 1;
  const nextHour = () => visibleHour + 1;

  const handleScrollEnd = event => {
    const isRightSwipe = event.nativeEvent.contentOffset.x < VIEWPORT_WIDTH;
    if (isNavEnabledRef.current) {
      navigateTo(isRightSwipe ? prevHour() : nextHour());
    }
    isNavEnabledRef.current = true;
  };

  const navigateTo = (hour: number) => {
    if (hour < 0) {
      hour = 23;
      setVisibleDate(prevDate(visibleDate));
    } else if (hour > 23) {
      hour = 0;
      setVisibleDate(nextDate(visibleDate));
    }

    setVisibleHour(hour);
    scrollTo(VIEWPORT_WIDTH, false);
  };

  const scrollTo = (offset: number, animated = true) => {
    horizontalScrollViewRef.current?.scrollTo({x: offset, y: 0, animated});
    horizontalScrollViewRef.current?._children?.[0]?._children?.forEach(c =>
      c.scrollTo({x: 0, y: 0, animated: false}),
    );
  };
  const scrollToPrevHour = () => scrollTo(0);
  const scrollToNextHour = () => scrollTo(VIEWPORT_WIDTH * 2);

  const scrollToCurrentHour = () => {
    isNavEnabledRef.current = false;
    if (
      getCurrentHourDirection({
        visibleDate,
        currentDate,
        visibleHour,
        currentHour,
      }) === 'next'
    ) {
      scrollToNextHour();
    } else {
      scrollToPrevHour();
    }

    setTimeout(() => {
      setVisibleDate(currentDate);
      navigateTo(currentHour);
    });
  };

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }

    createTasksForDateIfNoneExist({date: visibleDate, tasks}).forEach(t =>
      dispatch(upsertTask({date: visibleDate, slot: t.slot, title: t.title})),
    );
  }, [dispatch, tasks, visibleDate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}>{formatDate(visibleDate)}</Text>
        <Text style={styles.hourWindow}>{formatHourWindow(visibleHour)}</Text>
      </View>

      <View style={styles.viewport}>
        <ScrollView
          ref={horizontalScrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={handleScrollEnd}
          keyboardDismissMode="on-drag"
          contentOffset={{x: VIEWPORT_WIDTH, y: 0}}>
          {PAGINATION_HOUR_OFFSETS.map(hourOffset => (
            <ScrollView key={visibleHour + hourOffset}>
              <View style={styles.tasks}>
                {generateRange(NUM_TASK_SLOTS).map(slot => (
                  <Task
                    key={slot}
                    slot={slot}
                    date={visibleDate}
                    hour={visibleHour + hourOffset}
                    title={findTask({date: visibleDate, slot})?.title || ''}
                  />
                ))}
              </View>
            </ScrollView>
          ))}
        </ScrollView>
      </View>

      <View style={styles.controls}>
        <Controls
          onLeftPress={scrollToPrevHour}
          onRightPress={scrollToNextHour}
          onHomePress={scrollToCurrentHour}
          isHomeEnabled={
            visibleDate !== currentDate || visibleHour !== currentHour
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '60%',
  },
  dateTimeContainer: {
    top: -25,
    width: '100%',
  },
  date: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'absolute',
    left: 5,
  },
  hourWindow: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'absolute',
    right: 5,
    width: 120,
    textAlign: 'right',
  },
  viewport: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    backgroundColor: Colors.$backgroundNeutralLight,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  tasks: {
    width: VIEWPORT_WIDTH,
  },
  controls: {
    marginTop: 20,
    width: '100%',
  },
});

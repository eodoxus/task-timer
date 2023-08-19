import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {useDate, useHour} from '../../store/countdown';
import {
  createTasksForDateIfNoneExist,
  getCurrentHourDirection,
  makeGetTasksForDate,
} from '../../utils/tasks';
import {
  formatDate,
  formatHourWindow,
  nextDate,
  prevDate,
} from '../../utils/time';
import {Controls} from './Controls';
import {COUNTDOWN_HEIGHT} from '../../utils/constants';
import {Tasks} from './Tasks/Tasks';
import {upsertTask, useTasks} from '../../store/tasks';

const VIEWPORT_WIDTH = Dimensions.get('window').width;

export const NavigatorView: React.FC = () => {
  const dispatch = useDispatch();
  const horizontalScrollViewRef = useRef(null);
  const currentDate = useDate();
  const currentHour = useHour();
  const tasks = useTasks();
  const isNavEnabledRef = useRef(true);
  const [visibleDate, setVisibleDate] = useState(currentDate);
  const [visibleHour, setVisibleHour] = useState(currentHour);

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

  const getTasksForDate = makeGetTasksForDate(tasks);

  return (
    <View style={styles.container}>
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
          <Tasks
            date={visibleDate}
            hour={visibleHour}
            tasks={getTasksForDate(visibleDate)}
          />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - COUNTDOWN_HEIGHT,
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
    borderTopWidth: 2,
    borderColor: Colors.$outlineDefault,
    backgroundColor: Colors.$backgroundNeutralLight,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  tasks: {
    width: VIEWPORT_WIDTH,
    paddingBottom: 0,
  },
  controls: {
    borderTopWidth: 2,
    borderColor: Colors.$outlineDefault,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 10,
    backgroundColor: Colors.$backgroundNeutral,
  },
});

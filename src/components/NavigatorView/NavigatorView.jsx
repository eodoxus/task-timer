import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
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
import {RollupView} from './RollupViews';
import {useAppBackgrounded} from '../../hooks';

const VIEWPORT_WIDTH = Dimensions.get('window').width - 2;
const VIEW_MODE_BUBBLES = 0;
const VIEW_MODE_ROLLUPS = 1;

export const NavigatorView = () => {
  const dispatch = useDispatch();
  const currentDate = useDate();
  const currentHour = useHour();
  const horizontalScrollViewRef = useRef(null);
  const isNavEnabledRef = useRef(true);
  const tasks = useTasks();
  const [visibleDate, setVisibleDate] = useState(currentDate);
  const [visibleHour, setVisibleHour] = useState(currentHour);
  const [viewMode, setViewMode] = useState(VIEW_MODE_BUBBLES);

  const openRollups = () => setViewMode(VIEW_MODE_ROLLUPS);
  const closeRollups = () => setViewMode(VIEW_MODE_BUBBLES);
  const toggleRollups = () =>
    viewMode === VIEW_MODE_BUBBLES ? openRollups() : closeRollups();

  const prevHour = () => visibleHour - 1;
  const nextHour = () => visibleHour + 1;

  const isCurrent = () =>
    visibleDate === currentDate && visibleHour === currentHour;

  const handleScrollEnd = event => {
    const isScrollRight = event.nativeEvent.contentOffset.x < VIEWPORT_WIDTH;
    if (isNavEnabledRef.current) {
      switch (viewMode) {
        case VIEW_MODE_BUBBLES:
          navigateTo(isScrollRight ? prevHour() : nextHour());
          break;
        case VIEW_MODE_ROLLUPS:
          setVisibleDate(
            isScrollRight ? prevDate(visibleDate) : nextDate(visibleDate),
          );
          scrollTo(VIEWPORT_WIDTH, false);
          break;
      }
    }
    isNavEnabledRef.current = true;
  };

  const navigateTo = hour => {
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

  const scrollTo = (offset, animated = true) => {
    horizontalScrollViewRef.current?.scrollTo({x: offset, y: 0, animated});
    horizontalScrollViewRef.current?._children?.[0]?._children?.forEach(c =>
      c.scrollTo({x: 0, y: 0, animated: false}),
    );
  };
  const navToPrev = () => scrollTo(0);
  const navToNext = () => scrollTo(VIEWPORT_WIDTH * 2);

  const navToCurrent = () => {
    if (isCurrent()) {
      return;
    }

    isNavEnabledRef.current = false;
    if (
      getCurrentHourDirection({
        visibleDate,
        currentDate,
        visibleHour,
        currentHour,
      }) === 'next'
    ) {
      navToNext();
    } else {
      navToPrev();
    }

    requestAnimationFrame(() => {
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

  useAppBackgrounded(() => {
    navToCurrent();
    closeRollups();
  });

  const getTasksForDate = makeGetTasksForDate(tasks);

  const styles = createStyles();
  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={openRollups} hitSlop={20}>
          <Text style={styles.date}>{formatDate(visibleDate)}</Text>
        </TouchableOpacity>
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
          {viewMode === VIEW_MODE_BUBBLES && (
            <Tasks
              date={visibleDate}
              hour={visibleHour}
              tasks={getTasksForDate(visibleDate)}
            />
          )}
          {viewMode === VIEW_MODE_ROLLUPS && (
            <RollupView date={visibleDate} onClose={closeRollups} />
          )}
        </ScrollView>
      </View>

      <View style={styles.controls}>
        <Controls
          onLeftPress={navToPrev}
          onRightPress={navToNext}
          onHomePress={
            viewMode === VIEW_MODE_ROLLUPS ? closeRollups : navToCurrent
          }
          onHomeLongPress={toggleRollups}
          isHomeEnabled={
            viewMode === VIEW_MODE_ROLLUPS ||
            visibleDate !== currentDate ||
            visibleHour !== currentHour
          }
        />
      </View>
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      height: Dimensions.get('window').height - COUNTDOWN_HEIGHT,
    },
    dateTimeContainer: {
      top: -25,
      width: '100%',
    },
    date: {
      color: Colors.textInfo,
      fontSize: 16,
      position: 'absolute',
      left: 5,
    },
    hourWindow: {
      color: Colors.textInfo,
      fontSize: 16,
      position: 'absolute',
      right: 5,
      width: 120,
      textAlign: 'right',
    },
    viewport: {
      borderTopWidth: 2,
      borderColor: Colors.navigatorBorder,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      backgroundColor: Colors.navigatorBackground,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    controls: {
      borderTopWidth: 2,
      borderColor: Colors.navigatorBorder,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingTop: 10,
      backgroundColor: Colors.background,
    },
  });

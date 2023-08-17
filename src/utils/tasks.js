import {findNearestDate} from './time';

export const makeFindBubble =
  bubbles =>
  ({date, hour, slot, quarter}) =>
    bubbles.find(
      b =>
        b.date === date &&
        b.hour === hour &&
        b.slot === slot &&
        b.quarter === quarter,
    );

export const makeFindTask =
  tasks =>
  ({date, slot}) =>
    tasks.find(t => t.date === date && t.slot === slot);

export const generateId = () => Math.floor(1000 * Math.random() + 1);

export const generateRange = length =>
  Array(length)
    .fill('')
    .map((_, idx) => idx);

export const getCurrentHourDirection = ({
  visibleDate,
  currentDate,
  visibleHour,
  currentHour,
}) => {
  let dir = 'next';
  if (visibleDate === currentDate) {
    if (visibleHour > currentHour) {
      dir = 'prev';
    }
  } else if (visibleDate > currentDate) {
    dir = 'prev';
  }
  return dir;
};

const getTaskDates = tasks =>
  Array.from(
    new Set(
      tasks
        .filter(t => !!t.date)
        .map(t => t.date)
        .sort(),
    ),
  );

const makeGetTasksForDate = tasks => date => tasks.filter(t => t.date === date);

export const createTasksForDateIfNoneExist = ({date, tasks}) => {
  const getTasksForDate = makeGetTasksForDate(tasks);
  const todaysTasks = getTasksForDate(date);
  if (todaysTasks.length === 0) {
    const nearestDate = findNearestDate({
      dateStr: date,
      dates: getTaskDates(tasks),
    });
    if (nearestDate) {
      return getTasksForDate(nearestDate);
    }
  }
  return [];
};

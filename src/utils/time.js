import {add, format, parse, sub} from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const HOUR = 60;
export const MINUTE = 60;
export const SECOND = 1000;

export const getMeridiem = hour => (hour >= 12 ? 'PM' : 'AM');

export const formatHourWindow = hour => {
  const meridiem = getMeridiem(hour + 1);
  const start = hour > 12 ? hour - 12 : hour;
  const end = start + 1;
  return `${start === 0 ? '12' : start} - ${end > 12 ? '1' : end} ${meridiem}`;
};

export const formatDate = date => {
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
};

export const nextDate = dateStr =>
  format(add(toDate(dateStr), {days: 1}), DATE_FORMAT);

export const prevDate = dateStr =>
  format(sub(toDate(dateStr), {days: 1}), DATE_FORMAT);

export const toDate = dateStr => parse(dateStr, 'yyyy-MM-dd', new Date());

export const findNearestDate = ({dateStr, dates}) => {
  if (dates.length === 0) {
    return;
  }

  if (dates.length === 1 || dateStr < dates[0]) {
    return dates[0];
  }

  if (dateStr > dates[dates.length - 1]) {
    return dates[dates.length - 1];
  }

  for (let idx = 0; idx < dates.length - 1; idx++) {
    if (dateStr >= dates[idx] && dateStr < dates[idx++]) {
      return dates[idx];
    }
  }

  return dates[dates.length - 1];
};

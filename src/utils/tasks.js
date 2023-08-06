export const findBubble =
  bubbles =>
  ({date, hour, slot, quarter}) =>
    bubbles.find(
      b =>
        b.date === date &&
        b.hour === hour &&
        b.slot === slot &&
        b.quarter === quarter,
    );

export const findTask = tasks => slot => tasks.find(c => c.slot === slot);

export const generateId = () => Math.floor(1000 * Math.random() + 1);

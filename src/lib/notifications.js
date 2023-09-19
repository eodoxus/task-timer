import {NativeModules} from 'react-native';

const {Notifications} = NativeModules;

export const requestPermission = () => Notifications.requestPermission();

export const fillBubbleIn = secondsFromNow => {
  Notifications.scheduleNotification('Fill in your bubble!', secondsFromNow);
};

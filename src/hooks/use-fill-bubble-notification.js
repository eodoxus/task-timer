import {NativeModules} from 'react-native';

import {useAppBackgrounded} from './';
import {useRemainingSeconds} from '../store/countdown';

const {Notifications} = NativeModules;

export const useFillBubbleNotification = () => {
  const remainingSeconds = useRemainingSeconds();

  useAppBackgrounded(() =>
    Notifications.scheduleNotification(
      'Fill in your bubble!',
      remainingSeconds,
    ),
  );
};

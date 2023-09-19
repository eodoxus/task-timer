import {useAppBackgrounded} from './';
import {useRemainingSeconds} from '../store/countdown';
import {fillBubbleIn as fillBubbleInNotification} from '../lib/notifications';

export const useFillBubbleNotification = () => {
  const remainingSeconds = useRemainingSeconds();

  useAppBackgrounded(() => fillBubbleInNotification(remainingSeconds));
};

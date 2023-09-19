import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  retrieveBubbles,
  retrieveMuteState,
  retrieveTasks,
} from '../store/storage';
import {setBubbles, setTasks} from '../store/tasks';
import {setMuteState} from '../store/countdown';
import {releaseSound} from '../utils/sound';

export const useData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const bubbles = await retrieveBubbles();
      const tasks = await retrieveTasks();
      const muteState = await retrieveMuteState();
      dispatch(setBubbles(bubbles));
      dispatch(setTasks(tasks));
      dispatch(setMuteState(muteState));
    })();

    return () => {
      releaseSound();
    };
  }, [dispatch]);
};

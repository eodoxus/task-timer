import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveBubbles = async () => {
  try {
    const value = await AsyncStorage.getItem('BUBBLES');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(`Error retrieving bubbles from storage`, error);
  }
  return [];
};

export const storeBubbles = async bubbles => {
  try {
    await AsyncStorage.setItem('BUBBLES', JSON.stringify(bubbles));
  } catch (error) {
    console.error(`Error storing bubbles to storage`, error);
  }
};

export const retrieveCurrentTasks = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(`Error retrieving current tasks from storage`, error);
  }
  return [{title: 'My first task', slot: 0}];
};

export const storeCurrentTasks = async tasks => {
  try {
    await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
  } catch (error) {
    console.error(`Error storing current tasks to storage`, error);
  }
};

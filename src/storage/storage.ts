import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../api/auth';

const USER_KEY = '@KloudiusAuthApp';

export const saveUser = async (user: User) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

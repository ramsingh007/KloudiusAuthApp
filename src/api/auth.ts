import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  name: string;
  email: string;
  password: string; 
}

const USERS_KEY = 'REGISTERED_USERS';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredUsers = async (): Promise<User[]> => {
  const json = await AsyncStorage.getItem(USERS_KEY);
  return json ? JSON.parse(json) : [];
};

const saveUsers = async (users: User[]) => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const signupApi = async (
  name: string,
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  if (!name || !email || password.length < 6) {
    throw new Error('Invalid signup data');
  }

  await delay(500);

  const users = await getStoredUsers();

  const exists = users.find(u => u.email === email);
  if (exists) throw new Error('User already exists');

  const newUser: User = { name, email, password };
  users.push(newUser);
  await saveUsers(users);

  return { name, email };
};

export const loginApi = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  await delay(500);

  const users = await getStoredUsers();

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) throw new Error('Incorrect credentials');

  return { name: found.name, email: found.email };
};

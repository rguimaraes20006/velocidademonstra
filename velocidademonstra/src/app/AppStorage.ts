
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../models/AppState'
import { debounce } from '../utils/debounce';

const storagePath = 'app';
const writeUserToStorageInterval = 2000;

export class AppStorage {
  static async getStorage(): Promise<AppState> {
    const storage = await AsyncStorage.getItem(storagePath);
    if (storage) {
      return JSON.parse(storage);
    }

    const initialState = await AppStorage.getInitialState();
    await AppStorage.setStorage(initialState);
    return initialState;
  }

  static async setStorage(state: AppState) {
    return AsyncStorage.setItem(storagePath, JSON.stringify(state));
  }

  static getInitialState(): AppState {
    return {
      isLoading: true,
      user: {
        id: '123039203912',
        name: 'Usuário teste',        
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    };
  }

  static syncAppStorage = debounce(async (appState: AppState) => {
    if (appState.isLoading === true || appState.user.id.length === 0) {
      return;
    }

    await AppStorage.setStorage(appState);
  }, writeUserToStorageInterval);
}

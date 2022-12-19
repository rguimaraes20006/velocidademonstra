import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStateReducer from './slices/AppStateSlice';
import UserReducer from './slices/UserSlice';
import RadaresReducer from './slices/RadaresSlice';

const persistConfig = {
  key: '@velocidade-monstra',
  keyPrefix: '',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  app: AppStateReducer,
  user: UserReducer,
  radares: RadaresReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
export default store;

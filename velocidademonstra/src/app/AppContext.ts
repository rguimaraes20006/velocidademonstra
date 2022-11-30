
import {createContext} from 'react';

export type AppState = {
  isLoading: boolean;
  userCoords: {
    latitude: number;
    longitude: number;
  };
  user: {
    id: string;
    name: string;
  };
};

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: 'dummy',
    name: 'dummy',
  },

  userCoords: {
    latitude: 0,
    longitude: 0,
  },
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (status: AppState) => {},
});


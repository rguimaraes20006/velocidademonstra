import React, {createContext, useContext, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateAppState as updateAppStateAction} from '../../store/slices/AppStateSlice';
import {updateUser as updateUserAction} from '../../store/slices/UserSlice';
import {updateRadares as updateRadaresAction} from '../../store/slices/RadaresSlice';

const DataContext = createContext({});
const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
const DataProvider = (props: any) => {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.app);
  const user = useSelector((state: any) => state.user);
  const radares = useSelector((state: any) => state.radares);
  const updateAppState = (value: any) => dispatch(updateAppStateAction(value));
  const updateUser = (value: any) => dispatch(updateUserAction(value));
  const updateRadares = (value: any) => dispatch(updateRadaresAction(value));
  const DataContextValue = useMemo(
    () => ({
      appState,
      user,
      radares,
      updateAppState,
      updateUser,
      updateRadares,
    }),
    [appState, user, radares],
  );

  return (
    <DataContext.Provider value={DataContextValue} {...props}>
      {props.children}
    </DataContext.Provider>
  );
};

export {DataProvider, useDataContext};

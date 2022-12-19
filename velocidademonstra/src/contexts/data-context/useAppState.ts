import {useDataContext} from './DataContextProvider';

const useAppState = () => {
  const {appState, updateAppState}: any = useDataContext();
  const {isLoading, selected} = appState;

  return {isLoading, selected, updateAppState};
};

export default useAppState;

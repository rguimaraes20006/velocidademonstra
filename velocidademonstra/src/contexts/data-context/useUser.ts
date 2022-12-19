import {useDataContext} from './DataContextProvider';
const useUser = () => {
  const {user, updateUser}: any = useDataContext();

  return {user, updateUser};
};

export default useUser;

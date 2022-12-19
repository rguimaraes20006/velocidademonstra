import {firebase} from '@react-native-firebase/database';

const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];
  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    if (!item) {
      return;
    }
    const [, speedLimit] = item.name.split('@');
    returnArr.push({...item, key: item.id, speedLimit});
  });
  return returnArr;
};

const getRadares = async () => {
  const snapshot = await firebase
    .app()
    .database('https://velocidademonstra-default-rtdb.firebaseio.com/')
    .ref('/radares')
    .once('value');
  return snapshotToArray(snapshot);
};

export default getRadares;

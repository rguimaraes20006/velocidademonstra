import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableLatestRenderer} from 'react-native-maps';
import {AppContext, initialAppState} from './AppContext';
import {Loader} from '../components/Loader';
import {reqeustPermissions} from '../geolocation/requestPermisisons';
import {userCoords} from '../geolocation/userCoords';
import {AppStorage} from './AppStorage';
import HomePage from '../pages/home/HomePage';
import RadarListPage from '../pages/radar/list/RadarListPage';
import getRadares from '../firebase/database';
import InstrucoesPage from '../pages/instrucoes/InstrucoesPage';

enableLatestRenderer();

const Tab = createBottomTabNavigator();

async function load() {
  console.log('loading app.....');
  const hasLocPermission = await reqeustPermissions();
  const coords = await userCoords();
  const storage = await AppStorage.getStorage();
  const user: any = {
    ...storage.user,
    coords: coords ?? storage.user.coords,
  };
  const radaresFB = await getRadares();
  return {hasLocPermission, user, radaresFB};
}

const initialRegion = {
  latitude: -23.004181,
  longitude: -43.360841,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

export default function App() {
  const [appState, setAppState] = useState(initialAppState);
  const [region, setRegion] = useState<any>(null);
  const [radares, setRadares] = useState<any[]>([]);
  const [filtrado, setFiltrado] = useState<any[]>([]);

  useEffect(() => {
    load().then(async ({hasLocPermission: isSuccess, user, radaresFB}: any) => {
      isSuccess === true && setAppState({...appState, isLoading: false});
      const {longitude, latitude} = user.coords;
      setRadares([...radaresFB]);
      setRegion({...initialRegion, longitude, latitude});
    });
  }, []);

  useEffect(() => {
    if (!region) {
      return;
    }
    const {
      latitude: regLat,
      latitudeDelta,
      longitude: regLon,
      longitudeDelta,
    } = region;
    const latMin = regLat - latitudeDelta / 2;
    const latMax = regLat + latitudeDelta / 2;
    const lonMin = regLon - longitudeDelta / 2;
    const lonMax = regLon + longitudeDelta / 2;

    const filtrados = radares.filter((radar: any) => {
      const [latitude, longitude] = [
        parseFloat(radar.location[1]),
        parseFloat(radar.location[0]),
      ];
      let long = longitude;
      if (lonMin < -180 && longitude > 0) {
        long = longitude - 360;
      }
      if (lonMax > 180 && longitude < 0) {
        long = longitude + 360;
      }
      return (
        latitude >= latMin &&
        latitude <= latMax &&
        long >= lonMin &&
        long <= lonMax
      );
    });
    setFiltrado(filtrados);
  }, [radares, region]);

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle: {fontSize: 18},
          }}>
          <Tab.Screen name="Radares" options={{title: 'Mapa'}}>
            {props => (
              <HomePage
                {...props}
                radares={filtrado}
                initialRegion={initialRegion}
                setRegion={setRegion}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Lista" options={{title: 'Listagem de Radares'}}>
            {props => <RadarListPage {...props} radares={radares} />}
          </Tab.Screen>
          <Tab.Screen
            name="Instrucoes"
            component={InstrucoesPage}
            options={{title: 'Instruções'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

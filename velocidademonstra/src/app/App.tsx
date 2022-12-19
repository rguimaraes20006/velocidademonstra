import {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Container,
  extendTheme,
  HStack,
  NativeBaseProvider,
  Pressable,
  Text,
} from 'native-base';
import {enableLatestRenderer} from 'react-native-maps';
import useAppState from '../contexts/data-context/useAppState';
import useUser from '../contexts/data-context/useUser';
import useRadares from '../contexts/data-context/useRadares';
import {Loader} from '../components/Loader';
import {reqeustPermissions} from '../geolocation/requestPermisisons';
import HomePage from '../pages/home/HomePage';
import RadarListPage from '../pages/radar/list/RadarListPage';
import getRadares from '../firebase/database';
import InstrucoesPage from '../pages/instrucoes/InstrucoesPage';
import {userCoords} from '../geolocation/userCoords';
import Login from '../pages/Login/Login';
import {Dimensions, StyleSheet} from 'react-native';
import Request from '../pages/Request/Request';

enableLatestRenderer();

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 240,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
});

const pages: any = {
  0: {component: <HomePage />, title: 'Mapa'},
  1: {component: <RadarListPage />, title: 'Listagem de Radares'},
  2: {component: <InstrucoesPage />, title: 'Instruções'},
  3: {component: <Request />, title: 'Solicitar Inclusão'},
};

export default function App() {
  const {isLoading, selected, updateAppState} = useAppState();
  const {user, updateUser} = useUser();
  const {regiao, updateRadares} = useRadares();
  const [page, setPage] = useState<any>({
    component: <HomePage />,
    title: 'Mapa',
  });
  const theme = extendTheme({
    config: {
      initialColorMode: 'dark',
    },
  });
  const setSelected = (idx: number) => {
    updateAppState({selected: idx});
  };
  const load = async () => {
    console.log('loading app.....');
    if (!isLoading) {
      return false;
    }
    const hasLocPermission = await reqeustPermissions();
    const {longitude, latitude}: any = await userCoords();
    const radaresFB = await getRadares();
    await updateUser({coords: {longitude, latitude}});
    await updateRadares({
      lista: [...radaresFB],
      regiao: {...regiao, longitude, latitude},
    });
    return hasLocPermission;
  };

  useEffect(() => {
    load().then(async (hasLocPermission: any) => {
      hasLocPermission && (await updateAppState({isLoading: false}));
    });
  }, []);

  useEffect(() => {
    setPage(pages[selected]);
  }, [selected]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !user.id ? (
        <NativeBaseProvider theme={theme}>
          <Login />
        </NativeBaseProvider>
      ) : (
        <NativeBaseProvider theme={theme}>
          <Container h="100%" w="100%" maxWidth="100%">
            <Box safeAreaTop bg="violet.600" />
            <HStack
              bg="indigo.600"
              px="1"
              py="3"
              justifyContent="space-between"
              alignItems="center"
              w="100%">
              <HStack alignItems="center">
                <Text color="white" fontSize="20" fontWeight="bold">
                  {page.title}
                </Text>
              </HStack>
            </HStack>
            <Box style={styles.container}>
              {page.component}
              <Box
                flex={1}
                safeAreaTop
                width="100%"
                bottom={0}
                position="absolute">
                <HStack
                  safeAreaBottom
                  bg="indigo.600"
                  alignItems="center"
                  bottom={0}
                  shadow={6}>
                  <Pressable
                    opacity={selected === 0 ? 1 : 0.5}
                    py="3"
                    flex={1}
                    onPress={() => setSelected(0)}>
                    <Center>
                      <Text color="white" fontSize="12" textAlign="center">
                        Mapa
                      </Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    opacity={selected === 1 ? 1 : 0.5}
                    py="2"
                    flex={1}
                    onPress={() => setSelected(1)}>
                    <Center>
                      <Text color="white" fontSize="12" textAlign="center">
                        Listagem de Radares
                      </Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    opacity={selected === 2 ? 1 : 0.6}
                    py="2"
                    flex={1}
                    onPress={() => setSelected(2)}>
                    <Center>
                      <Text color="white" fontSize="12" textAlign="center">
                        Instruções
                      </Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    opacity={selected === 3 ? 1 : 0.5}
                    py="3"
                    flex={1}
                    onPress={() => setSelected(3)}>
                    <Center>
                      <Text color="white" fontSize="12" textAlign="center">
                        Solicitar Inclusão
                      </Text>
                    </Center>
                  </Pressable>
                </HStack>
              </Box>
            </Box>
          </Container>
        </NativeBaseProvider>
      )}
    </>
  );
}

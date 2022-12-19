import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import useRadares from '../../../contexts/data-context/useRadares';
import {Box, Text, Button, FlatList, HStack, VStack, Image} from 'native-base';

const styles = StyleSheet.create({
  item: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
});

const DetalheRadar = (radar: any) => {
  Alert.alert(
    'Detalhes do Radar',
    'Nome: ' + radar.name + '\n' + 'ID: ' + radar.id,
  );
};

const RadarItem = ({item}: any) => {
  const [uri, setUri] = useState<string>(
    'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  );

  useEffect(() => {
    const imageSource = async () =>
      await fetch('https://picsum.photos/100/100').then(({url: src}: any) =>
        setUri(src),
      );
    imageSource();
  }, []);

  useEffect(() => {
    console.debug(uri);
  }, [uri]);

  return (
    <Box style={styles.item} key={item.id}>
      <VStack space={3}>
        <HStack space={2}>
          <Box>
            <Image
              source={{
                uri,
              }}
              alt=""
              width={100}
              height={100}
            />
          </Box>
          <Box>
            <Text color="#333">Name: {item.name}</Text>
            <Text color="#333">
              Limite de velocidade: {item.speedLimit} Km/h
            </Text>
            <Text color="#333">Latitude: {item.location[1]}</Text>
            <Text color="#333">Longitude: {item.location[0]}</Text>
          </Box>
        </HStack>
        <Button onPress={() => DetalheRadar(item)}>Ver Mais</Button>
      </VStack>
    </Box>
  );
};

const RadarListPage = () => {
  console.log('radar list page loaded');
  const {lista: radares} = useRadares();
  const renderItem = ({item}: any) => <RadarItem item={item} />;

  return (
    <Box flex={1} width="100%" bg="gray.300">
      <FlatList
        data={radares.filter(({id}: any) => id < 1001)}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default RadarListPage;
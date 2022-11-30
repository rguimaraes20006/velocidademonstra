import React from 'react';
import {StyleSheet, Text, View, FlatList, Alert, Button} from 'react-native';

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

const RadarItem = ({item}: any) => (
  <View style={styles.item} key={item.id}>
    <Text>Name: {item.name}</Text>
    <Text>
      Latitude: {item.location[1]}, Longitude: {item.location[0]}
    </Text>

    <Button title="Ver Mais" onPress={() => DetalheRadar(item)}></Button>
  </View>
);

const RadarListPage = ({radares}: {radares: any}) => {
  console.log('radar list page loaded');
  const renderItem = ({item}: any) => <RadarItem item={item} />;

  return (
    <View>
      <FlatList data={radares} renderItem={renderItem} />
    </View>
  );
};

export default RadarListPage;

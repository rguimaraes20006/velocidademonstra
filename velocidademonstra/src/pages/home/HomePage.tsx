import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import useRadares from '../../contexts/data-context/useRadares';
import {Box} from 'native-base';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

const HomePage = () => {
  const {filtrados: radares, regiao, updateRadares} = useRadares();
  const onRegionChange = async (newRegion: any) => {
    await updateRadares({regiao: newRegion});
  };
  const markerClick = (nomeMapa: string) => {
    Alert.alert('Detalhes do Radar', 'Nome: ' + nomeMapa);
  };

  return (
    <Box style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={regiao}
        showsPointsOfInterest={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
        minZoomLevel={12}
        onRegionChangeComplete={onRegionChange}>
        {radares.map((radar: any, index: any) => (
          <Marker
            key={index}
            coordinate={{
              longitude: parseFloat(radar.location[0]),
              latitude: parseFloat(radar.location[1]),
            }}
            title={`[#${radar.id}] ${radar.name}`}
            onPress={() => markerClick(radar.name)}
          />
        ))}
      </MapView>
    </Box>
  );
};

export default HomePage;

import React, {useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppContext} from '../../app/AppContext';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const HomePage = ({radares, initialRegion, setRegion}: any) => {
  const value = useContext(AppContext);
  const onRegionChange = (newRegion: any) => {
    setRegion(newRegion);
  };

  const markerClick = (nomeMapa : string ) => {
    Alert.alert('Detalhes do Radar', 'Nome: '  + nomeMapa )
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...initialRegion,
        //  longitude: value.appState.userCoords.longitude,
         // latitude: value.appState.userCoords.latitude,
        }}
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
    </View>
  );
};

export default HomePage;

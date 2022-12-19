import {useDataContext} from './DataContextProvider';
import {useMemo} from 'react';

const useRadares = () => {
  const {radares, updateRadares}: any = useDataContext();
  const {lista, regiao}: any = radares || {};
  const filtrados = useMemo(() => {
    if (!regiao) {
      return;
    }
    const {
      latitude: regLat,
      latitudeDelta,
      longitude: regLon,
      longitudeDelta,
    } = regiao;
    const latMin = regLat - latitudeDelta / 2;
    const latMax = regLat + latitudeDelta / 2;
    const lonMin = regLon - longitudeDelta / 2;
    const lonMax = regLon + longitudeDelta / 2;

    return lista.filter((radar: any) => {
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
  }, [lista, regiao]);
  return {lista, regiao, filtrados, updateRadares};
};

export default useRadares;

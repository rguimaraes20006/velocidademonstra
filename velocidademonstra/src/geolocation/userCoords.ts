import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

export async function userCoords() : Promise<GeoCoordinates | undefined> {
  /*
    Geolocation.getCurrentPosition(position => {
        //deu bom
    }, error => {
        //falha
    })*/

  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        position?.coords && resolve(position.coords);
      },
      error => {
        console.log(error.code, error.message);
        resolve(undefined);
      },
    );
  });
}

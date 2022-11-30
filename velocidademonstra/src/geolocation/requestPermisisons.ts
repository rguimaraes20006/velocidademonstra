import { PermissionsAndroid } from "react-native"



export async function reqeustPermissions(){

   const resp = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");   

 //  switch(resp) {
  //  case "denied"
  // }

  console.log('request permission resultado: '  + resp );



  return  resp === 'granted';


}
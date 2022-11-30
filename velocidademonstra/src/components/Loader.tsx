import {ActivityIndicator, StyleSheet, View} from 'react-native';

export function Loader() {
  return (
    <View style={styles.wapper}>
      <ActivityIndicator size="large" />
    </View>
  );
}



const styles = StyleSheet.create({
  wapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center'     ,
    justifyContent: 'center',
       
    
  },
});

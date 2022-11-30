import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    lineHeight: 20,
  },
});
const InstrucoesPage = () => (
  <View>
    <Text style={styles.item}>
    Utilize a tela de mapas para ver os radades de velocidade e evitar multas.
    </Text>
  </View>
);

export default InstrucoesPage;

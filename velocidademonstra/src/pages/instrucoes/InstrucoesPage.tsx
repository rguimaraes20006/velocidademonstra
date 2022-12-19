import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
const InstrucoesPage = () => (
  <Box flex={1} bg="gray.300">
    <Text style={styles.item}>
      Utilize a tela de mapas para ver os radades de velocidade e evitar multas.
    </Text>
  </Box>
);

export default InstrucoesPage;

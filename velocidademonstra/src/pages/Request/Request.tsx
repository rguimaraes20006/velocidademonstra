import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, FormControl, Input, Text, VStack} from 'native-base';
import {useMutation} from '@apollo/client';
import {CREATE_RADAR} from '../../utils/queries';
import {Alert} from 'react-native';
import useRadares from '../../contexts/data-context/useRadares';

const Request = () => {
  const [createRadar] = useMutation(CREATE_RADAR);
  const {updateRadares} = useRadares();
  const [name, setName] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [errors, setErrors] = useState<any>({
    name: null,
    longitude: null,
    latitude: null,
  });
  const [sending, setSending] = useState<boolean>(false);
  const sanitize = (value: string) =>
    value.replace(/[^0-9-.,]/g, '').replace(/,/g, '.');
  const submit = async () => {
    setSending(true);
    const e = {};
    if (!name) {
      Object.assign(e, {name: 'Informe um nome para o radar'});
    }
    if (!longitude) {
      Object.assign(e, {longitude: 'Informe a longitude decimal do radar'});
    }
    if (!latitude) {
      Object.assign(e, {latitude: 'Informe a latitude decimal do radar'});
    }
    if (Object.keys(e).length) {
      await setErrors({...e});
      return false;
    }
    const res = await createRadar({variables: {name, longitude, latitude}});
    const {id} = res.data.createRadar;
    updateRadares({id, name, longitude, latitude});
    setSending(false);
    setName('');
    setLongitude('');
    setLatitude('');
    Alert.alert(
      'Solicitação de inclusão',
      'Sua solicitação foi recebida e já consta da lista provisoriamente até a análise ser concluída.\n\nObrigado.',
    );
  };
  const disabled = useMemo(
    () => sending || !name || !longitude || !latitude,
    [sending, name, longitude, latitude],
  );

  useEffect(() => {
    const e: any = {...errors};
    if (name) {
      e.name = null;
    }
    if (longitude) {
      e.longitude = null;
    }
    if (latitude) {
      e.latitude = null;
    }
    setErrors({...e});
  }, [name, longitude, latitude]);

  return (
    <Box flex={1} w="90%" maxW="290" mt={2}>
      <VStack space={3}>
        <FormControl isRequired>
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            value={name}
            onChangeText={value => setName(value)}
            color="black"
          />
          {errors.name && (
            <Text color="red.400" fontSize={12}>
              {errors.name}
            </Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Longitude</FormControl.Label>
          <Input
            value={longitude}
            onChangeText={value => setLongitude(sanitize(value))}
            color="black"
          />
          {errors.longitude && (
            <Text color="red.400" fontSize={12}>
              {errors.longitude}
            </Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Latitude</FormControl.Label>
          <Input
            value={latitude}
            onChangeText={value => setLatitude(sanitize(value))}
            color="black"
          />
          {errors.latitude && (
            <Text color="red.400" fontSize={12}>
              {errors.latitude}
            </Text>
          )}
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={submit}
          isDisabled={disabled}>
          Enviar
        </Button>
      </VStack>
    </Box>
  );
};

export default Request;
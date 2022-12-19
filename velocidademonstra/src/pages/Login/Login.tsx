import React, {useEffect, useState} from 'react';
import useUser from '../../contexts/data-context/useUser';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from 'native-base';

const Login = () => {
  const {updateUser} = useUser();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({username: null, password: null});
  const validateEmail = (value: string) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  const submit = async () => {
    const e = {};
    if (!validateEmail(username)) {
      Object.assign(e, {username: 'Informe seu e-mail cadastrado'});
    }
    if (!password) {
      Object.assign(e, {password: 'Informe sua senha'});
    }
    if (Object.keys(e).length) {
      await setErrors({...e});
      return false;
    }
    updateUser({id: username, name: 'Usuário Teste'});
  };

  useEffect(() => {
    const e: any = {...errors};
    if (validateEmail(username)) {
      e.username = null;
    }
    if (password) {
      e.password = null;
    }
    setErrors({...e});
  }, [username, password]);

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="black">
          Velocidade Monstra
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>e-mail</FormControl.Label>
            <Input
              value={username}
              onChangeText={value => setUsername(value)}
              color="black"
            />
            {errors.username && (
              <Text color="red.400" fontSize={12}>
                {errors.username}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={value => setPassword(value)}
              color="black"
            />
            {errors.password && (
              <Text color="red.400" fontSize={12}>
                {errors.password}
              </Text>
            )}
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={submit}>
            Acessar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
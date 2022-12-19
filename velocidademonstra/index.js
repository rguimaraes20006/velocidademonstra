import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './src/app/app.json';
import store, {persistor} from './src/store';
import {Loader} from './src/components/Loader';
import {DataProvider} from './src/contexts/data-context/DataContextProvider';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {ApolloProvider} from '@apollo/client';
import client from './src/utils/service';

AppRegistry.registerComponent(appName, () => props => (
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <DataProvider>
        <ApolloProvider client={client}>
          <NativeBaseProvider>
            <App />
          </NativeBaseProvider>
        </ApolloProvider>
      </DataProvider>
    </PersistGate>
  </Provider>
));

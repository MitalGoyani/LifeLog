import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { persistor, store } from './src/redux/store';
import AdventureList from './src/components/screens/AdventureList';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <AdventureList />
          </SafeAreaView>
        </PersistGate>
        </Provider>
        <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;

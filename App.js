import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import { UserProvider } from './components/UserContext';

const Stack = createNativeStackNavigator();

GoogleSignin.configure({
  webClientId: '141106545956-8ob7cgjtr032bqn8nsta9qh7ifi1pe0n.apps.googleusercontent.com',
});

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) return null;

  return (
    <UserProvider user={user} setUser={setUser} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!user ? "welcome" : "home"}>
          <Stack.Screen name='welcome' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

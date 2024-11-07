import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SignUp from './screens/Sign-up';
import Login from './screens/LoginScreen';
import Home from './screens/Home'; // Import Home component
import SendMoney from './screens/SendMoney';
// Import any other menu-related screens here

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SplashScreen" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="Send Money" component={SendMoney} /> 
        {/* Add any other menu item screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

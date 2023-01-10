import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import Home from "../screens/Home";
import ViewAll from "../screens/ViewAll";
import MovieDetails from "../screens/MovieDetails";
import OrderPage from "../screens/OrderPage";
import PaymentPage from "../screens/PaymentPage";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentPage"
          component={PaymentPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

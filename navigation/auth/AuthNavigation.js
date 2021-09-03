import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login";
import ChangePassword from "../../screens/ChangePassword";
// import EditUserDetails from "../../screens/EditUserDetails";

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChangePass" component={ChangePassword} />
        {/* <Stack.Screen name="EditDetails" component={EditUserDetails} /> */}
      </Stack.Navigator>
    </>
  );
}

export default AuthNavigation;

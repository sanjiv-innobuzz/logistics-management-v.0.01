import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
// import { connect } from "react-redux";
import { enableScreens } from "react-native-screens";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import MainNavigation from "./navigation/drawer/MainNavigation";
import AuthNavigation from "./navigation/auth/AuthNavigation";

import configureStore from "./api";
import { isAuthanticate, getCurrentUser } from "./api/user/userActions";

import { default as theme } from "./config/theme.json";
import { default as mapping } from "./config/mapping.json";
// import { getValueFromStore, isAuthanticate } from "./screens/Auth/auth";
//push nptificarion
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { saveToken } from "./api/notification/notificationAction";

export const UserContext = React.createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

///

enableScreens();
const api = configureStore();

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(null);

  const [expoPushToken, setExpoPushToken] = React.useState("");

  React.useEffect(() => {
    async function checkAuth() {
      // const token = await getValueFromStore("token");
      // setIsAuth(isAuthanticate(token));
      await getCurrentUser({}, (userData) => {
        console.log("current user---- ", userData);
      });
      await isAuthanticate({}, (status) => {
        setIsAuth(status);
      });
    }
    checkAuth();
  }, []);

  //push notifications
  React.useEffect(() => {
    getPushNotificationPermissions();

    Notifications.addNotificationReceivedListener(_handleNotification);

    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  });

  const _handleNotification = (notification) => {
    console.log("noti", notification);
  };

  const _handleNotificationResponse = (response) => {
    console.log("res", response);
  };
  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.log(" existingStatus", existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getDevicePushTokenAsync()).data; //(await Notifications.getExpoPushTokenAsync()).data;
    console.log("wait for token ", token);
    setExpoPushToken(token);
    saveToken({ token }, (status) => {
      console.log("app js token status =", status);
    });
    // this.setState({ expoPushToken: token });
  };

  return (
    <Provider store={api}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <NavigationContainer>
          <StatusBar style="auto" />
          {/* {!isAuth ? <AuthNavigation /> : <MainNavigation />} */}
          {isAuth ? <MainNavigation isAuth={isAuth} /> : <></>}
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
export default App;

// export default connect(null, { saveToken })(App);
//TODO:
// pull to refresh
// create error redux store for all
// change forms ui to match zoho forms design.
// add animations
// create display cards for each form data display...such that input and view ui matches to save extraa component creation

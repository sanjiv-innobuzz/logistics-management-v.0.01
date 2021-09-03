import React from "react";
import {
  Text,
  useTheme,
  Avatar,
  DrawerGroup,
  Drawer,
  DrawerItem,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import { View, SafeAreaView } from "react-native";
import { connect } from "react-redux"; //
import { CommonActions, StackActions } from "@react-navigation/native";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import { getCurrentUser, logout } from "../api/user/userActions"; //
import design from "./DrawerMenu/design";

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

const DrawerMenu = ({ navigation, getCurrentUser, logout }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const theme = useTheme();
  const styles = design(theme);
  const primaryToggleState = useToggleState();
  const [isRoleChecked, setIsRoleChecked] = React.useState(false);
  // const isFocused = useIsFocused();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState(null);
  const isDrawerOpen = useIsDrawerOpen();

  const checkAdmin = () => {
    getCurrentUser({}, (currentUser) => {
      setIsAdmin(currentUser && currentUser.user.role == "Admin");
      // console.log(isAdmin, "user--");
      setActiveUser(currentUser && currentUser.user);
      setIsRoleChecked(true);
    });
    return () => setActiveUser(null);
  };

  !isRoleChecked && isDrawerOpen ? checkAdmin() : console.log("role checked");
  // React.useEffect(() => {
  //   // console.log(isDrawerOpen, "i am run drawer ", navigation);
  // getCurrentUser({}, (currentUser) => {
  //   setIsAdmin(currentUser && currentUser.user.role == "Admin");
  //   // console.log(isAdmin, "user--");
  //   setIsRoleChecked(true);
  // });
  // }, []);

  const HomeIcon = (props) => <Icon {...props} name="home" />;
  const PersonIcon = (props) => <Icon {...props} name="person" />;
  const LinkIcon = (props) => <Icon {...props} name="link" />;
  const EditIcon = (props) => <Icon {...props} name="edit-2" />;
  const ShieldIcon = (props) => <Icon {...props} name="shield" />;
  const SettingsIcon = (props) => <Icon {...props} name="settings" />;
  const MoonIcon = (props) => <Icon {...props} name="moon" />;
  const BellIcon = (props) => <Icon {...props} name="bell" />;
  const EmailIcon = (props) => <Icon {...props} name="email" />;
  const PeopleIcon = (props) => <Icon {...props} name="people" />;
  const FolderIcon = (props) => <Icon {...props} name="folder" />;
  const TvIcon = (props) => <Icon {...props} name="tv" />;
  const PersonDoneIcon = (props) => <Icon {...props} name="person-done" />;
  const LockIcon = (props) => <Icon {...props} name="lock" />;
  const PlusCircle = (props) => <Icon {...props} name="plus-circle" />;
  const LogoutIcon = (props) => <Icon {...props} name="log-out" />;
  const ToggleIcon = () => (
    <Toggle
      style={styles.toggleIcon}
      status="primary"
      {...primaryToggleState}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.profile}>
          <Avatar
            style={styles.avatar}
            source={{
              uri:
                activeUser && activeUser?.profilePic !== undefined
                  ? "data:image/jpg;base64," + activeUser?.profilePic
                  : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png",
            }}
          />
          <Text status="basic" style={styles.name}>
            {activeUser && activeUser.company !== undefined
              ? activeUser.company
              : "N/A"}
          </Text>
        </View>

        <View style={styles.menu}>
          <Drawer
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <DrawerItem
              style={styles.drawerGroup}
              title="Dashboard"
              accessoryLeft={HomeIcon}
            />

            <DrawerItem
              title="Emails"
              accessoryLeft={EmailIcon}
              style={styles.drawerGroup}
            />

            {/* <DrawerItem
              title="My Files"
              accessoryLeft={FolderIcon}
              style={styles.drawerGroup}
            /> */}

            <DrawerGroup
              title="My Profile"
              accessoryLeft={PersonIcon}
              style={styles.drawerGroup}
            >
              <DrawerItem
                title="Edit Details"
                accessoryLeft={EditIcon}
                // onPress={() =>
                //   navigation.navigate("AuthNav", {
                //     screen: "EditDetails",
                //   })
                // }
                onPress={() =>
                  navigation.navigate("UserNav", {
                    screen: "EditDetails",
                    params: { userData: null },
                  })
                }
              />
              <DrawerItem
                title="Change Password"
                accessoryLeft={ShieldIcon}
                // onPress={() =>
                //   navigation.navigate("AuthNav", {
                //     screen: "ChangePass",
                //   })
                // }
              />
            </DrawerGroup>

            <DrawerGroup
              title="Settings"
              accessoryLeft={SettingsIcon}
              style={styles.drawerGroup}
            >
              <DrawerItem
                title="Dark Theme"
                accessoryLeft={MoonIcon}
                accessoryRight={ToggleIcon}
              />

              <DrawerItem title="Notifications" accessoryLeft={BellIcon} />
            </DrawerGroup>
            {
              //
              isAdmin ? (
                <>
                  <DrawerItem
                    title="Users"
                    accessoryLeft={PeopleIcon}
                    style={styles.drawerGroup}
                    onPress={() =>
                      navigation.navigate("UserNav", {
                        screen: "ViewUsers",
                      })
                    }
                  />

                  <DrawerGroup
                    title="News"
                    accessoryLeft={TvIcon}
                    style={styles.drawerGroup}
                  >
                    <DrawerItem
                      title="New Article"
                      accessoryLeft={PlusCircle}
                      onPress={() =>
                        navigation.navigate("NewsArticleNav", {
                          screen: "AddArticle",
                          params: { articleData: null },
                        })
                      }
                    />
                    <DrawerItem title="Edit Article" accessoryLeft={EditIcon} />
                  </DrawerGroup>
                </>
              ) : (
                <></>
              )
            }
          </Drawer>
        </View>
      </View>
      <View>
        <Drawer>
          <DrawerItem
            title="Logout"
            accessoryLeft={LogoutIcon}
            onPress={() => {
              logout((status) => {
                if (status) {
                  // navigation.navigate("AuthNav");
                  // navigation.reset();
                  setIsRoleChecked(false);
                  navigation.dispatch(
                    CommonActions.reset({
                      key: null,
                      index: 0,
                      routeNames: ["AuthNav"],
                      routes: [{ name: "AuthNav" }],
                    })
                  );
                  // navigation.dispatch(CommonActions.reset());
                }
              });
              // console.log("nav", navigation);
            }}
          />
        </Drawer>
      </View>
    </SafeAreaView>
  );
};

export default connect(null, { getCurrentUser, logout })(DrawerMenu);

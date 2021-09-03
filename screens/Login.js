import {
  Icon,
  useTheme,
  Input,
  Button,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { login, register, setError } from "../api/user/userActions";
import design from "./Login/design";

const Login = ({ login, register, setError, user }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const styles = design(insets, theme);

  const [signup, setSignUp] = React.useState(false);
  const [password, setPassword] = React.useState("Butterfly-123#7");
  const [repassword, setPasswordRe] = React.useState("");
  const [email, setEmail] = React.useState("akjbusiness@gmail.com");
  const [name, setName] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [secureTextEntryRe, setSecureTextEntryRe] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user && user.status === 200 && signup && user.isLogin) {
      toggleSignUp(!signup);
      setLoading(false);
    } else if (user && user.status === 200 && !signup && user.isLogin) {
      navigation.navigate("Menu", { screen: "HOME" });
      setLoading(false);
    }
  }, [user]);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryRe = () => {
    setSecureTextEntryRe(!secureTextEntryRe);
  };

  const toggleSignUp = () => {
    setSignUp(!signup);
    setName("");
    setPassword("");
    setPasswordRe("");
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderIconRe = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntryRe}>
      <Icon {...props} name={secureTextEntryRe ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const handleLogin = () => {
    setLoading(true);
    if (email === "") {
      setError({ email: true, message: "Email Id can't be empty." });
    } else if (password === "") {
      setError({ password: true, message: "Password can't be empty." });
    } else {
      const creds = { password, email };
      login(creds);
    }
  };

  const handleRegister = () => {
    setLoading(true);
    if (name === "") {
      setError({ name: true, message: "Name can't be empty." });
    } else if (email === "") {
      setError({ email: true, message: "Email Id can't be empty." });
    } else if (password === "") {
      setError({ password: true, message: "Password can't be empty." });
    } else if (repassword === "") {
      setError({ repassword: true, message: "Passwords doesn't match." });
    } else if (password !== repassword) {
      setError({ repassword: true, message: "Passwords doesn't match." });
    } else {
      const creds = { name: name.trim(), email, password, repassword };
      register(creds);
    }
  };

  return (
    <ImageBackground
      style={styles.mainBg}
      source={require("../assets/login_bg.png")}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {signup && (
          <Input
            style={styles.username}
            status={user.error && user.name ? "danger" : "basic"}
            textStyle={styles.usernameTextStyle}
            value={name}
            placeholder="Full Name"
            onChangeText={(name) => setName(name)}
          />
        )}
        <Input
          style={styles.username}
          status={user.error && user.email ? "danger" : "basic"}
          textStyle={styles.usernameTextStyle}
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email.trim())}
        />
        <Input
          style={styles.password}
          status={user.error && user.password ? "danger" : "basic"}
          textStyle={styles.passwordTextStyle}
          value={password}
          placeholder="Password"
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(password) => setPassword(password.trim())}
        />
        {signup && (
          <Input
            style={styles.password}
            status={user.error && user.repassword ? "danger" : "basic"}
            textStyle={styles.passwordTextStyle}
            value={repassword}
            placeholder="Confirm Password"
            accessoryRight={renderIconRe}
            secureTextEntry={secureTextEntryRe}
            onChangeText={(repassword) => setPasswordRe(repassword.trim())}
          />
        )}

        {user.error && (
          <Text status="danger">
            {(() => {
              loading && setLoading(false);
              return user.message;
            })()}
          </Text>
        )}

        <Button
          style={styles.loginBtn}
          status="danger"
          onPress={
            !loading ? () => (signup ? handleRegister() : handleLogin()) : null
          }
        >
          {loading ? (
            <Spinner size="small" status="basic" />
          ) : !signup ? (
            "LOGIN"
          ) : (
            "SIGN UP"
          )}
        </Button>
        <Button style={styles.signupTxt} onPress={() => toggleSignUp()}>
          {!signup ? "SIGN UP" : "CANCEL"}
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const mapStateToProps = ({ userApi }) => ({
  user: userApi,
});

export default connect(mapStateToProps, { login, register, setError })(Login);

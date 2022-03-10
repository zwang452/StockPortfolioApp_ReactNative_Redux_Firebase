import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Searchbar, Menu, Avatar, Card, IconButton } from "react-native-paper";
import { theme } from "../theme";
import { addRecord } from "../redux/recordSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../components/textInput";
import Button from "../components/button";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { login } from "../redux/userSlice";

const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

const LoginScreen = (props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const dispatch = useDispatch();

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        let userInfo = {
          userID: user.uid,
          displayName: user.displayName,
        };
        dispatch(login(userInfo));
        props.navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 155, height: 155, marginBottom: "10%" }}
        source={require("../financial-profit.png")}
      />

      <Text style={styles.header}>Welcome back.</Text>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
        //onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed} uppercase={false}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 8,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    height: "100%",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 14,
  },
});

export default LoginScreen;

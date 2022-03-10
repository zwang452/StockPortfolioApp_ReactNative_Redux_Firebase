import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Searchbar, Menu, Avatar, Card, IconButton } from "react-native-paper";
import { addRecord } from "../redux/recordSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../components/textInput";
import Button from "../components/button";
import { theme } from "../theme";
import { auth } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
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

const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

const RegisterScreen = (props) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const dispatch = useDispatch();

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: name.value,
          photoURL: null,
        });
        let userInfo = {
          userID: user.uid,
          displayName: name.value,
        };
        dispatch(login(userInfo));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
    console.log("s");
    //props.navigation.replace("HomeScreen", {screen: "Account"});
    props.navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 155, height: 155, marginBottom: "10%" }}
        source={require("../financial-profit.png")}
      />

      <Text style={styles.header}>Create Account</Text>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

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

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("HomeScreen")}
        >
          <Text style={styles.link}>Login</Text>
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
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
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

export default RegisterScreen;

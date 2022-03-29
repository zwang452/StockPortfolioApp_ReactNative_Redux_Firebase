import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  requireNativeComponent,
} from "react-native";
import { Searchbar, Menu, Avatar, Card, IconButton } from "react-native-paper";
import { addRecord } from "../redux/recordSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  FacebookSocialButton,
  GoogleSocialButton,
} from "react-native-social-buttons";
import { theme } from "../theme";
import Button from "../components/button";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { logout } from "../redux/userSlice";
import { loadRecords } from "../redux/recordSlice";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db} from "../FirebaseConfig";

const AccountScreen = (props) => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const dispatch = useDispatch();
  const signOutFromFireBase = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(logout());
    }).catch((error) => {
      // An error happened.
    });
  }
  const test = async () =>{
    let q = query(collection(db, "stocks"), where("userID", "==", userInfo.userID));
    const querySnapshot = await getDocs(q);
    let records = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      records.push(doc.data());
    });
    dispatch(loadRecords(records));
  }
  return (
    <View>
      {!userInfo.loggedIn && (
        <View style={styles.container}>
          <Image
            style={{ width: 155, height: 155, marginBottom: "10%" }}
            source={require("../financial-profit.png")}
          />
          <Text style={styles.header}>Login to Your Account</Text>

          <Text style={styles.text}>Never lose your personal portfolio.</Text>
          <Button
            mode="contained"
            style={styles.button}
            uppercase={false}
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            Login with Email
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            uppercase={false}
            onPress={() => props.navigation.navigate("RegisterScreen")}
          >
            Sign Up with Email
          </Button>
          <GoogleSocialButton
            textStyle={styles.buttonText}
            buttonViewStyle={{
              borderColor: "grey",
              borderWidth: 0.5,
              width: "100%",
              marginVertical: 10,
            }}
          ></GoogleSocialButton>
          <FacebookSocialButton
            textStyle={styles.buttonText}
            buttonViewStyle={styles.button}
          ></FacebookSocialButton>
        </View>
      )}
      {userInfo.loggedIn && (
        <View>
          <Text>Logged in! {userInfo.displayName}</Text>
          <Button onPress= {()=>{signOutFromFireBase()}}>signout</Button>
          <Button onPress= {()=>{test()}}>test</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 14,
  },
  button: {
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: "center",
    marginBottom: 14,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default AccountScreen;

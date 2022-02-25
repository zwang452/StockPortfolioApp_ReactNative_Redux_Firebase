import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Button } from "react-native";
import { Searchbar, Menu } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const RecordInput = (props) => {
  const [query, setQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (query !== "") {
      setMenuVisible(true);
    }
  }, [query]);
  //   const addHandler = () => {
  //     if (!firstname || !lastname || !email) {
  //       alert("Please add all contact information");
  //       return;
  //     }
  //     let newContact = {
  //       firstname: firstname,
  //       lastname: lastname,
  //       email: email,
  //     };
  //     props.navigation.navigate("ScreenOne", newContact);
  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //   };
  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        anchor={
          <Searchbar
            style={styles.searchBar}
            inputStyle={{ color: "black" }}
            icon={({ size, color }) => (
              <MaterialIcons name="search" size={24} color />
            )}
            clearIcon={({ size, color }) => (
              <MaterialIcons name="cancel" size={24} color />
            )}
            value={query}
            onChangeText={setQuery}
          />
        }
        visible={menuVisible}
      >
        {array.map((value, index) => (
          <Menu.Item
            title={`${query}_${index}`}
            onPress={() => setMenuVisible(false)}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 8,
    backgroundColor: "#ecf0f1",
    alignItems: 'center'
    
  },
  searchBar: {
    marginTop: "2%",
    width: windowWidth * 0.95,
  },
  menu: {
    marginTop: '15%',
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 0.95
  },
});

export default RecordInput;

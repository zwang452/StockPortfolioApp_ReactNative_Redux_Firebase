import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
const SCREEN_WIDTH = Dimensions.get("window").width;

const Record = (props) => {
  const rightSwipe = (progress, dragX) => {
    return (
      <View style={styles.deleteBox}>
        <TouchableOpacity onPress={props.onDelete}>
          <Animated.Text>Delete</Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.container}>
        <Image source={{ uri: props.data.iconUrl }} style={styles.logo}></Image>
        <Text style={styles.name}>{props.data.shortName}</Text>
        <Text style={styles.price}>{props.data.regularMarketPrice}</Text>
      </View>
    </Swipeable>
  );
};

export default Record;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
  },
  deleteBox: {
    backgroundColor: "red",
    height: "100%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    height: null,
    width: null,
    minHeight: "100%",
    resizeMode: "contain",
    
  },
  name: {
    flex: 3,
  },
  price:{
      flex:1
  }
});

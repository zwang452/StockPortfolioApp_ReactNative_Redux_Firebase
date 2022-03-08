import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { deleteRecord } from "../redux/recordSlice";
import Record from "../components/record";
import { useTheme, Portal, FAB } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListScreen = (props) => {
  const records = useSelector((state) => state.recordReducer.records);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const safeArea = useSafeArea();
  const deleteFromList = (symbol) => {
    dispatch(deleteRecord(symbol));
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={records}
        renderItem={({ item }) => {
          return (
            <Record
              data={item}
              onDelete={() => deleteFromList(item.symbol)}
            ></Record>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperator}></View>;
        }}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Text style={{ flex: 1 }}></Text>
              <Text style={{ flex: 3 }}></Text>
              <View style={{ flex: 1.05, flexDirection:"row", alignItems:'center', justifyContent:'flex-start' }}>
                <Icon name="attach-money" size={15} color="grey"></Icon>
                <Text style={{color: 'grey'}}>Price</Text>
              </View>
            </View>
          );
        }}
      ></FlatList>
      <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="playlist-plus"
          onPress={() => props.navigation.navigate("AddScreen")}
          style={{
            position: "absolute",
            bottom: safeArea.bottom + 85,
            backgroundColor: "white",
            right: 16,
          }}
        />
      </Portal>
      <StatusBar style="auto" />
    </View>
  );
};
export default ListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginTop: "0%",
  },
  seperator: {
    height: 0.25,
    backgroundColor: "grey",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
  },
});

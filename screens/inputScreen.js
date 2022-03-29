import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import {
  Searchbar,
  Menu,
  Avatar,
  Card,
  IconButton,
  Button,
} from "react-native-paper";
import { addRecord } from "../redux/recordSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { XRAPIDAPIKEY } from "@env";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { initializeFirestore } from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const RecordInput = (props) => {
  const [query, setQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedStock, setSelected] = useState("");
  const [companies, setCompanies] = useState([]);
  const closeMenu = () => setMenuVisible(false);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userReducer.userInfo.userID);
  const addToList = async () => {
    //To-do : find a company logo api from stock symbol
    let url;
    if (selectedStock.symbol === "GOOG") {
      url = {
        iconUrl:
          "https://staffordonline.org/wp-content/uploads/2019/01/Google-600x600.jpg",
      };
    } else if (selectedStock.symbol === "AAPL") {
      url = {
        iconUrl: "https://logo.clearbit.com/apple.com",
      };
    } else if (selectedStock.symbol === "AMD") {
      url = {
        iconUrl: "https://logo.clearbit.com/amd.com",
      };
    } else {
      url = {
        iconUrl:
          "https://static.vecteezy.com/system/resources/thumbnails/001/500/616/small/building-icon-free-vector.jpg",
      };
    }
    let record = { ...selectedStock, ...url };
    dispatch(addRecord(record));
    if (userID) {
      try {
        const docRef = await setDoc(doc(db, "stocks", record.symbol + userID), {
          ...record,
          userID: userID,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const onPressMenuItem = (stock) => {
    if (stock) {
      fetch(
        `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=${stock.symbol}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "stock-data-yahoo-finance-alternative.p.rapidapi.com",
            "x-rapidapi-key": XRAPIDAPIKEY,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setSelected(data.quoteResponse.result[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    closeMenu();
    setCardVisible(true);
  };

  const stockNameAutoComplete = (text) => {
    setQuery(text);
    if (text.length > 2) {
      fetch(
        `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete?query=${text}&lang=en`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "stock-data-yahoo-finance-alternative.p.rapidapi.com",
            "x-rapidapi-key": XRAPIDAPIKEY,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          let tmpArray = [];
          for (var i = 0; i < data.ResultSet.Result.length; i++) {
            tmpArray.push(data.ResultSet.Result[i]);
          }
          setCompanies(tmpArray);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const card =
    cardVisible && selectedStock ? (
      <Card style={styles.card}>
        <Card.Title
          title={selectedStock.displayName}
          subtitle={selectedStock.symbol}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <Card.Content>
          <Text>{selectedStock.marketState}</Text>
          <Text>
            Price: {selectedStock.regularMarketPrice}{" "}
            {selectedStock.regularMarketChange.toFixed(2)}{" "}
            {selectedStock.regularMarketChangePercent}%
          </Text>
          <Text>
            Post Market Price: {selectedStock.postMarketPrice}{" "}
            {selectedStock.postMarketChange}{" "}
            {selectedStock.postMarketChangePercent}%
          </Text>
          <Text>
            Previous Close: {selectedStock.regularMarketPreviousClose}
          </Text>
          <Text>High: {selectedStock.regularMarketDayHigh}</Text>
          <Text>Low: {selectedStock.regularMarketDayLow}</Text>
          <Text>Analyst Rating: {selectedStock.averageAnalystRating}</Text>
          <Text>Volume: {selectedStock.regularMarketVolume}</Text>
          <Text>Market Cap: {selectedStock.marketCap}</Text>
          <Text>P/E: {selectedStock.trailingPE}</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="plus" onPress={addToList}>
            Add to List
          </Button>
        </Card.Actions>
      </Card>
    ) : null;
  useEffect(() => {
    if (query !== "" && query.length > 2) {
      setMenuVisible(true);
    }
  }, [query]);
  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        onDismiss={closeMenu}
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
            onChangeText={(text) => stockNameAutoComplete(text)}
          />
        }
        visible={menuVisible}
      >
        {companies.map((value, index) => (
          <Menu.Item
            key={index}
            title={`${value.symbol} - ${value.name}`}
            onPress={() => onPressMenuItem(value)}
          />
        ))}
      </Menu>

      {card}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 8,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
  },
  searchBar: {
    marginTop: "2%",
    width: windowWidth * 0.95,
  },
  menu: {
    marginTop: "15%",
    flex: 1,
    alignSelf: "center",
    width: windowWidth * 0.95,
  },
  card: {
    width: windowWidth * 0.95,
    marginTop: "2%",
  },
});

export default RecordInput;

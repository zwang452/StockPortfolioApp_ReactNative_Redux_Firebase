import React from "react";
import color from 'color';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme, Portal, FAB } from "react-native-paper";

import ListScreen from "./listScreen";
import AccountScreen from "./accountScreen";

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="List"
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
        activeColor={'black'}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
          barStyle={{ backgroundColor: '#ffff' }}
    
        
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarIcon: "format-list-bulleted",
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: "account",
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
export default BottomTabs;

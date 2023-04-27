import * as React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../src/HomeScreen";
import BookmarkScreen from "../src/BookmarkScreen";

const Tab = createBottomTabNavigator();

export default function BottomBarNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="home-outline"
                  size={focused ? 24 : 20}
                  color={focused ? "black" : "gray"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: focused ? "800" : "700",
                    color: focused ? "black" : "gray",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="bookmark-outline"
                  size={focused ? 24 : 20}
                  color={focused ? "black" : "gray"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: focused ? "800" : "700",
                    color: focused ? "black" : "gray",
                  }}
                >
                  Bookmarks
                </Text>
              </View>
            ),
          }}
          name="BookmarkScreen"
          component={BookmarkScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

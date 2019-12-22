import React from "react";
import { Platform } from "react-native";
import { BG_COLOR } from "../constants/Colors";
import { createStack } from "./config";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import MoviesScreen from "../screens/Movies";
import TVScreen from "../screens/TV";
import SearchScreen from "../screens/Search";
import TabBarIcon from "../components/TabBarIcon";

const TabNavigation = createBottomTabNavigator(
    {
        Movies: {
            screen: createStack(MoviesScreen, "Movies"),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-film" : "md-film"}
                    />
                )
            }
        },
        TV: {
            screen: createStack(TVScreen, "TV"),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-tv" : "md-tv"}
                    />
                )
            }
        },
        Search: {
            screen: createStack(SearchScreen, "Search"),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={
                            Platform.OS === "ios" ? "ios-search" : "md-search"
                        }
                    />
                )
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            style: {
                backgroundColor: BG_COLOR
            }
        }
    }
);

export default createAppContainer(TabNavigation);

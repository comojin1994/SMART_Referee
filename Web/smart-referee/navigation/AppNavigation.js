import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainNavigation from "./MainNavigation";
import ModalScreen from "../screens/Modal";
import TeamDetailScreen from "../screens/TeamDetail";

export const AppNavigation = createStackNavigator(
    {
        Main: MainNavigation,
        Modal: {
            screen: ModalScreen
        },
        TeamDetail: {
            screen: TeamDetailScreen
        }
    },
    {
        mode: "modal",
        headerMode: "None",
        initialRouteName: "Main"
    }
);

export default createAppContainer(AppNavigation);

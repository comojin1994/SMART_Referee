import React from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppNavigation from "./navigation/AppNavigation";

export default class App extends React.Component {
    state = {
        loaded: false
    };

    handleError = error => console.log(error);

    handleLoaded = () => this.setState({ loaded: true });

    loadAssets = async () => {
        await Font.loadAsync({
            ...Ionicons.font
        });
    };

    render() {
        const { loaded } = this.state;

        if (loaded) {
            return (
                <Provider store={store}>
                    <StatusBar barStyle="light-content" />
                    <AppNavigation />
                </Provider>
            );
        } else {
            return (
                <AppLoading
                    startAsync={this.loadAssets}
                    onFinish={this.handleLoaded}
                    onError={this.handleError}
                />
            );
        }
    }
}

import { createStackNavigator } from "react-navigation";
import { BG_COLOR, TINT_COLOR } from "../constants/Colors";

export const createStack = (screen, title) =>
    createStackNavigator({
        Screen: {
            screen,
            navigationOptions: {
                title,
                ...headerStyles
            }
        }
    });

export const headerStyles = {
    headerStyle: {
        backgroundColor: BG_COLOR,
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        color: TINT_COLOR
    },
    headerTintColor: TINT_COLOR
};

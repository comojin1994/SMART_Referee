import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles } from "./config";
import AvatarModal from "../components/AvatarModal";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import ForgetScreen from "../screens/Forget";
import HomeScreen from "../screens/Home";
import MenuScreen from "../screens/Menu";
import PlayScreen from "../screens/Play";
import PracticeScreen from "../screens/Practice";
import RecordScreen from "../screens/Record";
import TeamScreen from "../screens/Team";
import TeamManageScreen from "../screens/TeamManage";
import TeamCreateScreen from "../screens/TeamCreate";
import TeamSearchScreen from "../screens/TeamSearch";

const MainNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                title: "회원가입",
                ...headerStyles
            }
        },
        Forget: {
            screen: ForgetScreen,
            navigationOptions: {
                title: "비밀번호 찾기",
                ...headerStyles
            }
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: "HOME",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        Menu: {
            screen: MenuScreen,
            navigationOptions: {
                title: "Menu",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        Play: {
            screen: PlayScreen,
            navigationOptions: {
                header: null
            }
        },
        Practice: {
            screen: PracticeScreen,
            navigationOptions: {
                title: "Practice",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        Record: {
            screen: RecordScreen,
            navigationOptions: {
                title: "Record",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        Team: {
            screen: TeamScreen,
            navigationOptions: {
                title: "TEAM",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        TeamManage: {
            screen: TeamManageScreen,
            navigationOptions: {
                title: "TEAM MANAGE",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        TeamCreate: {
            screen: TeamCreateScreen,
            navigationOptions: {
                title: "TEAM CREATE",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        },
        TeamSearch: {
            screen: TeamSearchScreen,
            navigationOptions: {
                title: "TEAM SEARCH",
                headerRight: <AvatarModal />,
                ...headerStyles
            }
        }
    },
    {
        initialRouteName: "Login",
        headerBackTitleVisible: false
    }
);

export default createAppContainer(MainNavigation);

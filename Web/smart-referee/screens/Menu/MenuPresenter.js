import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import { BG_COLOR } from "../../constants/Colors";
import { withNavigation } from "react-navigation";
import PlayButtonImage from "../../assets/images/play.png";
import PracticeButtonImage from "../../assets/images/practice.png";
import TeamButtonImage from "../../assets/images/team.png";
import Layout from "../../constants/Layout";

const Container = styled.View`
    flex: 1;
`;

const MenuButtonContainer = styled.View`
    flex: 1;
    align-items: center;
`;

const MenuButtonImage = styled.ImageBackground`
    width: ${Layout.width - 40};
    height: 200px;
    justify-content: center;
`;

const MenuButton = styled.TouchableOpacity``;

const MenuButtonText = styled.Text`
    font-size: 24px;
    font-weight: 600;
    color: ${BG_COLOR};
    text-align: center;
`;

const MenuPresenter = ({ loading, navigation }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <MenuButtonContainer
                style={{ justifyContent: "flex-end", marginBottom: -20 }}
            >
                <MenuButton onPress={() => navigation.navigate("Play")}>
                    <MenuButtonImage
                        source={PlayButtonImage}
                        resizeMode="stretch"
                        shadowOffset={{ height: 0.5 }}
                        shadowColor="black"
                        shadowOpacity={0.2}
                        imageStyle={{ borderRadius: 15 }}
                    >
                        <MenuButtonText>PLAY</MenuButtonText>
                    </MenuButtonImage>
                </MenuButton>
            </MenuButtonContainer>
            <MenuButtonContainer style={{ justifyContent: "center" }}>
                <MenuButton onPress={() => navigation.navigate("Play")}>
                    <MenuButtonImage
                        source={PracticeButtonImage}
                        resizeMode="stretch"
                        shadowOffset={{ height: 0.5 }}
                        shadowColor="black"
                        shadowOpacity={0.2}
                        imageStyle={{ borderRadius: 20 }}
                    >
                        <MenuButtonText>PRACTICE</MenuButtonText>
                    </MenuButtonImage>
                </MenuButton>
            </MenuButtonContainer>

            <MenuButtonContainer
                style={{ justifyContent: "flex-start", marginTop: -20 }}
            >
                <MenuButton onPress={() => navigation.navigate("Team")}>
                    <MenuButtonImage
                        source={TeamButtonImage}
                        resizeMode="stretch"
                        shadowOffset={{ height: 0.5 }}
                        shadowColor="black"
                        shadowOpacity={0.2}
                        imageStyle={{ borderRadius: 15 }}
                    >
                        <MenuButtonText>TEAM</MenuButtonText>
                    </MenuButtonImage>
                </MenuButton>
            </MenuButtonContainer>
        </Container>
    );

MenuPresenter.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default withNavigation(MenuPresenter);

import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Game from "../../components/Game";
import styled from "styled-components";
import { BG_COLOR, TINT_COLOR } from "../../constants/Colors";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";
import Graph from "../../assets/images/graph.png";
import LoginButtonBox from "../../assets/images/btn_box.png";

const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${BG_COLOR};
`;

const PlayerRecordContainer = styled.View`
    flex: 4;
    width: ${Layout.width - 40};
    justify-content: center;
    align-items: center;
`;

const PlayerRecord = styled.Image`
    width: 180px;
    height: 220px;
`;

const GameResultTextContainer = styled.View`
    width: 80%;
    padding-vertical: 20px;
`;

const GameResultText = styled.Text`
    font-size: 18px;
    font-weight: 600;
`;

const LoaderContainer = styled.View`
    flex: 4;
`;

const GameResultContainer = styled.ScrollView`
    flex: 4;
`;

const CenterViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const MenuButtonContainer = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
`;

const MenuButton = styled.TouchableOpacity``;

const MenuButtonImage = styled.ImageBackground`
    width: ${Layout.width - 20};
    height: 70px;
    justify-content: center;
    border-radius: 30px;
`;

const MenuButtonText = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${BG_COLOR};
    text-align: center;
`;

const NoGameTextContainer = styled.View`
    width: 80%;
    flex: 5;
    justify-content: center;
`;

const NoGameText = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${TINT_COLOR};
    text-align: center;
`;

const HomePresenter = ({ loading, navigation, error, gameList }) => (
    <Container>
        <GameResultTextContainer>
            <GameResultText>선수 기록</GameResultText>
        </GameResultTextContainer>
        <PlayerRecordContainer
            style={{ backgroundColor: "#fff" }}
            shadowOffset={{ height: 0.1 }}
            shadowColor="black"
            shadowOpacity={0.2}
        >
            <PlayerRecord source={Graph} resizeMode="cover" />
        </PlayerRecordContainer>
        <GameResultTextContainer>
            <GameResultText>경기 결과</GameResultText>
        </GameResultTextContainer>
        {loading ? (
            <LoaderContainer>
                <Loader />
            </LoaderContainer>
        ) : (
            <>
                {gameList.length != 0 ? (
                    <GameResultContainer showsVerticalScrollIndicator={false}>
                        <CenterViewContainer>
                            {gameList.map((data, idx) => (
                                <Game
                                    key={idx}
                                    awayScore={data.awayScore}
                                    homeScore={data.homeScore}
                                    awayGuildName={
                                        data.guildByAwayGuildId.guildName
                                    }
                                    homeGuildName={
                                        data.guildByHomeGuildId.guildName
                                    }
                                />
                            ))}
                        </CenterViewContainer>
                    </GameResultContainer>
                ) : (
                    <NoGameTextContainer>
                        <NoGameText>경기 정보가 없습니다.</NoGameText>
                    </NoGameTextContainer>
                )}
            </>
        )}

        <MenuButtonContainer>
            <MenuButton onPress={() => navigation.navigate("Menu")}>
                <MenuButtonImage source={LoginButtonBox} resizeMode="stretch">
                    <MenuButtonText>MENU</MenuButtonText>
                </MenuButtonImage>
            </MenuButton>
        </MenuButtonContainer>
    </Container>
);

HomePresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    gameList: PropTypes.array
};

export default withNavigation(HomePresenter);

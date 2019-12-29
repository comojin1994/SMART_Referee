import React from "react";
import styled from "styled-components";
import Layout from "../constants/Layout";
import PropTypes from "prop-types";
import teamA from "../assets/images/teamA.png";
import teamB from "../assets/images/teamB.png";

const Container = styled.View`
    width: ${Layout.width - 60};
    height: 60px;
    border-radius: 5px;
    border: 1px solid #bababa;
    margin-bottom: 7px;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const TeamContainer = styled.View`
    width: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const TeamInfoContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`;

const MatchTeamInfoContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

const TeamLogoImage = styled.ImageBackground`
    width: 50px;
    height: 50px;
    margin-left: ${props => (props.away ? "0px" : "15px")};
    margin-right: ${props => (props.away ? "15px" : "0px")};
`;

const TeamInfoTeamName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 5px;
    color: #bababa;
`;

const GameScore = styled.Text`
    font-weight: 600;
    font-size: 16px;
`;

const VsTextContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding-horizontal: 10px;
`;

const VsText = styled.Text`
    font-weight: 500;
    font-size: 14;
`;

const Game = ({ awayScore, awayGuildName, homeScore, homeGuildName }) => (
    <Container
        style={{ backgroundColor: "#fff" }}
        shadowOffset={{ height: 0.1 }}
        shadowColor="black"
        shadowOpacity={0.2}
    >
        <TeamContainer>
            <TeamInfoContainer>
                <TeamLogoImage source={teamA} away={false} />
                <MatchTeamInfoContainer>
                    <TeamInfoTeamName>
                        {awayGuildName.length > 5
                            ? `${awayGuildName.substring(0, 5)}...`
                            : awayGuildName}
                    </TeamInfoTeamName>
                    <GameScore>{awayScore}</GameScore>
                </MatchTeamInfoContainer>
            </TeamInfoContainer>
        </TeamContainer>
        <VsTextContainer>
            <VsText>VS</VsText>
        </VsTextContainer>
        <TeamContainer>
            <TeamInfoContainer>
                <MatchTeamInfoContainer>
                    <TeamInfoTeamName>
                        {homeGuildName.length > 5
                            ? `${homeGuildName.substring(0, 5)}...`
                            : homeGuildName}
                    </TeamInfoTeamName>
                    <GameScore>{homeScore}</GameScore>
                </MatchTeamInfoContainer>
                <TeamLogoImage source={teamB} away={true} />
            </TeamInfoContainer>
        </TeamContainer>
    </Container>
);

Game.propsType = {
    awayGuildName: PropTypes.string.isRequired,
    awayScore: PropTypes.number.isRequired,
    homeGuildName: PropTypes.string.isRequired,
    homeScore: PropTypes.number.isRequired
};

export default Game;

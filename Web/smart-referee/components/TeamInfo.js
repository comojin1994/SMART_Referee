import React from "react";
import Props from "prop-types";
import styled from "styled-components";
import TeamEmptyImage from "../assets/images/team_empty.png";

const TeamContainer = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
    padding: 30px 0px 20px 0px;
    width: 100%;
`;

const LogoImg = styled.Image`
    width: 140px;
    height: 140px;
`;

const TeamInfoContainer = styled.View`
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

const TeamName = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
`;
const TeamRecord = styled.Text`
    font-size: 14px;
    font-weight: 500;
`;

const TeamInfo = ({ guildInfo }) => (
    <TeamContainer>
        <LogoImg source={TeamEmptyImage} />

        <TeamInfoContainer>
            <TeamName>{guildInfo.name}</TeamName>
            <TeamRecord>
                {guildInfo.wins}승 {guildInfo.loses}패 {guildInfo.draws}무
            </TeamRecord>
        </TeamInfoContainer>
    </TeamContainer>
);

TeamInfo.propsType = {
    guildInfo: Props.object
};

export default TeamInfo;

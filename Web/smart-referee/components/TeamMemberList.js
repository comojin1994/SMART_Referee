import React from "react";
import Props from "prop-types";
import styled from "styled-components";
import TeamMember from "./TeamMember";

const CenterViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const TeamMemberList = ({ memberList, guildName }) => (
    <CenterViewContainer>
        {memberList.map(member => (
            <TeamMember key={member.id} member={member} guildName={guildName} />
        ))}
    </CenterViewContainer>
);

TeamMemberList.propsType = {
    memberList: Props.array,
    guildName: Props.string
};

export default TeamMemberList;

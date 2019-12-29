import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import UserImage from "../assets/images/teamA.png";

const MemberContainer = styled.View`
    width: 90%;
    height: 70px;
    border: 1px solid #dbdbdb;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
`;

const MemberProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    margin-horizontal: 5px;
`;

const MemberProfileContentContainer = styled.View`
    width: 250px;
    flex-direction: row;
`;

const MemberInfoContainer = styled.View`
    width: 120px;
`;

const MemberNameText = styled.Text`
    padding-top: 5px;
    font-size: 16px;
    font-weight: 600;
`;

const MemberDetailContainer = styled.View`
    flex-direction: row;
    height: 30px;
    align-items: center;
`;

const MemberAgeText = styled.Text`
    font-size: 12px;
`;

const Bar = styled.View`
    width: 1px;
    height: 10px;
    margin-horizontal: 7px;
    border-right-width: 1px;
    border-right-color: #919090;
`;

const MemberPhoneText = styled.Text`
    font-size: 12px;
`;

const JoinSubmitContainer = styled.View`
    width: 120px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AcceptSubmitContainer = styled.TouchableOpacity`
    margin-right: 5px;
`;

const RejectSubmitContainer = styled.TouchableOpacity``;

const YesNoContainer = styled.View`
    flex-direction: row;
    border: 1px solid #9b54ba;
    border-radius: 15px;
    width: 70px;
    height: 25px;
    justify-content: center;
    align-items: center;
`;

const YesNoText = styled.Text`
    margin-left: 2px;
    text-align: center;
    font-size: 12px;
    color: #9b54ba;
    font-weight: bold;
`;

const TeamJoinMember = ({ idx }) => (
    <MemberContainer>
        <MemberProfileImg source={UserImage} />
        <MemberProfileContentContainer>
            <MemberInfoContainer>
                <MemberNameText>김타자{idx}</MemberNameText>
                <MemberDetailContainer>
                    <MemberAgeText>20세</MemberAgeText>
                    <Bar />
                    <MemberPhoneText>010-1111-1111</MemberPhoneText>
                </MemberDetailContainer>
            </MemberInfoContainer>
            <JoinSubmitContainer>
                <AcceptSubmitContainer
                    onPress={() => console.log("OK")}
                    style={{ marginLeft: 35 }}
                >
                    <YesNoContainer>
                        <AntDesign name="check" size={16} color="#9b54ba" />
                        <YesNoText>YES</YesNoText>
                    </YesNoContainer>
                </AcceptSubmitContainer>
                <RejectSubmitContainer onPress={() => console.log("No")}>
                    <YesNoContainer>
                        <AntDesign name="close" size={16} color="#9b54ba" />
                        <YesNoText>NO</YesNoText>
                    </YesNoContainer>
                </RejectSubmitContainer>
            </JoinSubmitContainer>
        </MemberProfileContentContainer>
    </MemberContainer>
);

TeamJoinMember.propTypes = {
    idx: PropTypes.number.isRequired
};

export default TeamJoinMember;

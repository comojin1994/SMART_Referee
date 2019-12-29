import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import ProfileImage from "../assets/images/profile_empty_main.png";
import { BG_COLOR } from "../constants/Colors";

const MemberContainer = styled.TouchableOpacity`
    width: 90%;
    height: 80px;
    border: 1px solid #dbdbdb;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
`;

const MemberProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    margin: 10px 10px;
`;

const MemberProfileContentContainer = styled.View`
    flex: 7;
    flex-direction: column;
    display: flex;
    justify-content: center;
`;

const MemberNameContainer = styled.Text`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -10px;
    margin-left: 2px;
`;

const MemberDetailContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    height: 40px;
    display: flex;
    align-items: center;
`;

const MemberRecordContainer = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 20px;
    display: flex;
    flex: 1;
`;

const MemberRecordCategory = styled.View`
    width: 25px;
    margin-right: 5px;
    justify-content: center;
`;

const MemberRecordCategoryText = styled.Text`
    font-size: 12px;
    text-align: center;
`;

const MemberRecordValue = styled.View`
    width: 40px;
    height: 20px;
    justify-content: center;
    border-radius: 2px;
    margin-right: 3px;
    background-color: ${props => props.color};
`;

const MemberRecordValueText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: ${BG_COLOR};
`;

const TeamMember = ({ member, guildName, navigation }) => (
    <MemberContainer
        onPress={() =>
            navigation.navigate("TeamDetail", {
                user: member.name,
                guildName: guildName
            })
        }
    >
        <MemberProfileImg source={ProfileImage} />
        <MemberProfileContentContainer>
            <MemberNameContainer>{member.name}</MemberNameContainer>
            <MemberDetailContainer>
                <MemberRecordContainer>
                    <MemberRecordCategory>
                        <MemberRecordCategoryText>
                            타수
                        </MemberRecordCategoryText>
                    </MemberRecordCategory>
                    <MemberRecordValue color="#6e6e6e">
                        <MemberRecordValueText>300</MemberRecordValueText>
                    </MemberRecordValue>
                </MemberRecordContainer>
                <MemberRecordContainer style={{ marginLeft: -15 }}>
                    <MemberRecordCategory>
                        <MemberRecordCategoryText>
                            안타
                        </MemberRecordCategoryText>
                    </MemberRecordCategory>
                    <MemberRecordValue color="#783c91">
                        <MemberRecordValueText>100</MemberRecordValueText>
                    </MemberRecordValue>
                </MemberRecordContainer>
                <MemberRecordContainer style={{ marginLeft: -15 }}>
                    <MemberRecordCategory>
                        <MemberRecordCategoryText>
                            홈런
                        </MemberRecordCategoryText>
                    </MemberRecordCategory>
                    <MemberRecordValue color="#2734b0">
                        <MemberRecordValueText>10</MemberRecordValueText>
                    </MemberRecordValue>
                </MemberRecordContainer>
            </MemberDetailContainer>
        </MemberProfileContentContainer>
    </MemberContainer>
);

TeamMember.propTypes = {
    member: PropTypes.object,
    guildName: PropTypes.string
};

export default withNavigation(TeamMember);

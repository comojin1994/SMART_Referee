import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import AvatarImage from "../../assets/images/profile_empty_main.png";
import PatternBg from "../../assets/images/pattern_bg.png";
import ButtonBox from "../../assets/images/btn_box.png";
import Layout from "../../constants/Layout";
import { BG_COLOR } from "../../constants/Colors";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const NameContainer = styled.View`
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 20px;
`;

const PatternBackground = styled.ImageBackground`
    width: 100%;
    height: 200px;
    margin-top: -40px;
`;

const Name = styled.Text`
    font-size: 30px;
    font-weight: 600;
`;

const InfoContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const TeamInfo = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-vertical: 20px;
`;

const InfoDetailContainer = styled.View`
    flex-direction: column;
    width: 120px;
    border-right-width: ${props => (props.borderCheck ? "1px" : "0px")};
    border-right-color: black;
    padding-horizontal: 20px;
`;

const InfoLabel = styled.Text`
    font-size: 16px;
    color: #919090;
    text-align: center;
    padding-bottom: 10px;
`;

const InfoText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
`;

const UsernameContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const UserNameText = styled.Text`
    font-size: 20px;
    color: #919090;
`;

const UserProfileImage = styled.Image`
    width: 160px;
    height: 160px;
    margin-top: -120px;
`;

const TopButtonContainer = styled.View`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 40;
    flex-direction: row;
`;

const BackButton = styled.TouchableOpacity`
    flex: 5;
    position: absolute;
    top: 20;
    left: 20;
    z-index: 2;
`;

const ExitButton = styled.TouchableOpacity`
    padding-top: 40px;
`;

const ExitButtonBox = styled.ImageBackground`
    width: ${Layout.width - 60};
    height: 80px;
    justify-content: center;
`;

const ExitButtonText = styled.Text`
    color: ${BG_COLOR};
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

const TeamPresenter = ({ user, guildName, loading, navigation }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <TopButtonContainer>
                <PatternBackground source={PatternBg} style={{ zIndx: 2 }} />
                <BackButton
                    onPress={() => navigation.goBack()}
                    style={{ zIndx: 1 }}
                >
                    <AntDesign name="close" size={32} color="white" />
                </BackButton>
            </TopButtonContainer>
            <UserProfileImage source={AvatarImage} />

            <NameContainer>
                <Name>{user.replace(/\"/g, "")}</Name>
            </NameContainer>
            <InfoContainer>
                <UsernameContainer>
                    <UserNameText>alstn2468_@naver.com</UserNameText>
                </UsernameContainer>

                <TeamInfo>
                    <InfoDetailContainer borderCheck={true}>
                        <InfoLabel>소속팀</InfoLabel>
                        <InfoText>{guildName.replace(/\"/g, "")}</InfoText>
                    </InfoDetailContainer>

                    <InfoDetailContainer borderCheck={true}>
                        <InfoLabel>포지션</InfoLabel>
                        <InfoText>투수</InfoText>
                    </InfoDetailContainer>

                    <InfoDetailContainer borderCheck={false}>
                        <InfoLabel>나이</InfoLabel>
                        <InfoText>21</InfoText>
                    </InfoDetailContainer>
                </TeamInfo>
            </InfoContainer>
            <ExitButton>
                <ExitButtonBox
                    source={ButtonBox}
                    style={{ borderRadius: 20 }}
                    resizeMode="stretch"
                >
                    <ExitButtonText>EXILE</ExitButtonText>
                </ExitButtonBox>
            </ExitButton>
        </Container>
    );

TeamPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.string,
    guildName: PropTypes.string
};

export default withNavigation(TeamPresenter);

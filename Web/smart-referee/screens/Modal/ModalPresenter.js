import React from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import AvatarImage from "../../assets/images/profile_empty_main.png";
import PatternBg from "../../assets/images/pattern_bg.png";
import BaseBall from "../../assets/images/baseball.png";

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
    margin-top: -180px;
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

const SettingsButton = styled.TouchableOpacity`
    flex: 5;
    top: 20;
    right: 20;
    position: absolute;
    z-index: 2;
`;

const CreditContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const BallCreditImage = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const CreditText = styled.Text`
    font-size: 24px;
`;

const ModalPresenter = ({ loading, navigation }) =>
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
                <SettingsButton style={{ zIndx: 1 }}>
                    <MaterialCommunityIcons
                        name="settings"
                        size={32}
                        color="white"
                    />
                </SettingsButton>
            </TopButtonContainer>
            <UserProfileImage source={AvatarImage} />

            <NameContainer>
                <Name>김투수</Name>
            </NameContainer>
            <InfoContainer>
                <UsernameContainer>
                    <UserNameText>alstn2468_@naver.com</UserNameText>
                </UsernameContainer>

                <TeamInfo>
                    <InfoDetailContainer borderCheck={true}>
                        <InfoLabel>소속팀</InfoLabel>
                        <InfoText>Thumbs</InfoText>
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
                <CreditContainer>
                    <BallCreditImage source={BaseBall} />
                    <CreditText>100</CreditText>
                </CreditContainer>
            </InfoContainer>
        </Container>
    );

ModalPresenter.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default withNavigation(ModalPresenter);

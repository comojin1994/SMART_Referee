import React from "react";
import { BG_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import styled from "styled-components";
import LoginLogo from "../../assets/images/login_logo.png";
import LoginButtonBox from "../../assets/images/btn_box.png";
import { withNavigation } from "react-navigation";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BG_COLOR};
`;

const LogoImageContainer = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;

const LogoImage = styled.ImageBackground`
    width: 150px;
    height: 100px;
    margin-top: 50px;
`;

const LoginInputContainer = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    border-bottom-width: 2px;
    border-bottom-color: #bababa;
    margin-bottom: 5px;
    padding-top: 30px;
`;

const InputLabelText = styled.Text`
    padding-bottom: 5px;
    color: #bababa;
`;

const Input = styled.TextInput`
    width: ${Layout.width - 100};
    padding: 10px;
    text-align: left;
`;

const ButtonContainer = styled.View`
    flex: 2;
    align-items: center;
    padding-bottom: 20px;
`;

const LoginButtonContainer = styled.TouchableOpacity``;

const LoginButtonImage = styled.ImageBackground`
    width: ${Layout.width - 120};
    height: 70px;
    justify-content: center;
    border-radius: 30px;
`;

const LoginButton = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${BG_COLOR};
    text-align: center;
`;

const AccountButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    padding: 20px 0px;
`;

const AccountButton = styled.TouchableOpacity``;

const AccountButtonText = styled.Text`
    font-size: 15px;
    padding: 0px 5px;
    font-weight: 600;
`;

const Bar = styled.Text`
    font-size: 15px;
    font-weight: 600;
`;

const LoginPresenter = ({
    loading,
    error,
    usernameTerm,
    passwordTerm,
    handleUsernameUpdate,
    handlePasswordUpdate,
    onSubmitEditing,
    navigation
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <LogoImageContainer>
                <LogoImage source={LoginLogo} resizeMode="contain" />
            </LogoImageContainer>

            <LoginInputContainer>
                <InputContainer>
                    <InputLabelText>USERNAME</InputLabelText>
                    <Input
                        placeholder=""
                        value={usernameTerm}
                        onChangeText={handleUsernameUpdate}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabelText>PASSWORD</InputLabelText>
                    <Input
                        secureTextEntry={true}
                        placeholder=""
                        value={passwordTerm}
                        onChangeText={handlePasswordUpdate}
                        onSubmitEditing={onSubmitEditing}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </InputContainer>
            </LoginInputContainer>

            <ButtonContainer>
                <AccountButtonContainer>
                    <AccountButton>
                        <AccountButtonText
                            onPress={() => navigation.navigate("SignUp")}
                        >
                            회원가입
                        </AccountButtonText>
                    </AccountButton>

                    <Bar> | </Bar>

                    <AccountButton
                        onPress={() => navigation.navigate("Forget")}
                    >
                        <AccountButtonText>비밀번호 찾기</AccountButtonText>
                    </AccountButton>
                </AccountButtonContainer>
                <LoginButtonContainer
                    onPress={() => {
                        console.log(
                            "Username :",
                            usernameTerm,
                            "\nPassword :",
                            passwordTerm
                        );

                        navigation.navigate("Home");
                    }}
                >
                    <LoginButtonImage
                        source={LoginButtonBox}
                        resizeMode="stretch"
                    >
                        <LoginButton>LOG IN</LoginButton>
                    </LoginButtonImage>
                </LoginButtonContainer>
            </ButtonContainer>
        </Container>
    );

LoginPresenter.propTypes = {
    token: PropTypes.string,
    error: PropTypes.string,
    usernameTerm: PropTypes.string,
    passwordTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleUsernameUpdate: PropTypes.func.isRequired,
    handlePasswordUpdate: PropTypes.func.isRequired
};

export default withNavigation(LoginPresenter);

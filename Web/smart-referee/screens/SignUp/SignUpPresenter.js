import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import Loader from "../../components/Loader";
import { BG_COLOR } from "../../constants/Colors";
import LoginButtonBox from "../../assets/images/btn_box.png";
import { CheckBox } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { Alert } from "react-native";

const Container = styled.View`
    flex: 1;
    display: flex;
    padding: 50px 0 0 0;
    justify-content: center;
    align-items: center;
    background-color: ${BG_COLOR};
`;

const SignUpInputContainer = styled.View`
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    flex: 1;
    border-bottom-width: 2px;
    border-bottom-color: #bababa;
    margin-bottom: 30px;
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

const AgreementContainer = styled.View`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
`;

const CheckBoxContainer = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

const SignUpButtonContainer = styled.View`
    flex: 3;
    display: flex;
    align-items: center;
`;

const SignUpButton = styled.TouchableOpacity``;

const SignUpButtonImage = styled.ImageBackground`
    width: ${Layout.width - 60};
    height: 70px;
    justify-content: center;
    border-radius: 30px;
`;

const SignUpButtonText = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${BG_COLOR};
    text-align: center;
`;

const SignUpPresenter = ({
    loading,
    usernameTerm,
    emailTerm,
    passwordTerm,
    passwordCheckTerm,
    handleUsernameUpdate,
    handleEmailUpdate,
    handlePasswordUpdate,
    handlePasswordCheckUpdate,
    buttonOneChecked,
    buttonTwoChecked,
    buttonThrChecked,
    onPressOneCheckBox,
    onPressTwoCheckBox,
    onPressThrCheckBox,
    navigation
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <SignUpInputContainer>
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
                    <InputLabelText>E-MAIL</InputLabelText>
                    <Input
                        placeholder=""
                        value={emailTerm}
                        onChangeText={handleEmailUpdate}
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
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabelText>PASSWORD CHECK</InputLabelText>
                    <Input
                        secureTextEntry={true}
                        placeholder=""
                        value={passwordCheckTerm}
                        onChangeText={handlePasswordCheckUpdate}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </InputContainer>
            </SignUpInputContainer>
            <AgreementContainer>
                <CheckBoxContainer>
                    <CheckBox
                        center
                        size={16}
                        title={"서비스 이용약관에 동의합니다.   (필수)"}
                        onPress={onPressOneCheckBox}
                        checked={buttonOneChecked}
                        containerStyle={{
                            backgroundColor: "white",
                            borderWidth: 0,
                            margin: 0
                        }}
                    />
                </CheckBoxContainer>
                <CheckBoxContainer>
                    <CheckBox
                        center
                        size={16}
                        title={"개인정보취급방침에 동의합니다. (필수)"}
                        onPress={onPressTwoCheckBox}
                        checked={buttonTwoChecked}
                        containerStyle={{
                            backgroundColor: "white",
                            borderWidth: 0,
                            margin: 0
                        }}
                    />
                </CheckBoxContainer>
                <CheckBoxContainer>
                    <CheckBox
                        center
                        size={16}
                        title={"개인정보추가수집에 동의합니다. (필수)"}
                        onPress={onPressThrCheckBox}
                        checked={buttonThrChecked}
                        containerStyle={{
                            backgroundColor: "white",
                            borderWidth: 0,
                            margin: 0
                        }}
                    />
                </CheckBoxContainer>
            </AgreementContainer>
            <SignUpButtonContainer>
                {buttonOneChecked &&
                buttonTwoChecked &&
                buttonThrChecked &&
                passwordTerm &&
                passwordCheckTerm &&
                emailTerm &&
                usernameTerm ? (
                    <SignUpButton
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <SignUpButtonImage
                            source={LoginButtonBox}
                            resizeMode="stretch"
                        >
                            <SignUpButtonText>SIGN UP</SignUpButtonText>
                        </SignUpButtonImage>
                    </SignUpButton>
                ) : (
                    <SignUpButton
                        onPress={() => {
                            Alert.alert("오류 발생", "모든 양식을 채워주세요.");
                        }}
                    >
                        <SignUpButtonImage
                            source={LoginButtonBox}
                            resizeMode="stretch"
                        >
                            <SignUpButtonText>SIGN UP</SignUpButtonText>
                        </SignUpButtonImage>
                    </SignUpButton>
                )}
            </SignUpButtonContainer>
        </Container>
    );

SignUpPresenter.propTypes = {
    error: PropTypes.string,
    usernameTerm: PropTypes.string,
    emailTerm: PropTypes.string,
    passwordTerm: PropTypes.string,
    passwordCheckTerm: PropTypes.string,
    buttonOneChecked: PropTypes.bool.isRequired,
    buttonTwoChecked: PropTypes.bool.isRequired,
    buttonThrChecked: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    handleUsernameUpdate: PropTypes.func.isRequired,
    handleEmailUpdate: PropTypes.func.isRequired,
    handlePasswordUpdate: PropTypes.func.isRequired,
    handlePasswordCheckUpdate: PropTypes.func.isRequired,
    onPressOneCheckBox: PropTypes.func.isRequired,
    onPressTwoCheckBox: PropTypes.func.isRequired,
    onPressThrCheckBox: PropTypes.func.isRequired
};

export default withNavigation(SignUpPresenter);

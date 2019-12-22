import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../components/Loader";
import LoginButtonBox from "../../assets/images/btn_box.png";
import { BG_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";

const Container = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
    border-bottom-width: 2px;
    border-bottom-color: #bababa;
    width: 80%;
    height: 60px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const ForgetInput = styled.TextInput`
    width: 100%;
    padding: 5px;
    text-align: left;
    font-size: 16px;
`;

const SearchButton = styled.TouchableOpacity``;

const SearchButtonImage = styled.ImageBackground`
    width: ${Layout.width - 60};
    height: 70px;
    justify-content: center;
    border-radius: 30px;
`;

const SearchButtonText = styled.Text`
    color: ${BG_COLOR};
    font-size: 16px;
    text-align: center;
    font-weight: 700;
`;

const ResultModal = styled.Modal``;

const ModalView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ResultTextContainer = styled.View`
    height: 100px;
    width: 260px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const ResultText = styled.Text`
    text-align: center;
    font-weight: ${props => (props.bold ? "bold" : "normal")};
`;

const ModalCloseButton = styled.TouchableOpacity``;

const ModalCloseButtonImage = styled.ImageBackground`
    width: 260px;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
`;

const ModalCloseButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
`;

const ForgetPresenter = ({
    loading,
    phoneNumberInputTerm,
    onClickForgetButton,
    modalVisible,
    closeModal,
    handlePhoneNumberInputUpdate
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <ResultModal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={closeModal}
                transparent={true}
            >
                <ModalView>
                    <ResultTextContainer>
                        {phoneNumberInputTerm ? (
                            <ResultText>
                                <ResultText bold={true}>
                                    {phoneNumberInputTerm}{" "}
                                </ResultText>
                                <ResultText>번호로{"\n"}</ResultText>
                                <ResultText>
                                    이메일 정보를 받아보시겠습니까?
                                </ResultText>
                            </ResultText>
                        ) : (
                            <ResultText>번호를 입력하세요.</ResultText>
                        )}
                    </ResultTextContainer>

                    <ModalCloseButton onPress={closeModal} activeOpacity={0.8}>
                        <ModalCloseButtonImage
                            source={LoginButtonBox}
                            resizeMode="cover"
                            style={{ borderRadius: 10 }}
                        >
                            <ModalCloseButtonText>확인</ModalCloseButtonText>
                        </ModalCloseButtonImage>
                    </ModalCloseButton>
                </ModalView>
            </ResultModal>

            <InputContainer>
                <ForgetInput
                    placeholder="가입시 사용한 번호를 입력하세요."
                    value={phoneNumberInputTerm}
                    onChangeText={handlePhoneNumberInputUpdate}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </InputContainer>
            <SearchButton onPress={onClickForgetButton}>
                <SearchButtonImage source={LoginButtonBox} resizeMode="stretch">
                    <SearchButtonText>비밀번호 찾기</SearchButtonText>
                </SearchButtonImage>
            </SearchButton>
        </Container>
    );

ForgetPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    phoneNumberInputTerm: PropTypes.string.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    handlePhoneNumberInputUpdate: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    onClickForgetButton: PropTypes.func.isRequired
};

export default ForgetPresenter;

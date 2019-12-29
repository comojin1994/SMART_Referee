import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { Dropdown } from "react-native-material-dropdown";
import { Region } from "../../constants/Region";
import { BG_COLOR } from "../../constants/Colors";
import ButtonBox from "../../assets/images/btn_menu.png";
import Layout from "../../constants/Layout";

const Container = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const TextContainer = styled.View`
    width: 100px;
    padding-bottom: 5px;
    text-align: left;
    align-self: stretch;
`;

const PickerText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    padding-left: 30px;
    margin-bottom: -5px;
`;

const PickerContainer = styled.View`
    width: ${Layout.width - 60};
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Picker = styled.View`
    width: 100%;
    justify-content: center;
    padding-bottom: 5px;
`;

const TeamNameInput = styled.TextInput`
    width: 100%;
    padding: 0 0 8px 0;
    text-align: left;
    font-size: 14px;
    border-bottom-width: 1px;
    border-bottom-color: #bababa;
`;

const SearchButtonBox = styled.ImageBackground`
    width: ${Layout.width - 40};
    height: 70px;
    border-radius: 15px;
    justify-content: center;
    margin-vertical: 3px;
`;

const SearchButton = styled.TouchableOpacity`
    padding-top: 80px;
`;

const SearchButtonText = styled.Text`
    color: ${BG_COLOR};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

const TeamCreatePresenter = ({
    loading,
    teamNameTerm,
    handleTeamNameUpdate,
    extractRegionData,
    onClickCreateButton,
    error
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <TextContainer style={{ marginBottom: -10 }}>
                <PickerText>지역</PickerText>
            </TextContainer>
            <PickerContainer style={{ marginBottom: 40 }}>
                <Picker>
                    <Dropdown
                        placeholder="지역을 선택하세요."
                        data={Region}
                        onChangeText={value => extractRegionData(value)}
                        fontSize={14}
                    />
                </Picker>
            </PickerContainer>

            <TextContainer>
                <PickerText>팀이름</PickerText>
            </TextContainer>
            <PickerContainer>
                <TeamNameInput
                    placeholder="팀 이름을 입력하세요."
                    value={teamNameTerm}
                    onChangeText={handleTeamNameUpdate}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            </PickerContainer>

            <SearchButton onPress={onClickCreateButton}>
                <SearchButtonBox
                    source={ButtonBox}
                    style={{ borderRadius: 20 }}
                    resizeMode="stretch"
                >
                    <SearchButtonText>CREATE</SearchButtonText>
                </SearchButtonBox>
            </SearchButton>
        </Container>
    );

TeamCreatePresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    teamNameTerm: PropTypes.string.isRequired,
    handleTeamNameUpdate: PropTypes.func.isRequired,
    extractRegionData: PropTypes.func.isRequired,
    onClickCreateButton: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TeamCreatePresenter;

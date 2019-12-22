import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { BG_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Dropdown } from "react-native-material-dropdown";
import { Region } from "../../constants/Region";
import ButtonBox from "../../assets/images/btn_menu.png";
import Search from "../../assets/images/search.png";
import TeamCount from "../../assets/images/teamCount.png";
import TeamRecord from "../../assets/images/record.png";

const Container = styled.View`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const SearchContainer = styled.View`
    width: 100%;
    align-items: flex-start;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
`;

const TextContainer = styled.View`
    width: 300px;
    padding-bottom: 5px;
    text-align: left;
    align-self: stretch;
`;

const PickerText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    padding-left: 40px;
    margin-bottom: -5px;
`;

const ResultNumText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #5d3f6a;
`;

const PickerContainer = styled.View`
    width: ${Layout.width - 60};
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Picker = styled.View`
    width: 95%;
    justify-content: center;
    padding-bottom: 5px;
`;

const TeamNameInput = styled.TextInput`
    width: 95%;
    padding: 0 0 8px 0;
    text-align: left;
    font-size: 14px;
    border-bottom-width: 1px;
    border-bottom-color: #bababa;
`;

const SearchButtonBox = styled.ImageBackground`
    width: ${Layout.width - 60};
    height: 70px;
    border-radius: 15px;
    margin-vertical: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const SearchButton = styled.TouchableOpacity``;

const SearchButtonText = styled.Text`
    width: auto;
    height: 20px;
    color: ${BG_COLOR};
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

const SearchButtonIcon = styled.Image`
    width: 16px;
    height: 16px;
    margin-right: 5px;
`;

const ResultContainer = styled.View`
    flex: 6;
    display: flex;
    width: 100%;
    padding-top: 10px;
`;

const ResultScrollView = styled.ScrollView``;

const CenterViewContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TeamInfoContainer = styled.View`
    width: ${Layout.width - 20};
    height: 60px;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    margin-top: 10px;
    padding: 5px;
    flex-direction: row;
    align-items: center;
`;

const TeamNameText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    width: 120px;
    text-align: center;
    padding-horizontal: 10px;
`;

const TeamIcon = styled.Image`
    width: 12px;
    height: 12px;
    margin-right: 6px;
`;

const DetailContainer = styled.View`
    flex-direction: row;
    width: 40px;
    margin-right: 20px;
`;

const TeamRecordText = styled.Text`
    color: #6e6e6e;
    font-size: 10px;
`;

const TeamJoinButton = styled.TouchableOpacity`
    background-color: ${BG_COLOR};
    border: 1px solid #9b54ba;
    justify-content: center;
    border-radius: 20px;
    width: 60px;
    height: 25px;
    margin-left: -5px;
`;

const TeamJoinButtonText = styled.Text`
    color: #9b54ba;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
`;

const Text = styled.Text`
    font-size: 10px;
    padding-top: 20px;
`;

const TeamSearchPresenter = ({
    loading,
    searchLoading,
    teamNameTerm,
    region,
    handleTeamNameUpdate,
    onClickSearchButton,
    onClickJoinButton,
    extractRegionData,
    teamList,
    error
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <TextContainer style={{ marginBottom: -10, marginTop: 40 }}>
                <PickerText>지역</PickerText>
            </TextContainer>
            <PickerContainer style={{ marginBottom: 10 }}>
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

            <SearchButton onPress={onClickSearchButton}>
                <SearchButtonBox
                    source={ButtonBox}
                    resizeMode="stretch"
                    style={{ borderRadius: 20 }}
                >
                    <SearchButtonIcon source={Search} />
                    <SearchButtonText>SEARCH</SearchButtonText>
                </SearchButtonBox>
            </SearchButton>
            <ResultContainer>
                <SearchContainer>
                    <TextContainer>
                        <PickerText style={{ fontSize: 16, paddingLeft: 30 }}>
                            검색결과{" "}
                            {teamList ? (
                                <>
                                    <ResultNumText>
                                        {teamList.length}
                                    </ResultNumText>
                                    <PickerText style={{ fontSize: 16 }}>
                                        건
                                    </PickerText>
                                </>
                            ) : null}
                        </PickerText>
                    </TextContainer>
                </SearchContainer>
                {searchLoading ? (
                    <Loader />
                ) : (
                    <ResultScrollView>
                        {error ? (
                            <CenterViewContainer>
                                <Text>{error}</Text>
                            </CenterViewContainer>
                        ) : (
                            <CenterViewContainer>
                                {teamList ? (
                                    teamList.length !== 0 ? (
                                        teamList.map(team => (
                                            <TeamInfoContainer key={team.id}>
                                                <TeamNameText>
                                                    {team.guildName}
                                                </TeamNameText>
                                                <DetailContainer>
                                                    <TeamIcon
                                                        source={TeamCount}
                                                        resizeMode="stretch"
                                                    />
                                                    <TeamRecordText>
                                                        30명
                                                    </TeamRecordText>
                                                </DetailContainer>
                                                <DetailContainer
                                                    style={{
                                                        width: 70,
                                                        marginRight: 30
                                                    }}
                                                >
                                                    <TeamIcon
                                                        source={TeamRecord}
                                                        resizeMode="stretch"
                                                    />
                                                    <TeamRecordText>
                                                        {team.wins}승{" "}
                                                        {team.loses}패{" "}
                                                        {team.draws}무
                                                    </TeamRecordText>
                                                </DetailContainer>

                                                <TeamJoinButton
                                                    onPress={() =>
                                                        onClickJoinButton(
                                                            team.id,
                                                            team.guildName
                                                        )
                                                    }
                                                >
                                                    <TeamJoinButtonText>
                                                        가입
                                                    </TeamJoinButtonText>
                                                </TeamJoinButton>
                                            </TeamInfoContainer>
                                        ))
                                    ) : (
                                        <Text style={{ fontSize: 20 }}>
                                            검색 결과가 존재하지 않습니다.
                                        </Text>
                                    )
                                ) : (
                                    <Text style={{ fontSize: 20 }}>
                                        팀을 검색하세요.
                                    </Text>
                                )}
                            </CenterViewContainer>
                        )}
                    </ResultScrollView>
                )}
            </ResultContainer>
        </Container>
    );

TeamSearchPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    searchLoading: PropTypes.bool.isRequired,
    teamNameTerm: PropTypes.string.isRequired,
    region: PropTypes.string,
    handleTeamNameUpdate: PropTypes.func.isRequired,
    onClickSearchButton: PropTypes.func.isRequired,
    onClickJoinButton: PropTypes.func.isRequired,
    extractRegionData: PropTypes.func.isRequired,
    teamList: PropTypes.array,
    error: PropTypes.string
};

export default TeamSearchPresenter;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { BG_COLOR } from "../../constants/Colors";
import TeamInfo from "../../components/TeamInfo";
import TeamMemberList from "../../components/TeamMemberList";
import TeamEmptyImage from "../../assets/images/team_empty.png";
import ButtonBox from "../../assets/images/btn_menu.png";
import Layout from "../../constants/Layout";

const Container = styled.View`
    flex: 1;
`;

const NoTeamContainer = styled.View`
    display: flex;
    flex: 1;
    padding-bottom: 50px;
    justify-content: center;
    align-items: center;
`;

const NoTeamImage = styled.Image`
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
`;

const NoTeamTextContainer = styled.View`
    padding-bottom: 60px;
`;

const NoTeamText = styled.Text`
    font-size: 14px;
    font-weight: 600;
    padding-vertical: 3px;
    color: #bababa;
    text-align: center;
`;

const TeamJoinButton = styled.TouchableOpacity``;

const TeamJoinButtonBox = styled.ImageBackground`
    width: ${Layout.width - 40};
    height: 70px;
    border-radius: 15px;
    justify-content: center;
    margin-vertical: 3px;
`;

const TeamJoinButtonText = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${BG_COLOR};
    text-align: center;
`;

const OrTextContainer = styled.View`
    height: 50px;
    display: flex;
    justify-content: center;
`;

const OrText = styled.Text`
    font-size: 15px;
    color: #5d3f6a;
    font-weight: bold;
`;

const TeamMemberContainer = styled.ScrollView`
    flex: 7;
    width: 100%;
`;

const TopButtonContainer = styled.View`
    width: 100%;
    height: 50px;
    position: absolute;
    z-index: 1;
    top: 10;
`;

const SettingsButton = styled.TouchableOpacity`
    align-items: flex-end;
    padding-right: 20px;
`;

const TeamPresenter = ({
    loading,
    hasTeam,
    isMaster,
    navigation,
    error,
    memberList,
    guildInfo
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {hasTeam ? (
                <>
                    {isMaster ? (
                        <TopButtonContainer>
                            <SettingsButton
                                onPress={() =>
                                    navigation.navigate("TeamManage")
                                }
                            >
                                <MaterialCommunityIcons
                                    name="settings"
                                    size={26}
                                    color="black"
                                />
                            </SettingsButton>
                        </TopButtonContainer>
                    ) : null}
                    {guildInfo ? <TeamInfo guildInfo={guildInfo} /> : null}
                    <TeamMemberContainer showsVerticalScrollIndicator={false}>
                        {memberList ? (
                            <TeamMemberList
                                memberList={memberList}
                                guildName={guildInfo.name}
                            />
                        ) : null}
                    </TeamMemberContainer>
                </>
            ) : (
                <NoTeamContainer>
                    <NoTeamImage source={TeamEmptyImage} />
                    <NoTeamTextContainer>
                        <NoTeamText>가입된 팀 정보가 없습니다.</NoTeamText>
                        <NoTeamText>
                            팀에 가입하거나 팀을 생성해보세요.
                        </NoTeamText>
                    </NoTeamTextContainer>
                    <TeamJoinButton
                        onPress={() => navigation.navigate("TeamSearch")}
                    >
                        <TeamJoinButtonBox
                            source={ButtonBox}
                            style={{ borderRadius: 20 }}
                            resizeMode="stretch"
                        >
                            <TeamJoinButtonText>팀 가입하기</TeamJoinButtonText>
                        </TeamJoinButtonBox>
                    </TeamJoinButton>
                    <OrTextContainer>
                        <OrText>OR</OrText>
                    </OrTextContainer>
                    <TeamJoinButton
                        onPress={() => navigation.navigate("TeamCreate")}
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#5D3F6A",
                            paddingBottom: 5
                        }}
                    >
                        <TeamJoinButtonText
                            style={{
                                color: "#5D3F6A"
                            }}
                        >
                            팀 생성하기
                        </TeamJoinButtonText>
                    </TeamJoinButton>
                </NoTeamContainer>
            )}
        </Container>
    );

TeamPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    hasTeam: PropTypes.bool.isRequired,
    isMaster: PropTypes.bool.isRequired,
    error: PropTypes.string,
    memberList: PropTypes.array,
    guildInfo: PropTypes.object
};

export default withNavigation(TeamPresenter);

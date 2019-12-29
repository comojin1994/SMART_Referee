import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import TeamJoinMemberList from "../../components/TeamJoinMemberList";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TeamManageSummary = styled.View`
    display: flex;
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: flex-start;
`;

const TeamManageText = styled.Text`
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
    padding-left: 15px;
`;

const TeamManageListContainer = styled.ScrollView`
    flex: 9;
    width: 100%;
`;

const NoScrollView = styled.View`
    flex: 9;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const TeamManagePresenter = ({ loading, error }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <TeamManageSummary>
                <TeamManageText>가입신청</TeamManageText>
            </TeamManageSummary>
            <TeamManageListContainer>
                <TeamJoinMemberList />
            </TeamManageListContainer>
        </Container>
    );

TeamManagePresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    memberList: PropTypes.array,
    error: PropTypes.string
};

export default TeamManagePresenter;

import React from "react";
import TeamSearchPresenter from "./TeamSearchPresenter";
import { Alert } from "react-native";
import { guildApi } from "../../api";

export default class extends React.Component {
    state = {
        loading: false,
        searchLoading: false,
        teamNameTerm: "",
        region: "",
        error: null,
        teamList: null
    };

    handleTeamNameUpdate = text => {
        this.setState({ teamNameTerm: text });
        console.log("Team Name :", text);
    };

    onClickSearchButton = async () => {
        try {
            const { region, teamNameTerm: teamName } = this.state;
            let teamList = [];

            if (teamName === "." || teamName === "..") {
                throw Error("잘못된 팀명으로 검색되었습니다.");
            }

            this.setState({ searchLoading: true });
            console.log("Searching...", region, teamName);

            if (teamName === "") {
                ({ data: teamList } = await guildApi.getGuildListByRegion(
                    region
                ));
                console.log(teamList);
            } else if (region === "") {
                ({ data: teamList } = await guildApi.getGuildListByGuildName(
                    teamName
                ));
                console.log(teamList);
            } else {
                ({ data: teamList } = await guildApi.getGuildByRegionGuildName(
                    teamName,
                    region
                ));
            }

            console.log(teamList);

            this.setState({ teamList });
        } catch (e) {
            console.log(e);
            this.setState({ error: "팀 검색에 실패했습니다." });
        } finally {
            this.setState({ searchLoading: false });
            console.log("Searching Finish...");
        }
    };

    onClickJoinButton = async (key, teamName) => {
        // let check = await guildApi.reportApplicationForm(key);
        Alert.alert("", `${teamName} 가입 신청 완료`);
    };

    extractRegionData = region => {
        this.setState({ region });
        console.log("Region", region);
    };

    async componentDidMount() {
        try {
        } catch {
            this.setState({
                error: "Can't get Team information."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {
            loading,
            error,
            teamNameTerm,
            searchLoading,
            region,
            teamList
        } = this.state;

        return (
            <TeamSearchPresenter
                loading={loading}
                searchLoading={searchLoading}
                error={error}
                teamNameTerm={teamNameTerm}
                handleTeamNameUpdate={this.handleTeamNameUpdate}
                onClickSearchButton={this.onClickSearchButton}
                onClickJoinButton={this.onClickJoinButton}
                region={region}
                extractRegionData={this.extractRegionData}
                teamList={teamList}
            />
        );
    }
}

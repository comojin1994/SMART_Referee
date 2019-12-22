import React from "react";
import TeamPresenter from "./TeamPresenter";
import { guildApi } from "../../api";

export default class extends React.Component {
    state = {
        loading: false,
        hasTeam: true,
        isMaster: true,
        memberList: null,
        guildInfo: null,
        error: null
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const { data: guildInfo } = await guildApi.myGuildInfo(5959);
            const { data: memberList } = await guildApi.myGuildMemberList(5959);

            console.log(memberList);

            this.setState({ memberList, guildInfo });
        } catch (e) {
            console.log(e);
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
            hasTeam,
            isMaster,
            error,
            memberList,
            guildInfo
        } = this.state;

        return (
            <TeamPresenter
                loading={loading}
                hasTeam={hasTeam}
                error={error}
                isMaster={isMaster}
                memberList={memberList}
                guildInfo={guildInfo}
            />
        );
    }
}

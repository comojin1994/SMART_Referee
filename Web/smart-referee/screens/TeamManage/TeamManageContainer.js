import React from "react";
import TeamManagePresenter from "./TeamManagePresenter";

export default class extends React.Component {
    state = {
        loading: false,
        memberList: null,
        error: null
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const { data: memberList } = await guildApi.myGuildMemberList(5959);

            console.log(memberList);

            this.setState({ memberList });
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
        const { loading, memberList, error } = this.state;
        return (
            <TeamManagePresenter
                loading={loading}
                memberList={memberList}
                error={error}
            />
        );
    }
}

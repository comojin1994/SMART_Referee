import React from "react";
import TeamDetailPresenter from "./TeamDetailPresenter";

export default class extends React.Component {
    state = {
        loading: false,
        user: null
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });
        } catch {
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading } = this.state;
        const { navigation } = this.props;

        return (
            <TeamDetailPresenter
                loading={loading}
                user={JSON.stringify(navigation.getParam("user"))}
                guildName={JSON.stringify(navigation.getParam("guildName"))}
            />
        );
    }
}

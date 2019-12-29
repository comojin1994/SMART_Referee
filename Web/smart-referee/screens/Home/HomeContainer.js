import React from "react";
import HomePresenter from "./HomePresenter";
import { gameApi } from "../../api";

export default class extends React.Component {
    state = {
        loading: false,
        error: null,
        gameList: []
    };

    componentDidMount = async () => {
        try {
            let gameList = [];
            this.setState({ loading: true });
            ({ data: gameList } = await gameApi.getMyGuildGameMatchList(2));
            this.setState({ gameList });
        } catch (error) {
            console.log(error);
            this.setState({ error: "Can't get game information" });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { loading, error, gameList } = this.state;

        return (
            <HomePresenter
                loading={loading}
                error={error}
                gameList={gameList}
            />
        );
    }
}

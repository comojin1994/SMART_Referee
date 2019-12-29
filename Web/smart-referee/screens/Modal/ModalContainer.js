import React from "react";
import ModalPresenter from "./ModalPresenter";
import { guildApi } from "../../api";

export default class extends React.Component {
    state = {
        loading: false,
        userData: null,
        error: null
    };

    componentDidMount = async () => {
        try {
            this.setState({ loading: true });

            let userData = await guildApi.memberInfo(1, 1);
            console.log(userData);
            this.setState({ userData });
        } catch (error) {
            this.setState({ error: error });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { loading, userData, error } = this.state;
        return (
            <ModalPresenter
                loading={loading}
                userData={userData}
                error={error}
            />
        );
    }
}

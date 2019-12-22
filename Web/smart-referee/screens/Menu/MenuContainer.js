import React from "react";
import MenuPresenter from "./MenuPresenter";

export default class extends React.Component {
    state = {
        loading: false
    };

    render() {
        const { loading } = this.state;
        return <MenuPresenter loading={loading} />;
    }
}

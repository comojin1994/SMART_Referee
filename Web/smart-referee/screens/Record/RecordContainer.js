import React from "react";
import RecordPresenter from "./RecordPresenter";

export default class extends React.Component {
    state = {
        loading: false
    };

    render() {
        const { loading } = this.state;
        return <RecordPresenter loading={loading} />;
    }
}

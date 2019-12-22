import React from "react";
import LoginPresenter from "./LoginPresenter";
import { connect } from "react-redux";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usernameTerm: "",
            passwordTerm: "",
            error: null
        };
    }

    handleUsernameUpdate = text => {
        this.setState({ usernameTerm: text });
    };

    handlePasswordUpdate = text => {
        this.setState({ passwordTerm: text });
    };

    onSubmitEditing = async () => {
        const { usernameTerm, passwordTerm } = this.state;

        if (usernameTerm !== "" && passwordTerm !== "") {
            let error, token;
            this.setState({ loading: true });

            try {
                if (usernameTerm === "123" && passwordTerm === "123") {
                    token = "Get token";
                } else {
                    alert("Invalid User Information");
                }
            } catch {
                error = "Invalid Username or Password";
            } finally {
                this.setState({
                    loading: false,
                    error,
                    token
                });
            }
        }
    };

    render() {
        const {
            token,
            loading,
            error,
            usernameTerm,
            passwordTerm
        } = this.state;

        return (
            <LoginPresenter
                token={token}
                loading={loading}
                error={error}
                usernameTerm={usernameTerm}
                passwordTerm={passwordTerm}
                onSubmitEditing={this.onSubmitEditing}
                handleUsernameUpdate={this.handleUsernameUpdate}
                handlePasswordUpdate={this.handlePasswordUpdate}
            />
        );
    }
}

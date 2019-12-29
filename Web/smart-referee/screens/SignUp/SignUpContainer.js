import React from "react";
import SignUpPresenter from "./SignUpPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usernameTerm: "",
            emailTerm: "",
            passwordTerm: "",
            buttonOneChecked: false,
            buttonTwoChecked: false,
            buttonThrChecked: false,
            passwordCheckTerm: "",
            error: null
        };
    }

    handleUsernameUpdate = text => {
        this.setState({ usernameTerm: text });
    };

    handleEmailUpdate = text => {
        this.setState({ usernameTerm: text });
    };

    handlePasswordUpdate = text => {
        this.setState({ passwordTerm: text });
    };

    handlePasswordCheckUpdate = text => {
        this.setState({ passwordCheckTerm: text });
    };

    onPressOneCheckBox = () => {
        this.setState({ buttonOneChecked: true });
    };

    onPressTwoCheckBox = () => {
        this.setState({ buttonTwoChecked: true });
    };

    onPressThrCheckBox = () => {
        this.setState({ buttonThrChecked: true });
    };

    render() {
        const {
            loading,
            usernameTerm,
            emailTerm,
            passwordTerm,
            passwordCheckTerm,
            buttonOneChecked,
            buttonTwoChecked,
            buttonThrChecked
        } = this.state;

        return (
            <SignUpPresenter
                loading={loading}
                usernameTerm={usernameTerm}
                emailTerm={emailTerm}
                passwordTerm={passwordTerm}
                passwordCheckTerm={passwordCheckTerm}
                buttonOneChecked={buttonOneChecked}
                buttonTwoChecked={buttonTwoChecked}
                buttonThrChecked={buttonThrChecked}
                handleUsernameUpdate={this.handleUsernameUpdate}
                handleEmailUpdate={this.handleEmailUpdate}
                handlePasswordUpdate={this.handlePasswordUpdate}
                handlePasswordCheckUpdate={this.handlePasswordCheckUpdate}
                onPressOneCheckBox={this.onPressOneCheckBox}
                onPressTwoCheckBox={this.onPressTwoCheckBox}
                onPressThrCheckBox={this.onPressThrCheckBox}
            />
        );
    }
}

import React from "react";
import ForgetPresenter from "./ForgetPresenter";
import { accountApi } from "../../api";

export default class extends React.Component {
    state = {
        loading: false,
        modalVisible: false,
        phoneNumberInputTerm: ""
    };

    handlePhoneNumberInputUpdate = text => {
        console.log(text);
        this.setState({ phoneNumberInputTerm: text });
    };

    onClickForgetButton = async () => {
        const { phoneNumberInputTerm: phoneNumber } = this.state;

        // let result;

        // try {
        //     ({ data: result } = await accountApi.findAccountId(phoneNumber));
        // } catch (error) {
        //     result = null;
        // }

        this.setState({ modalVisible: true });
    };

    closeModal = () => {
        this.setState({ modalVisible: false });
    };

    render() {
        const { loading, phoneNumberInputTerm, modalVisible } = this.state;

        return (
            <ForgetPresenter
                loading={loading}
                modalVisible={modalVisible}
                phoneNumberInputTerm={phoneNumberInputTerm}
                closeModal={this.closeModal}
                handlePhoneNumberInputUpdate={this.handlePhoneNumberInputUpdate}
                onClickForgetButton={this.onClickForgetButton}
            />
        );
    }
}

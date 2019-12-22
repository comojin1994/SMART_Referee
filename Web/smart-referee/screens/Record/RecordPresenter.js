import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const RecordPresenter = ({ loading }) =>
    loading ? <Loader /> : <Text>Records</Text>;

RecordPresenter.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default RecordPresenter;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TINT_COLOR } from "../constants/Colors";

const Container = styled.View`
    margin-vertical: 20px;
`;

const Title = styled.Text`
    color: ${TINT_COLOR};
    font-weight: 600;
    padding-left: 20px;
    margin-bottom: 15px;
`;

const ScrollView = styled.ScrollView`
    padding-left: 20px;
`;

const Section = ({ title, children, horizontal = true }) => (
    <Container>
        <Title>{title}</Title>
        <ScrollView horizontal={horizontal}>{children}</ScrollView>
    </Container>
);

Section.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.string.isRequired,
    horizontal: PropTypes.bool
};

export default Section;

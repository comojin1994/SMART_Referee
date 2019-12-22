import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 20px;
`;

const Text = styled.Text`
    color: ${props => props.color};
    font-weight: 600;
    font-size: 16px;
`;

const Message = ({ text, color }) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Message;

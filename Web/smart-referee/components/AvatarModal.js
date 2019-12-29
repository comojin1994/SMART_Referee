import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import AvatarImage from "../assets/images/profile_empty_main.png";

const Container = styled.View`
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 1);
    margin-right: 10px;
`;

const ModalButton = styled.TouchableOpacity``;

const AvatarImg = styled.Image`
    width: 40px;
    height: 40px;
`;

const AvatarModal = ({ navigation }) => (
    <Container>
        <ModalButton onPress={() => navigation.navigate("Modal")}>
            <AvatarImg source={AvatarImage} />
        </ModalButton>
    </Container>
);

export default withNavigation(AvatarModal);

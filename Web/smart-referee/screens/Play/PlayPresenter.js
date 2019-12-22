import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import { Camera } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { BG_COLOR } from "../../constants/Colors";
import { Platform } from "react-native";

const Container = styled.View`
    flex: 1;
`;

const CameraContainer = styled.View`
    flex: 1;
    background-color: ${BG_COLOR};
    align-items: center;
    justify-content: center;
`;

const Text = styled.Text`
    color: red;
    font-size: 22px;
`;

const BackButtonContainer = styled.View`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 40;
    justify-content: center;
    align-items: flex-end;
`;

const BackButtonAndroid = styled.TouchableWithoutFeedback`
    margin-right: 20px;
`;

const BackButtonIos = styled.TouchableOpacity`
    margin-right: 20px;
`;

const RecordButtonContainer = styled.View`
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 40;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const RecordButtonAndroid = styled.TouchableWithoutFeedback`
    transform: rotate(90deg);
`;

const RecordButtonIos = styled.TouchableOpacity`
    transform: rotate(90deg);
`;

const PlayPresenter = ({
    loading,
    hasPermission,
    navigation,
    isRecord,
    _StartPauseButtonClicked,
    cameraRef
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            <CameraContainer>
                {hasPermission ? (
                    <Camera
                        style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden"
                        }}
                        ref={cameraRef}
                    />
                ) : (
                    <Text>Don't have Permission for this App.</Text>
                )}
            </CameraContainer>

            <BackButtonContainer>
                {Platform.OS === "ios" ? (
                    <BackButtonIos onPress={() => navigation.navigate("Menu")}>
                        <AntDesign name="arrowup" size={50} color="white" />
                    </BackButtonIos>
                ) : (
                    <BackButtonAndroid
                        onPress={() => navigation.navigate("Menu")}
                    >
                        <AntDesign name="arrowup" size={50} color="white" />
                    </BackButtonAndroid>
                )}
            </BackButtonContainer>

            <RecordButtonContainer>
                {Platform.OS === "ios" ? (
                    <RecordButtonIos onPress={_StartPauseButtonClicked}>
                        {isRecord ? (
                            <AntDesign
                                name="pausecircleo"
                                size={50}
                                color="white"
                            />
                        ) : (
                            <AntDesign
                                name="playcircleo"
                                size={50}
                                color="white"
                            />
                        )}
                    </RecordButtonIos>
                ) : (
                    <RecordButtonAndroid onPress={_StartPauseButtonClicked}>
                        {isRecord ? (
                            <AntDesign
                                name="pausecircleo"
                                size={50}
                                color="white"
                            />
                        ) : (
                            <AntDesign
                                name="playcircleo"
                                size={50}
                                color="white"
                            />
                        )}
                    </RecordButtonAndroid>
                )}
            </RecordButtonContainer>
        </Container>
    );

PlayPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    isRecord: PropTypes.bool.isRequired,
    hasPermission: PropTypes.bool,
    _StartPauseButtonClicked: PropTypes.func.isRequired,
    cameraRef: PropTypes.object
};

export default withNavigation(PlayPresenter);

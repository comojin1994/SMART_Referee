import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");

const ALBUM_NAME = "Smiley Cam";

const CenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: cornflowerblue;
`;

const Text = styled.Text`
    color: white;
    font-size: 22px;
`;

const IconBar = styled.View`
    margin-top: 40px;
`;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPermission: null,
            cameraType: Camera.Constants.Type.front,
            smileDetected: false
        };

        this.cameraRef = React.createRef();
    }

    componentDidMount = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === "granted") {
            this.setState({ hasPermission: true });
        } else {
            this.setState({ hasPermission: false });
        }
    };

    render() {
        const { hasPermission, cameraType, smileDetected } = this.state;

        if (hasPermission === true) {
            return (
                <CenterView>
                    <Camera
                        style={{
                            width: width - 40,
                            height: height / 1.5,
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                        type={cameraType}
                        onFacesDetected={
                            smileDetected ? null : this.onFacesDetected
                        }
                        faceDetectionClassifications="all"
                        faceDetectorSettings={{
                            detectLandmarks:
                                FaceDetector.Constants.Landmarks.all,
                            runClassifications:
                                FaceDetector.Constants.Classifications.all
                        }}
                        ref={this.cameraRef}
                    />
                    <IconBar>
                        <TouchableOpacity onPress={this.switchCameraType}>
                            <MaterialIcons
                                name={
                                    cameraType === Camera.Constants.Type.front
                                        ? "camera-rear"
                                        : "camera-front"
                                }
                                size={44}
                                color="white"
                            />
                        </TouchableOpacity>
                    </IconBar>
                </CenterView>
            );
        } else if (hasPermission === false) {
            return (
                <CenterView>
                    <Text>Don't have Permission for this App.</Text>
                </CenterView>
            );
        } else {
            return (
                <CenterView>
                    <ActivityIndicator color="white" size={1} />
                </CenterView>
            );
        }
    }

    switchCameraType = () => {
        const { cameraType } = this.state;

        if (cameraType === Camera.Constants.Type.front) {
            this.setState({
                cameraType: Camera.Constants.Type.back
            });
        } else {
            this.setState({
                cameraType: Camera.Constants.Type.front
            });
        }
    };

    onFacesDetected = faces => {
        const {
            faces: [face]
        } = faces;

        if (face) {
            console.log("smilingProbability :", face.smilingProbability);

            if (face.smilingProbability > 0.7) {
                this.setState({
                    smileDetected: true
                });
                this.takePhoto();
            }
        }
    };

    takePhoto = async () => {
        try {
            if (this.cameraRef.current) {
                let { uri } = await this.cameraRef.current.takePictureAsync({
                    quality: 1
                });

                if (uri) {
                    this.savePhoto(uri);
                }
            }
        } catch (error) {
            alert(error);

            this.setState({
                smileDetected: false
            });
        }
    };

    savePhoto = async uri => {
        try {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );

            if (status === "granted") {
                const asset = await MediaLibrary.createAssetAsync(uri);
                let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);

                if (album === null) {
                    album = await MediaLibrary.createAlbumAsync(
                        ALBUM_NAME,
                        asset
                    );
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
                }
                setTimeout(
                    () =>
                        this.setState({
                            smileDetected: false
                        }),
                    2000
                );
            } else {
                this.setState({ hasPermission: false });
            }
        } catch (error) {
            console.log(error);
        }
    };
}

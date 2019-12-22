import React from "react";
import VideoPresenter from "./VideoPresenter";
import { moviesApi, tvApi } from "api";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
      history
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      videoInfo: {
        isMovie: pathname.includes("/movie/")
      }
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id, videoId }
      },
      history: { push },
      location: { pathname }
    } = this.props;

    const isMovie = pathname.includes("/movie/");
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;
    let parsedVideoId = null;

    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.videos(parsedId));
      } else {
        ({ data: result } = await tvApi.videos(parsedId));
      }
      if (result !== null && result.results.length > 0) {
        const { results: videos } = result;
        if (videoId === undefined || videoId === null) {
          parsedVideoId = videos[0].key;
        } else {
          parsedVideoId = videos.filter(video => video.key === videoId)
            ? videoId
            : videos[0].key;
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({
        videoInfo: {
          error
        }
      });
    } finally {
      this.setState({
        result,
        videoInfo: {
          isMovie,
          videoId: parsedVideoId
        },
        loading: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.videoInfo.videoId === undefined ? false : true;
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { videoId: newVideoId }
      },
      location: { pathname }
    } = nextProps;
    if (this.state.videoInfo.videoId === newVideoId) {
      return;
    } else {
      this.setState({
        videoInfo: {
          videoId: newVideoId,
          isMovie: pathname.includes("/movie")
        }
      });
    }
  }

  render() {
    const { result, videoInfo, loading } = this.state;
    return (
      <VideoPresenter result={result} videoInfo={videoInfo} loading={loading} />
    );
  }
}

export default VideoContainer;

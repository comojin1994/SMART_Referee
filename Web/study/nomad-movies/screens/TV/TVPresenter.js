import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";
import { BG_COLOR } from "../../constants/Colors";

const Container = styled.ScrollView`
    background-color: ${BG_COLOR};
`;

const TVPresenter = ({
    loading,
    popular,
    airingThisWeek,
    airingToday,
    error
}) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {airingToday ? (
                <Section title="Airing Today">
                    {airingToday
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                key={tv.id}
                                id={tv.id}
                                posterPhoto={
                                    tv.poster_path ? tv.poster_path : null
                                }
                                title={tv.name}
                                voteAvg={tv.vote_average}
                                isMovie={false}
                            />
                        ))}
                </Section>
            ) : null}
            {airingThisWeek ? (
                <Section title="Airing This Week">
                    {airingThisWeek
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                key={tv.id}
                                id={tv.id}
                                posterPhoto={
                                    tv.poster_path ? tv.poster_path : null
                                }
                                title={tv.name}
                                voteAvg={tv.vote_average}
                                isMovie={false}
                            />
                        ))}
                </Section>
            ) : null}
            {popular ? (
                <Section title="Popular" horizontal={false}>
                    {popular
                        .filter(tv => tv.poster_path !== null)
                        .map(tv => (
                            <MovieItem
                                key={tv.id}
                                id={tv.id}
                                horizontal={true}
                                posterPhoto={
                                    tv.poster_path ? tv.poster_path : null
                                }
                                title={tv.name}
                                overview={tv.overview}
                                voteAvg={tv.vote_average}
                                isMovie={false}
                            />
                        ))}
                </Section>
            ) : null}
        </Container>
    );

TVPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    popular: PropTypes.array,
    airingThisWeek: PropTypes.array,
    airingToday: PropTypes.array,
    error: PropTypes.string
};

export default TVPresenter;

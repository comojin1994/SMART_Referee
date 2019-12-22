import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { BG_COLOR, GREY_COLOR } from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Section from "../../components/Section";
import MovieItem from "../../components/MovieItem";

const Container = styled.View`
    background-color: ${BG_COLOR};
    flex: 1;
`;

const InputContainer = styled.View`
    align-items: center;
    margin-vertical: 20px;
`;

const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    width: ${Layout.width / 1.6};
    border-radius: 20px;
    padding: 10px;
    text-align: center;
`;

const SearchResults = styled.ScrollView`
    margin-top: 20px;
`;

const SearchPresenter = ({
    loading,
    tvResults,
    movieResults,
    error,
    searchTerm,
    onSubmitEditing,
    handleSearchUpdate
}) => (
    <Container>
        <InputContainer>
            <Input
                value={searchTerm}
                returnKeyType="search"
                onChangeText={handleSearchUpdate}
                onSubmitEditing={onSubmitEditing}
                placeholder="Search movies and tv"
                placeholderTextColor={GREY_COLOR}
            />
        </InputContainer>
        <SearchResults>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {movieResults ? (
                        movieResults.length > 0 ? (
                            <Section title="Movie Results">
                                {movieResults.map(movie => (
                                    <MovieItem
                                        key={movie.id}
                                        id={movie.id}
                                        posterPhoto={
                                            movie.poster_path
                                                ? movie.poster_path
                                                : null
                                        }
                                        title={movie.title}
                                        overview={movie.overview}
                                        voteAvg={movie.vote_average}
                                    />
                                ))}
                            </Section>
                        ) : null
                    ) : null}
                    {tvResults ? (
                        tvResults.length > 0 ? (
                            <Section title="TV Results">
                                {tvResults.map(tv => (
                                    <MovieItem
                                        key={tv.id}
                                        id={tv.id}
                                        posterPhoto={
                                            tv.poster_path
                                                ? tv.poster_path
                                                : null
                                        }
                                        title={tv.name}
                                        voteAvg={tv.vote_average}
                                        isMovie={false}
                                    />
                                ))}
                            </Section>
                        ) : null
                    ) : null}
                    {error ? (
                        <Message color="#e74c3c" text={error} />
                    ) : tvResults &&
                      movieResults &&
                      tvResults.length === 0 &&
                      movieResults.length === 0 ? (
                        <Message color={GREY_COLOR} text="Nothing Found" />
                    ) : null}
                </>
            )}
        </SearchResults>
    </Container>
);

SearchPresenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    handleSearchUpdate: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    tvResults: PropTypes.array,
    movieResults: PropTypes.array
};

export default SearchPresenter;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import { Helmet } from 'react-helmet';
import Message from 'Components/Message';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin: 0 10px;
`;

const OverView = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;



const DetailPresenter = ({ result, loading, error }) => (
    loading ? (
        <div>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
        <Loader/>
        </div>
    ) :
    ( error ? <Message text={error}></Message> :
        <div>
            <Helmet>
                <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
            </Helmet>
            <Container>
                <BackDrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
                <Content>
                    <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : require('assets/noPosterSmall.png')}/>
                    <Data>
                    <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                    <ItemContainer>
                        <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                        <Divider> </Divider>
                        <Item>{result.runtime ? result.runtime : result.episode_run_time}</Item>
                        <Divider> </Divider>
                        <Item>{result.genres && result.genres.map((genre, index) => index === result.genres.length-1 ? genre.name : `${genre.name} / `)}</Item>
                    </ItemContainer>
                    <OverView>{result.overview}</OverView>
                </Data>
                </Content>
            </Container>
        </div>
    )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;
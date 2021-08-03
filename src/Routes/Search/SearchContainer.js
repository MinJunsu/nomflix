import { moviesApi, tvApi } from 'API';
import React from 'react';
import SearchPresenter from 'Routes/Search/SearchPresenter';

class SearchContainer extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: '',
        error: null,
        loading: false
    };

    componentDidMount() {
        // this.handleSubmit();
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { searchTerm } = this.state;
        if (searchTerm !== '') {
            this.searchByTerm(searchTerm);
        }
    }

    updateTerm = (event) => {
        const { target: { value } } = event;
        this.setState({
            searchTerm: value
        })
    }

    searchByTerm = async () => {
        this.setState({loading: true});
        const { searchTerm } = this.state;
        try {
            const { data: { results: movieResults} } = await moviesApi.search(searchTerm);
            const { data: { results: tvResults} } = await tvApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            })
            console.log(this.state);
        } catch {
            this.setState({
                error: "Can't find result"
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const {movieResults, tvResults, searchTerm, error, loading } = this.state;
        return (
            <SearchPresenter movieResults={movieResults} tvResults={tvResults} searchTerm={searchTerm} error={error} loading={loading} handleSubmit={this.handleSubmit} updateTerm={this.updateTerm}/>
        );
    }
}

export default SearchContainer;
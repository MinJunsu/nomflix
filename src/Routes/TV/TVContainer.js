import { tvApi } from 'API';
import React from 'react';
import TVPresenter from 'Routes/TV/TVPresenter';

class TVContainer extends React.Component {
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        error: null,
        loading: true
    }
    async componentDidMount() {
        try {
            const { data: { results: popular } } = await tvApi.popular();
            const { data: { results: topRated} } = await tvApi.topRated();
            const { data: { results: airingToday} } = await tvApi.airingToday();
            this.setState({
                popular,
                topRated,
                airingToday
            })
        } catch {
            this.setState({
                error: "Can't find TV information."
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }
    render() {
        const {topRated, popular, airingToday, error, loading } = this.state;
        return (
            <TVPresenter topRated={topRated} popular={popular} airingToday={airingToday} error={error} loading={loading}/>
        );
        
    }
}

export default TVContainer;
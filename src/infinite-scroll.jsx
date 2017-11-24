import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from './movie-list'
import { Dimmer, Segment, Loader } from 'semantic-ui-react'

export default class InfiniteSroll extends Component {
    render() {
        const { movies, onLoadMore, hasMore, refresh } = this.props
        return (
            <InfiniteScroll
                next={(e) => onLoadMore(e)}
                hasMore={hasMore}
                loader={<Loader active inline='centered' style={{ marginTop: 20 + 'px' }}>More are coming..!</Loader>}>

                <MovieList movies={movies} />

            </InfiniteScroll>
        )
    }
}

import React, { Component } from 'react'
import MovieCard from './movie-card'
import {Card} from 'semantic-ui-react'

export default class MovieList extends Component {
    render() {
        const {movies} = this.props;

        return (
            <Card.Group itemsPerRow={4}>
                {
                    movies.map(m => <MovieCard movie={m}/>)
                }
            </Card.Group>
        )
    }
}

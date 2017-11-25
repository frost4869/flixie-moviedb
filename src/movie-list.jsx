import React, { Component } from 'react'
import MovieCard from './movie-card'
import { Card, Container, Button } from 'semantic-ui-react'


export default class MovieList extends Component {
    render() {
        const { movies, type } = this.props;
        
        return (
            <Card.Group itemsPerRow={4}>
                {movies.map(m => <MovieCard movie={m} type={type}/>)}
            </Card.Group>
        )
    }
}

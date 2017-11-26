import React, { Component } from 'react'
import MovieCard from './movie-card'
import { Card, Container, Button } from 'semantic-ui-react'


export default class MovieList extends Component {
    render() {
        const { movies, type, hasMore } = this.props;
        let content;
        if (movies.length == 0 && !hasMore) {
            content = <h4>Sorry, can't find your film :(</h4>
        } else {
            content = (
                <Card.Group itemsPerRow={4} stackable>
                    {
                        movies.map(m => {
                            if (m) {
                                return <MovieCard movie={m} type={type} />
                            }
                        })
                    }
                </Card.Group>
            )
        }

        return (
            content
        )
    }
}

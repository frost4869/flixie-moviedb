import React, { Component } from 'react'
import MovieCard from './movie-card'
import { Card, Container, Button } from 'semantic-ui-react'


export default class MovieList extends Component {
    render() {
        const { movies, type, hasMore, handleModal } = this.props;

        console.log('render list, movie length: ' + movies.length + ', has more: ' + hasMore);
        
        let content;
        if (movies.length == 0 && !hasMore) {
            content = <h4>Sorry, can't find your film :(</h4>
        } else {
            content = (
                <Card.Group itemsPerRow={4} stackable>
                    {
                        movies.map(m => {
                            if (m) {
                                return <MovieCard movie={m} type={type} handleModal={handleModal}/>
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

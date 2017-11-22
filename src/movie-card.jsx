import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const main_path = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard extends Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Image src={main_path.concat(movie.poster_path)} size='medium' />
                <Card.Content>
                    <Card.Header>
                        {movie.title}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {movie.release_date}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {movie.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='star' />
                    {movie.vote_average}
                </Card.Content>
            </Card>
        )
    }
}

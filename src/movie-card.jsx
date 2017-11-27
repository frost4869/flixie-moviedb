import React, { Component } from 'react'
import { Card, Icon, Image, Transition } from 'semantic-ui-react'
import NoImage from './nopicture.jpg'

const main_path = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        })
    }

    render() {
        const { movie, type, handleModal } = this.props;

        let movieObj = {
            title: type === 'movie' ? movie.title : movie.original_name,
            release_date: type === 'movie' ? movie.release_date.split('-')[0] : movie.first_air_date.split('-')[0],
            poster_path: movie.poster_path ? main_path.concat(movie.poster_path) : NoImage,
            description: movie.overview,
            vote: movie.vote_average
        };

        return (
            <Transition animation='fade up' duration={1000} visible={this.state.visible}>
                <Card onClick={(e) => handleModal(movieObj)}>
                    <Image src={movieObj.poster_path} size='medium' className="poster" />
                    <Card.Content>
                        <Card.Header>
                            {movieObj.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {movieObj.release_date}
                            </span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='star' />
                        {movieObj.vote}
                    </Card.Content>
                </Card>
            </Transition>
        )
    }
}

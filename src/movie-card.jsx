import React, { Component } from 'react'
import { Card, Icon, Image, Transition } from 'semantic-ui-react'
import NoImage from './nopicture.jpg'

const main_path = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.setState({
            visible: true
        })
    }

    render() {
        const { movie } = this.props;

        return (
            <Transition animation='fade up' duration={1000} visible={this.state.visible}>
                <Card>
                    <Image src={movie.poster_path ? main_path.concat(movie.poster_path) : NoImage} size='medium' className="poster"/>
                    <Card.Content>
                        <Card.Header>
                            {movie.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                {movie.release_date.split('-')[0]}
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
            </Transition>
        )
    }
}

import React, { Component } from 'react'
import { Modal, Image, Header, Tab } from 'semantic-ui-react'

const main_path = 'https://image.tmdb.org/t/p/w500';
const main_original_path = 'https://image.tmdb.org/t/p/original';


export default class MovieModal extends Component {
    render() {
        const { movie_details, open, handleModalClose } = this.props;

        return (
            <Modal open={open} closeIcon onClose={handleModalClose} basic dimmer='blurring' size='fullscreen'>
                <Modal.Content image>
                    <Image wrapped size='medium' src={movie_details.movie.poster_path} />
                    <Modal.Description>
                        <p style={{ fontSize: 53, fontWeight: 'bold' }}>
                            {movie_details.movie.title} <span style={{ fontSize: 20, fontWeight: 'initial' }}>({movie_details.movie.release_date})</span>
                        </p>
                        
                        <h4>Overview</h4>
                        <p style={{ fontSize: 20 }}>{movie_details.movie.description}</p>

                        <h4>Posters</h4>
                        <Image.Group size='small'>
                            {movie_details.images.posters ? movie_details.images.posters.map((image) =>
                                <Image src={main_path.concat(image.file_path)} href={main_original_path.concat(image.file_path)}/>
                            ) : <p>Loading</p>}
                        </Image.Group>

                        <h4>Backdrops</h4>
                        <Image.Group size='small'>
                            {movie_details.images.backdrops ? movie_details.images.backdrops.map((image) =>
                                <Image src={main_path.concat(image.file_path)} href={main_original_path.concat(image.file_path)}/>
                            ) : <p>Loading</p>}
                        </Image.Group>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

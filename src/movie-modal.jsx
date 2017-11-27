import React, { Component } from 'react'
import { Modal, Image, Header } from 'semantic-ui-react'

export default class MovieModal extends Component {
    render() {
        const { movie, open, handleModalClose } = this.props;

        return (
            <Modal open={open} closeIcon onClose={handleModalClose} basic dimmer='blurring' size='fullscreen'>
                <Modal.Content image>
                    <Image wrapped size='medium' src={movie.poster_path} />
                    <Modal.Description>
                        <p style={{ fontSize: 53, fontWeight: 'bold' }}>
                            {movie.title} <span style={{ fontSize: 20, fontWeight: 'initial' }}>({movie.release_date})</span>
                        </p>
                        Overview
                        <p style={{ fontSize: 20 }}>{movie.description}</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

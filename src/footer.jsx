import React, { Component } from 'react'
import { Segment, Container, Grid, Divider, Image, List, Header } from 'semantic-ui-react'


export default class Footer extends Component {
    render() {
        const { logo } = this.props;
        return (
            <Segment
                inverted
                vertical
                style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            >
                <Container textAlign='center'>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Header inverted as='h4' content='Footer Header' />
                                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider inverted section />
                    <Image
                        centered
                        size='mini'
                        src={logo}
                    />
                    <List horizontal inverted divided link>
                        <List.Item as='a' href='#'>Site Map</List.Item>
                        <List.Item as='a' href='#'>Contact Us</List.Item>
                        <List.Item as='a' href='#'>Terms and Conditions</List.Item>
                        <List.Item as='a' href='#'>Privacy Policy</List.Item>
                    </List>
                </Container>
            </Segment>
        )
    }
}

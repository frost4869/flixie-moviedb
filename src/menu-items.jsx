import React, { Component } from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'

export default class MenuItems extends Component {
    render() {
        const { logo, type, handleSidebar } = this.props;
        let content
        if (type === 'normal') {
            content = (
                <Container>
                    <Menu.Item as='a' header href='/'>
                        <Image
                            size='mini'
                            src={logo}
                            style={{ marginRight: '1.5em' }}
                        />
                        Flixie - Movies Database
                        </Menu.Item>
                    <Menu.Item as='a' href='/'>Discover</Menu.Item>
                    <Menu.Item as='a'>Movies</Menu.Item>
                    <Menu.Item as='a'>TV Shows</Menu.Item>
                    <Menu.Item as='a'>People</Menu.Item>
                </Container>
            )
        } else {
            content = (
                <Container>
                    <Menu.Item as='a' onClick={this.props.handleSidebar}>
                        <Icon name='list' />
                    </Menu.Item>
                    <Menu.Item as='a' header>
                        <Image
                            size='mini'
                            src={logo}
                            style={{ marginRight: '1.5em' }}
                        />
                        Flixie - Movies Database
                    </Menu.Item>
                </Container>
            )
        }
        return (
            content
        )
    }
}

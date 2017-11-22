import React, { Component } from 'react'
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react'

export default class FixMenu extends Component {
    render() {
        const {logo} = this.props;
        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            <Image
                                size='mini'
                                src={logo}
                                style={{ marginRight: '1.5em' }}
                            />
                            Flixie - Movies Database
                        </Menu.Item>
                        <Menu.Item as='a'>Discover</Menu.Item>
                        <Menu.Item as='a'>Movies</Menu.Item>
                        <Menu.Item as='a'>TV Shows</Menu.Item>
                        <Menu.Item as='a'>People</Menu.Item>

                        <Dropdown item simple text='Categories'>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>Header Item</Dropdown.Header>
                                <Dropdown.Item>
                                    <i className='dropdown icon' />
                                    <span className='text'>Submenu</span>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>List Item</Dropdown.Item>
                                        <Dropdown.Item>List Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Menu>
            </div>
        )
    }
}

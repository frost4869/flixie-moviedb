import React, { Component } from 'react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import MenuItems from './menu-items'

export default class SideBarMenu extends Component {

    render() {
        const { content, logo, visible } = this.props
        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation='push' width='thin'
                    visible={visible} icon='labeled' vertical inverted
                    style={{ paddingTop: 3 + 'em' }}>
                    <Menu.Item as='a'>Discover</Menu.Item>
                    <Menu.Item as='a'>Movies</Menu.Item>
                    <Menu.Item as='a'>TV Shows</Menu.Item>
                    <Menu.Item as='a'>People</Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    {content}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

import React, { Component } from 'react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import MenuItems from './menu-items'

export default class SideBarMenu extends Component {

    handleSidebar() {
        alert('something')
    }

    render() {
        const { content, logo, visible } = this.props
        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
                    <MenuItems logo={logo} type='mobile' handleSidebar={this.handleSidebar.bind(this)} />
                </Sidebar>
                <Sidebar.Pusher>
                    {content}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

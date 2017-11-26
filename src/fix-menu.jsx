import React, { Component } from 'react'
import { Container, Dropdown, Image, Menu, Sidebar, Responsive, Icon } from 'semantic-ui-react'
import MenuItems from './menu-items'

export default class FixMenu extends Component {
    render() {
        const { logo } = this.props;
        const normal_menu = () => {
            return (
                <MenuItems logo={logo} type='normal' />
            )
        }
        const mobile_menu = () => {
            return (
                <MenuItems logo={logo} type='mobile' />
            )
        }
        return (
            <Menu fixed='top' inverted>
                <Responsive as={normal_menu} minWidth={600} />
                <Responsive as={mobile_menu} maxWidth={600} />
            </Menu>
        )
    }
}

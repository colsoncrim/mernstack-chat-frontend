import React, { useContext, useState } from "react";
import { Menu } from 'semantic-ui-react'
import UserContext from "../../context/UserContext";

export default function HomeNavigation() {
    const { userData, setUserData } = useContext(UserContext);
    const [activeItem, setActiveItem] = useState("home");
    // state = { activeItem: 'home' }

    // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    const handleItemClick = (name) => {
        setActiveItem(name);
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <div>
        {userData.user ? (
            <div>
            <Menu pointing secondary>
              <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={() => handleItemClick()}
              />
              <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={() => handleItemClick()}
              />
              <Menu.Item
                name='friends'
                active={activeItem === 'friends'}
                onClick={() => handleItemClick()}
              />
              <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={logout}
                />
              </Menu.Menu>
            </Menu>
          </div>
        )  :  (
            <>
                <div></div>
            </>
        )}
        </div>
    );
}
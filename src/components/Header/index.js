import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Content, Navigation, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-green.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Navigation>
            <NavLink to="/deliveries">DELIVERIES</NavLink>
            <NavLink to="/deliverymen">DELIVERYMEN</NavLink>
            <NavLink to="/recipients">RECIPIENTS</NavLink>
            <NavLink to="/problems">PROBLEMS</NavLink>
          </Navigation>
        </nav>

        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSingOut}>
              logout FastFeet
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

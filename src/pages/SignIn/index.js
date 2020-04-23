import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container, LoginBox } from './styles';

import logo from '~/assets/logo-green.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Enter with a valid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <LoginBox>
        <img src={logo} alt="FastFeet" width={200} />

        <Form schema={schema} onSubmit={handleSubmit}>
          <p>YOUR E-MAIL</p>
          <Input type="email" name="email" placeholder="Your e-mail" />
          <p>PASSWORD</p>
          <Input
            type="password"
            name="password"
            placeholder="Your secret password"
          />

          <button type="submit">Enter</button>
        </Form>
      </LoginBox>
    </Container>
  );
}

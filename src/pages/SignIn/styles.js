import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #067c22, #388a00);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 40px 20px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    p {
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      color: #444;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #999999;
      }
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      border: 0;
      background: #067c22;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#067c22')};
      }
    }
  }
`;

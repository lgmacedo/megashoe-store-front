import { Link } from "react-router-dom";
import styled from "styled-components";

const Titulo = styled.div`
  width: calc(100% - 64px);
  font-family: "Lexend Deca";
  font-style: normal;
  h1 {
    font-weight: 700;
    font-size: 24px;
    color: #fafafa;
    line-height: 30px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #a3a3a3;
  }
  margin-bottom: 10%;
`;

const CadastroContainer = styled.section`
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = styled(Link)`
  margin-top: 32px;
  font-style: normal;
  line-height: 18px;
  font-family: "Lexend Deca";
  font-weight: 400;
  text-decoration: none;
  color: #fafafa;
  span {
    color: #a3e635;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 5px;
  button,
  input {
    width: calc(100% - 64px);
  }
  input {
    height: 45px;
    background: #404040;
    border-radius: 12px;
    border: none;
    outline: none;
    padding: 15px;
    margin: 1px;
    font-size: 18px;
    color: white;
    font-family: "Lexend Deca";
    ::placeholder {
      font-family: "Lexend Deca";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }
  }
`;

export { CadastroContainer, Form, Link, Login, Titulo };

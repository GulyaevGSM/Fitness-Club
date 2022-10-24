import styled from "styled-components";

export const LoginTemplate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const LoginTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 300px;
    margin-bottom: 25px;
    text-align: center;

    ::placeholder {
      text-align: center;
    }
  }

  button {
    width: 200px;
    background-color: #968057;
    color: #fff;
    margin: 20px 0;

    &:hover {
      background-color: #b0986c;
    }
  }
`

export const ResetPassword = styled.div`
  color: #968057;
  margin-bottom: 20px;
  
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const ToRegisterPage = styled.div`
  color: #000;
  
  span {
    color: #968057;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
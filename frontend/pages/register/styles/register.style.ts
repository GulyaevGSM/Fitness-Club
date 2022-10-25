import styled from "styled-components";

export const RegisterTemplate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const RegisterTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`

export const RegisterForm = styled.div`
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
    width: 300px;
    background-color: #968057;
    color: #fff;
    margin: 20px 0;

    &:hover {
      background-color: #b0986c;
    }
  }
`

export const InputWithInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 300px;
  font-size: 12px;
  color: #999;
  text-align: center;
  
  input {
    margin: 0;
    color: #000;
  }
`

export const AcceptInfo = styled.div`
  color: #999;
  font-size: 13px;
  margin: 12px;
`

export const ToLoginPage = styled.div`
  color: #000;
  
  span {
    color: #968057;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const PreloaderOverflow = styled.div`
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0.7;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`
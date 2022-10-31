import styled from "styled-components";

export const ProfileTemplate = styled.div`
  
`

export const ProfileForm = styled.div`
  margin: 0 auto;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  input {
    margin: 20px 5px;
    text-align: center;
    
    ::placeholder {
      text-align: center;
      font-size: 15px;
    }
  }
`
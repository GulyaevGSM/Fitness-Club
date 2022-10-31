import styled from "styled-components";

export const AdminTemplate = styled.div`
  background-color: #212121;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  div {
    margin: 0 80px;
    cursor: pointer;
    padding: 30px;
    font-weight: bold;
    transition: all .2s ease-in;
    
    &:hover {
      background-color: #eee;
      color: #000;
    }
  }
`
import styled from "styled-components";

export const AppHeaderTemplate = styled.div` 
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px 0px;
  margin: 0 auto;
  padding: 30px 80px;
  font-size: 15px;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const UpperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  input {
    width: 330px;
    border-radius: 21px;
  }

  button {
    border-radius: 21px;
    background-color: #958058;
    color: #fff;
    font-size: 15px;
    font-weight: bold;

    &:hover {
      background-color: #c0a87a;
    }
  }
`

export const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  transition: all .2s ease-in;
  color: #727070;

  &:hover {
    color: #000;
    cursor: pointer;
  }
`

export const LowerHeader = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-weight: bold;
  font-size: 18px;
`

export const Logo = styled.div`
  cursor: pointer;
  
  img {
    width: 198px;
    height: 56px;
  }
`

export const CallNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  div {
    font-weight: bold;
    font-size: 21px;
    display: flex;
    align-items: center;
    
    a {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }
  
  span {
    font-size: 15px;
    color: #958058;
    
    &:hover {
      cursor: pointer;
      color: #000;
    }
  }
`

export const NumberPhone = styled.a`
  color: #000;
`

export const LogIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  
  div {
    display: flex;
    align-items: center;
    margin: 3px 0;
    cursor: pointer;

    &:hover {
      a {
        color: #958058;
      }
    }
  }
  
  div:last-child {
    color: #666666;
    font-size: 12px;
    cursor: pointer;
  }
`

export const LowerSection = styled.div`
  
    
  &:hover {
    color: #958058;
    cursor: pointer;
  }
`
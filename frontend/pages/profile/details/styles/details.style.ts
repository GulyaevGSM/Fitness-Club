import styled from "styled-components";

export const DetailsTemplate = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`

export const DetailsTitle = styled.div`
  font-size: 31px;
  font-weight: bold;
  margin-bottom: 30px;
`

export const DetailBlockUpper = styled.div`
  width: 80%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px 0px;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
  
  div:last-child {
    font-size: 23px;
    font-weight: bold;
  }
`

export const DetailBlockLower = styled.div`
  width: 80%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px 0px;
  padding: 20px;
  border-radius: 15px;
  
  >div:first-child {
    display: flex;
    align-items: center;
    justify-content: end;
    color: #968057;
    
    div:last-child {
      
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    
    div:first-child {
      color: #000;
      margin-right: 200px;
      font-weight: bold;
    }
  }
`

export const DetailsUserNames = styled.div`
  display: flex;
  margin: 20px 0;
  justify-content: center;
  text-align: start;
  line-height: 2;
  
  div {
    margin: 0 20px;
  }
`

export const DetailsUserData = styled.div`
  
`

import styled from "styled-components";

export const Container = styled.div`
  max-width: 360px;
  width: 100%;
  height: 100vh;
  padding: 24px;
  color: #fafafa;
  background-color: #1f1f1f;
  border-right: 1px solid #2f2f2f;
`

export const StartAlgorithmButton = styled.button`
  width: 100%;
  height: 64px;
  border: none;
  border-radius: 8px;
  color: #fafafa;
  font-size: 16px;
  font-weight: 700;
  background-color: #9a11ff;
  cursor: pointer;

  &:focus {
    outline-offset: 4px;
    outline: 2px solid #9a11ff;
  }

  &:hover {
    background-color: #9a11ffdd;
  }
`
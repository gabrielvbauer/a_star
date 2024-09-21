import styled from "styled-components";

export const Container = styled.div`
  width: 640px;
  border-radius: 8px;
  background-color: #1f1f1f;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: absolute;
  top: 32px;
  right: calc(50% - 180px);
  transform: translate(50%, 0);
`

export const Button = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 6px;
  border: none;
  background-color: #2f2f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #313131;
  }

  &:focus {
    outline-offset: 4px;
    outline: 2px solid #9a11ff;
  }

  &[data-selected=true] {
    background-color: #9a11ff;

    &:hover {
      background-color: #9a11ffdd;
    }
  }
`
import styled from "styled-components";

export const Container = styled.div`
  max-width: 360px;
  width: 100%;
  height: 100vh;
  padding: 24px;
  color: #fafafa;
  background-color: #1f1f1f;
  border-right: 1px solid #2f2f2f;

  display: flex;
  flex-direction: column;
  gap: 32px;
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
  margin-top: auto;

  &:focus {
    outline-offset: 4px;
    outline: 2px solid #9a11ff;
  }

  &:hover {
    background-color: #9a11ffdd;
  }
`

export const ConfigSectionTitle = styled.span`
  font-family: monospace;
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
`

export const ConfigSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const HorizontalView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

export const InputLabel = styled.label`
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 8px;
  display: block;
`

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 16px;
  background-color: #2f2f2f;
  color: #fafafa;
  font-size: 16px;
  border: none;
  border-radius: 8px;

  &:focus {
    outline-offset: 4px;
    outline: 2px solid #9a11ff;
  }
`
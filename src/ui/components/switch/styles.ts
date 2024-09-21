import '@radix-ui/colors/black-alpha.css'
import * as switchComponent from '@radix-ui/react-switch'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const SwitchRoot = styled(switchComponent.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: var(--black-a9);
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--black-a7);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
  &[data-state='checked'] {
    background-color: #9a11ff;
  }
`

export const Thumb = styled(switchComponent.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--black-a7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(19px);
  }
`

export const Label = styled.label`
  color: #fafafa;
  font-size: 16px;
  font-weight: 700;
`
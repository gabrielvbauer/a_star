import { Container, Label, SwitchRoot, Thumb } from "./styles";
import { SwitchProps } from "@radix-ui/react-switch";

type Props = SwitchProps & {
  label: string
}

export function Switch({ label, ...rest}: Props) {
  return (
    <Container>
      <Label htmlFor="index-switch">{label}</Label>
      <SwitchRoot id="index-switch" {...rest}>
        <Thumb />
      </SwitchRoot>
    </Container>
  )
}
type DelayProps = {
  duration: number
}

export async function delay({ duration }: DelayProps) {
  await new Promise(resolve => setTimeout(resolve, duration))
}
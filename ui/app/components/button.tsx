import { Button } from "@chakra-ui/react"

export interface ButtonProps {
    text?: string
    onClick: () => void
}

export function DefaultButton(props: ButtonProps) {
    return <Button onClick={props.onClick}>{props.text}</Button>
}

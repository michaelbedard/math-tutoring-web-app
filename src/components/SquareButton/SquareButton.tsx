import "./SquareButton.css"

type SquareButtonProps = {
    onClick: () => void
    label: string
}

const SquareButton = ({onClick, label}: SquareButtonProps) => {
    return (
        <div onClick={onClick} className={"sqr-btn"}>
            {label}
        </div>
    )
}

export default SquareButton
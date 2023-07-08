import "./MissionButton.css"

type MissionButtonProps = {
    label:string
    onClick: () => void
}

const MissionButton = ({label, onClick}: MissionButtonProps) => {
    return (
        <div className={"MissionButton__btn"} onClick={onClick}>
            {label}
        </div>
    )
}

export default MissionButton
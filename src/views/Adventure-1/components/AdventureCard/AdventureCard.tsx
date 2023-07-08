import "./AdventureCard.css"

type AdventureCardProps = {
    image: string
    label: string
    onNoteClick: () => void
    onPlayClick: () => void
}

const AdventureCard = ({image, label, onNoteClick, onPlayClick}: AdventureCardProps) => {
    return (
        <div className={"adventure-card"}>
            <div>{image}</div>
            <div>{label}</div>
            <div>
                <a onClick={onNoteClick}>Note de cours</a>
            </div>
            <div>
                <a onClick={onPlayClick}>Jouer</a>
            </div>
        </div>
    )
}

export default AdventureCard
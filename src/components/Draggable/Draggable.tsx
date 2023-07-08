
type DraggableProps = {
    status: "OK" | "DANGER"
    handleOnDragStart: any
    handleDragEnd?: any;
    label: string;
}

const Draggable = ({status, handleOnDragStart, handleDragEnd, label} : DraggableProps) => {

    return (
        <span
            draggable
            onDragStart={handleOnDragStart}
            onDragEnd={handleDragEnd}
            style={{
                display: "inline-block",
                width: "auto",
                padding: "3px",
                margin: "3px",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: status === "OK" ? "green" : "red",
                fontSize: "0.8em",
                fontWeight: "bold",
            }}
            >
                {label}
        </span>
    )
}

export default Draggable
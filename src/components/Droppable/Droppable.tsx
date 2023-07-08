
type DroppableProps = {
    className: string,
    handleOnDrop: any,
    handleDragOver: any
    label: string;
}

const Droppable = ({className, handleOnDrop, handleDragOver, label} : DroppableProps) => {

    return (
        <span
            className={`${className}`}
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
            style={{
                display: "inline-block",
                width: "auto",
                padding: "3px",
                margin: "3px",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: "#ebebeb",
                fontSize: "0.8em",
                fontWeight: "bold",
            }}
        >
            {label}
        </span>
    )
}

export default Droppable
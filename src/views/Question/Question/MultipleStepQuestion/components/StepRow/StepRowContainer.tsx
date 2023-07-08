import React, {ReactNode} from "react";
import "./StepRowContainer.css"

type StepRowProps = {
    children: ReactNode
    label: string
    stepIndex: number
    handleDragStart: (e:React.DragEvent, index: number) => void
    handleOnDrop: (e:React.DragEvent, index: number) => void
    handleOnDragOver: (e: React.DragEvent) => void
}

const StepRowContainer = ({label, stepIndex, handleDragStart, handleOnDrop, handleOnDragOver, children}: StepRowProps) => {
    return (
        <div className={"step-row-container__background"}>
            <div className={"step-row-container__grid"}>
                <div
                    draggable
                    className={"step-row-container__grid-item label-drag-drop"}
                    onDragStart={(e:React.DragEvent) => handleDragStart(e, stepIndex)}
                    onDrop={(e: React.DragEvent) => handleOnDrop(e, stepIndex)}
                    onDragOver={handleOnDragOver}
                >
                    {label}
                </div>
                <div className={"step-row-container__grid-item step-content"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default StepRowContainer
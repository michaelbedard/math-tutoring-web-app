import {reduce} from "../../../utils/EquationStepRelated/reduce";

type MissionProps = {
    onClick: () => void
}

const Mission = ({onClick}: MissionProps) => {

    const response = reduce("2+5", "-3", true)
    console.log(response)

    return (
        <div className={"question-provider__start-btn"} onClick={onClick}>
            START
        </div>
    )
}

export default Mission
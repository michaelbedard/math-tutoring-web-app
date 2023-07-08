import {
    EquationStepType,
    GraphStepType,
    QuestionType,
    UnitsChangeStepType,
    VariableType
} from "../../helper/entities/QuestionRelated";
import "./QuestionProvider.css"
import {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Mission from "./Mission/Mission";
import QuestionText_Drag from "./QuestionText/QuestionTextDrag/QuestionText_Drag";
import QuestionContent_MultipleStep from "./Question/MultipleStepQuestion/QuestionContent_MultipleStep";

const QuestionProvider = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currMission, setCurrMission] = useState<number | null>(null)
    const [questionTextObj, setQuestionTextObj] = useState<{questionText: string, variables: VariableType[]}>({questionText: '', variables: []})
    const [image, setImage] = useState('')
    const [questionContentObj, setQuestionContentObj] = useState<(EquationStepType | GraphStepType | UnitsChangeStepType)[]>([])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //get question and set the questionText, image and questionContent
        //replace below
        setQuestionTextObj({
            questionText: tempQuestion.questionText,
            variables: tempQuestion.variables,
        })
        setImage(tempQuestion.image)
        setQuestionContentObj(tempQuestion.steps)
    }, [currMission])

    return (
        <div className={currMission === null ? "question-provider__background-mission" : "question-provider__background"}>
            <Header />
            {currMission === null ? (
                <Mission onClick={() => setCurrMission(1)}/>
            ) : (
                windowWidth > 500 ? (
                    <div className={"question-provider__big-grid"}>
                        <div className={"question-provider__big-grid-item"}>
                            <div style={{margin: "20px"}}>
                                <QuestionText_Drag questionTextObj={questionTextObj}/>
                            </div>
                            <div style={{padding: "20px"}}>
                                {true && <QuestionContent_MultipleStep
                                    questionContentObj={questionContentObj}
                                />}
                            </div>
                        </div>
                        <div>
                            {image}
                        </div>
                    </div>
                    ) : (
                    <div className={"question-provider__small-grid"}>
                        <div style={{padding: "20px"}} className={"question-provider__small-grid-item"}>
                            <QuestionText_Drag questionTextObj={questionTextObj}/>
                        </div>
                        <div>
                            {image}
                        </div>
                        <div style={{padding: "20px"}} className={"question-provider__small-grid-item"}>
                            {true && <QuestionContent_MultipleStep
                                questionContentObj={questionContentObj}
                            />}
                        </div>
                    </div>
                    )
            )}
        </div>
    )
}

export default QuestionProvider

const tempQuestion: QuestionType = {
    questionText: "there is [applesInTree] apples in the tree.  How many will be left if I eat [applesEat], then earn [bananaEarn] as much.",
    image: "image of apples",
    variables: [
        {name: "applesInTree", units: "apple", min: 3, max: 6, type: "INT"},
        {name: "applesEat", units: "apple", min: 1, max: 2, type: "INT"},
        {name: "bananaEarn", units: "banana", min: 0, max: 1, type: "DECIMAL"},
    ],
    steps: [
        {name: "get nb of apples after eat",
            id: 90,
            equation: {name: "subtraction", formula: "[a]-[b]=[c]", variables: [
                    {positionIndex: 0, units: {symbol: "Any"}, label: "a", similarIndex: [1, 2]},
                    {positionIndex: 1, units: {symbol: "Any"}, label: "b", similarIndex: [0, 2]},
                    {positionIndex: 2, units: {symbol: "Any"}, label: "c", similarIndex: [0, 1]}
                ]},
            useCase: "SOLVE",
            variablesUseByName: ["applesInTree", "applesEat"],
            variableCreatedByName:"VAR-1",
            type: "EQUATION"},
        {name: "get nb of apples after earn",
            id: 91,
            equation: {name: "multiplication", formula: "[a]*[b]=[c]", variables: [
                    {positionIndex: 0, units: {symbol: "none"}, label: "a", similarIndex: [1, 2]},
                    {positionIndex: 1, units: {symbol: "none"}, label: "b", similarIndex: [0, 2]},
                    {positionIndex: 2, units: {symbol: "none"}, label: "c", similarIndex: [0, 1]}
                ]},
            useCase: "SOLVE",
            variablesUseByName: ["VAR-1", "applesEat"],
            variableCreatedByName:"VAR-2",
            type: "EQUATION"},
        {name: "change units",
            id: 92,
            variablesUseByName: ["VAR-2"],
            variableCreatedByName:"VAR-3",
            type: "UNITS_CHANGE"}
    ]
}
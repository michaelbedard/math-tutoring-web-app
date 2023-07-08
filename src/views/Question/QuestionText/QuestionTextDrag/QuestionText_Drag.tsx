import {VariableType} from "../../../../helper/entities/QuestionRelated";
import {useEffect, useState} from "react";
import {DefVariableType} from "../../../../helper/entities/AnswerRelated";

type QuestionTextDragProps = {
    questionTextObj: {questionText:string, variables: VariableType[]}
}

const QuestionText_Drag = ({questionTextObj}: QuestionTextDragProps) => {
    const [defVariables, setDefVariables] = useState<DefVariableType[]>([]);

    console.log(questionTextObj)

    useEffect(() => {
        setDefVariables(() => {
            // if (questionTextObj === undefined) return [];

            return questionTextObj.variables.map((variable) => {
                let value = 0;
                if (variable.type === "INT") {
                    value = Math.random() * (variable.max - variable.min + 1) + variable.min;
                    value = Math.floor(value);
                } else if (variable.type === "DECIMAL") {
                    value = Math.random() * (variable.max - variable.min) + variable.min;
                    value = Math.floor(value * 10) / 10;
                }
                return {value: value, units: {symbol: variable.units}, status: "Ok"}
            });
        });
    }, [questionTextObj]);

    function handleOnDragStart (e: React.DragEvent, currDefVariable: DefVariableType) {
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.setData("application/json", JSON.stringify(currDefVariable));
    }

    const questionParts = questionTextObj.questionText.split(/\[([^\]]+)]/)

    return (
        <div>
            <div>
                {questionParts.map((part, index) => {
                    const isPlaceholder = index % 2 === 1;
                    const placeholderIndex = Math.floor(index / 2);
                    if (isPlaceholder && placeholderIndex < defVariables.length) {
                        const currDefVariable = defVariables[placeholderIndex];
                        return (
                            <span key={index}>
                              <span
                                  draggable
                                  onDragStart={(e) => handleOnDragStart(e, currDefVariable)}
                                  className={"variable-drag"}
                                  style={{
                                      display: "inline-block",
                                      width: "auto",
                                      padding: "2px",
                                      margin: "2px",
                                      border: "1px solid black",
                                      borderRadius: "4px",
                                      backgroundColor: "#ebebeb",
                                      fontSize: "0.8em",
                                      fontWeight: "bold",
                                  }}
                              >
                                {currDefVariable.value.toString()} {currDefVariable.units.symbol}
                              </span>
                            </span>
                        );
                    } else {
                        return <span key={index}>{part}</span>;
                    }
                })}
            </div>
        </div>
    );
}

export default QuestionText_Drag
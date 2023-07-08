import {useContext, useEffect, useState} from "react";
import {AnsEquationStepType, DefVariableType} from "../../../../../../helper/entities/AnswerRelated";
import SearchBar from "../../../../../../components/SearchBar/SearchBar";
import {EquationType} from "../../../../../../helper/entities/QuestionRelated";

const equations: EquationType[] = [
    { name: "subtraction", formula: "[a]-[b]=[c]", variables: [
            {positionIndex: 0, units: {symbol: "Apple"}, label: "a", similarIndex: []},
            {positionIndex: 1, units: {symbol: "Banana"}, label: "b", similarIndex: []},
            {positionIndex: 2, units: {symbol: "Any"}, label: "c", similarIndex: [0]}
        ]},
    { name: "addition", formula: "[a]+[b]=[c]", variables: [
            {positionIndex: 0, units: {symbol: "Any"}, label: "a", similarIndex: [1, 2]},
            {positionIndex: 1, units: {symbol: "Any"}, label: "b", similarIndex: [0, 2]},
            {positionIndex: 2, units: {symbol: "Any"}, label: "c", similarIndex: [0, 1]}
        ]},
    { name: "otherFormula", formula: "[a]*([b]+[c]^2)=[d]", variables: [
            {positionIndex: 0, units: {symbol: "Any"}, label: "a", similarIndex: [1, 2]},
            {positionIndex: 1, units: {symbol: "Any"}, label: "b", similarIndex: [0, 2]},
            {positionIndex: 2, units: {symbol: "Any"}, label: "c", similarIndex: [0, 1]},
            {positionIndex: 2, units: {symbol: "Any"}, label: "d", similarIndex: [0, 1]}
        ]},
];


type UntouchedStateProps = {
    setEquationUsed: (value: EquationType) => void;
    setVariablesUsed: (value: (DefVariableType | null)[]) => void;
}
const UntouchedComponent = ({setEquationUsed, setVariablesUsed} : UntouchedStateProps) => {

    function handleEquationClick(equation: EquationType) {
        setEquationUsed(equation)
        setVariablesUsed(Array(equation.variables.length).fill(null))
    }

    return (
        <SearchBar
            items={equations}
            displayField1={"name"}
            displayField2={"formula"}
            onItemClick={(item) => handleEquationClick(item)}
        />
    )
}

export default UntouchedComponent
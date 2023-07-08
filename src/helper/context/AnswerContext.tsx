import React, { createContext } from "react";
import { AnsEquationStepType, AnsGraphStepType } from "../entities/AnswerRelated";

const AnswerContext = createContext<(AnsEquationStepType | AnsGraphStepType)[]>([]);

export default AnswerContext
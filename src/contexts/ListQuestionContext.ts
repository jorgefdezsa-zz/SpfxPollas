import * as React from 'react';
import { createContext } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';


interface Actions {
    type: string;
    value: any;
}

type InitialStateType = {
    questions: Question[];
    selectedQuestion: Question;
    number: number;
    loading: boolean;
    userAnswers: Answer[];
    score: number;
    gameOver: boolean;
    answers: string[];
};

interface InitContextProps {
    spContext: WebPartContext;
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}

const ListQuestionContext = createContext<InitContextProps>(undefined);

export default ListQuestionContext;



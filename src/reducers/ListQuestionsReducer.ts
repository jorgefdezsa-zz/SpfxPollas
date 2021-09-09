import { Answer } from "../models/Answer";
import { Question } from "../models/Question";

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

export const ListQuestionsReducer = (state: InitialStateType, action: any) => {
    
    switch (action.type) {
        case "GET_ALLITEMS":

            return {
                ...state,
                questions: action.payload
            };
        case "SET_LOADING":

            return {
                ...state,
                loading: action.payload
            };
            case "SET_USER_ANSWERS":

                return {
                    ...state,
                    userAnswers: action.payload
                };

                case "SET_NUMBER":

                    return {
                        ...state,
                        number: action.payload
                    };
            case "SET_GAMEOVER":

                return {
                    ...state,
                    gameOver: action.payload
                };
            
        case "SET_SELECTEDITEM":
            
            return {
                ...state,
                selectedQuestion: action.payload
            };

        case "SET_RESPONSEOK":
            
            return {
                ...state,
                selectedQuestion: action.payload
            };

            case "SET_SCORE":
            
                return {
                    ...state,
                    score: action.payload
                };
        default:
            return state;
    }

};
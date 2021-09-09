import * as React from 'react';
import { useState, useContext, useReducer, useEffect } from 'react';
import ListQuestionContext from '../../../../contexts/ListQuestionContext';
import { Answer } from '../../../../models/Answer';
import styles from './ListQuestions.module.scss';

const TOTAL_QUESTIONS = 10;

export interface IListQuestionsProps {
}

const ListQuestions: React.FC<IListQuestionsProps> = (props) => {

    const { state, dispatch } = useContext(ListQuestionContext);

    const onClickAnswer = (selectedAnswer: any) => {
        if (selectedAnswer != null) {
            if (state.questions.length > 0)
            {
                const respuesta = {} as Answer;
                let question = state.questions[state.number];

                respuesta.question = question.question;
                respuesta.answer = selectedAnswer;
                respuesta.correct = false;
                respuesta.correctAnswer = state.questions[state.number].correct_answer;
              
                if (respuesta.correctAnswer == selectedAnswer)
                {
                    respuesta.correct = true;
                }
                dispatch({
                        type: "SET_USER_ANSWERS",
                        payload: respuesta
                });
                dispatch({
                    type: "SET_NUMBER",
                    payload: state.number + 1
            });
            }
        }
    };


    return(
        <div className={styles.wrapper}>
            <p>
                Question: {state.number + 1} / {TOTAL_QUESTIONS}
            </p>
            {state.questions.length > 0 ? <p dangerouslySetInnerHTML={{ __html: state.questions[state.number].question}} /> : null}
            <div>
                {state.questions.length > 0 && state.questions[state.number].answers.map((answer) => (
                    <div className={styles.buttonWrapper}>
                        <button value={answer} onClick={() => onClickAnswer(answer)}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>   
        </div>
    );
};
  
  export default ListQuestions;
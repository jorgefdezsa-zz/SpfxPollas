import * as React from 'react';
import { useState, useReducer, useEffect, useMemo } from 'react';
import styles from './Quiz.module.scss';
import { IQuizProps } from './IQuizProps';
import { ListQuestionsReducer } from '../../../reducers/ListQuestionsReducer';
import { Difficulty, fetchQuizQuestions } from '../../../api/Api';
import ListQuestionContext from '../../../contexts/ListQuestionContext'; 
import ListQuestions from './ListQuestions/ListQuestions';

const TOTAL_QUESTIONS = 10;

const Quiz: React.FC<IQuizProps> = (props) => {

    const spContext = props.spContext;

    const initialState = {
      questions: [],
      selectedQuestion: {},
      number: 1,
      loading: false,
      userAnswers: [],
      score: 0,
      gameOver: true,
      answers: []
    };

    const [state, dispatch] = useReducer(ListQuestionsReducer, initialState);

    const startTrivia = async () => {

      dispatch({
        type: "SET_LOADING",
        payload: true
      });

      dispatch({
        type: "SET_GAMEOVER",
        payload: false
      });

      getAllItems();

      dispatch({
        type: "SET_SCORE",
        payload: 0
      });

      dispatch({
        type: "SET_USER_ANSWERS",
        payload: []
      });

      dispatch({
        type: "SET_NUMBER",
        payload: 0
      });

      dispatch({
        type: "SET_LOADING",
        payload: false
      });
    };

    const nextQuestion = () => {
      // Move on to the next question if not the last question
      const nextQ = contextValue.state.number + 1;
  
      // if (nextQ === TOTAL_QUESTIONS) {
      //   setGameOver(true);
      // } else {
      //   setNumber(nextQ);
      // }
    };

    const getAllItems = async () => {
      const items = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      console.log(items);
      dispatch({
        type: "GET_ALLITEMS",
        payload: items
      });
    };
  
    // useEffect(() => {
    //   getAllItems();
    // }, []);

    const contextValue = useMemo(() => {
      return { spContext, state, dispatch };
    }, [spContext, state, dispatch]);
  
    return (
      <ListQuestionContext.Provider value={contextValue}>
          <div className={styles.wrapper}>
          <h1>REACT QUIZ</h1>
          {contextValue.state.gameOver || contextValue.state.userAnswers.length === TOTAL_QUESTIONS ? (
            <button className={styles.start} onClick={startTrivia}>
              Start
            </button>
          ) : null}
          {!contextValue.state.gameOver ? <p className={styles.score}>Score: {contextValue.state.score}</p> : null}
          {contextValue.state.loading ? <p>Loading Questions...</p> : null}
          {!contextValue.state.loading && !contextValue.state.gameOver &&(<ListQuestions />)}
          {!contextValue.state.gameOver && !contextValue.state.loading && contextValue.state.userAnswers.length === contextValue.state.number + 1 
            && contextValue.state.number !== TOTAL_QUESTIONS - 1 ? (
            <button className={styles.next} onClick={nextQuestion}>
              Next Question
            </button>
            ) : null}
          </div>
        </ListQuestionContext.Provider>
      );
};

export default Quiz;
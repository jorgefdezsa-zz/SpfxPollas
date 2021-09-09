import * as React from 'react';
import { useState, useReducer, useEffect, useMemo } from 'react';
import styles from './Pollas.module.scss';
import { IPollasProps } from './IPollasProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListQuestionsReducer } from '../../../reducers/ListQuestionsReducer';
import { Difficulty, fetchQuizQuestions } from '../../../api/Api';
import ListQuestionContext from '../../../contexts/ListQuestionContext'; 
import ListPollas from './ListPollas/ListPollas';

const TOTAL_QUESTIONS = 10;

const Pollas: React.FC<IPollasProps> = (props) => {

  const spContext = props.spContext;

  const initialState = {
    questions: [],
    selectedQuestion: {},
    number: 0,
    loading: true,
    userAnswers: [],
    score: 0,
    gameOver: false,
    answers: []
  };

  const [state, dispatch] = useReducer(ListQuestionsReducer, initialState);

  const getAllItems = async () => {
    const items = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    dispatch({
      type: "GET_ALLITEMS",
      payload: items
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const contextValue = useMemo(() => {
    return { spContext, state, dispatch };
  }, [spContext, state, dispatch]);

  console.log(state);

    return (
      <ListQuestionContext.Provider value={contextValue}>
          <ListPollas />
      </ListQuestionContext.Provider>
    );
}

export default Pollas;

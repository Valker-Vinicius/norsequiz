/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <div>
      <QuizLogo />
      <Widget>
        <Widget.Header>
          <h3>
            {`Question ${questionIndex + 1} of ${totalQuestions}`}
          </h3>
        </Widget.Header>

        <img
          alt="Description"
          style={{
			    width: '100%',
			    height: 150,
            objectFit: 'cover',
			  }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>

          <form
            onSubmit={(event) => {
			  event.preventDefault();
			  onSubmit();
		  }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
			  const alternativeId = `alternative__${alternativeIndex}`;
			  return (
  <Widget.Topic
    as="label"
    htmlFor={alternativeId}
  >
    <input
      style={{ display: 'none' }}
      id={alternativeId}
      name={questionId}
      type="radio"
    />
    {alternative}
  </Widget.Topic>
			  );
            })}

            {/* <pre>
				{JSON.stringify(question, null, 4)}
			</pre> */}

            <Button type="submit">
              Confirm
            </Button>
          </form>
        </Widget.Content>
      </Widget>
    </div>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>

      <Widget.Content>
        Challenge
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = db.questions[questionIndex];

  React.useEffect(() => {
	  setTimeout(() => {
      setScreenState(screenStates.QUIZ);
	  }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          onSubmit={handleSubmitQuiz}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>You chose X right options</div>}
      </QuizContainer>
    </QuizBackground>
  );
}

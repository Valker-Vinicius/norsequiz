/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import AlternativesForm from '../../src/components/AlternativesForm';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import QuizLogo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import loadingAnimationData from '../../src/screens/animations/7774-loading.json';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Results screen:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          questões
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              Resultado #0
              {index + 1}
              :
              {' '}
              {result === true ? 'Right' : 'Wrong'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <div>
      <QuizLogo />
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
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

          <AlternativesForm
            onSubmit={(event) => {
			  event.preventDefault();
			  setIsQuestionSubmitted(true);
			  setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmitted(false);
                setSelectedAlternative(undefined);
			  }, 2 * 1000);
		  }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
			  const alternativeId = `alternative__${alternativeIndex}`;
			  const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
			  const isSelected = selectedAlternative === alternativeIndex;
			   return (
  <Widget.Topic
    as="label"
    key={alternativeId}
    htmlFor={alternativeId}
    data-selected={isSelected}
    data-status={isQuestionSubmitted && alternativeStatus}
  >
    <input
      style={{ display: 'none' }}
      id={alternativeId}
      name={questionId}
      onChange={() => setSelectedAlternative(alternativeIndex)}
      type="radio"
    />
    {alternative}
  </Widget.Topic>
			  );
            })}

            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
            {isQuestionSubmitted && isCorrect && <p>you are right</p>}
            {isQuestionSubmitted && !isCorrect && <p>you missed</p>}
          </AlternativesForm>
        </Widget.Content>
      </Widget>
    </div>
  );
}

function LoadingWidget() {
  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <Lottie
          options={loadingAnimationOptions}
          width={200}
          height={200}
        />
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
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = db.questions[questionIndex];

  function addResult(result) {
	  setResults([
      ...results,
      result,
	  ]);
  }

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
          addResult={addResult}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}

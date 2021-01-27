import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <>
      <Head>
        <title>Norse Quiz</title>
        <link rel="shortcut icon" href="https://image.flaticon.com/icons/png/512/1377/1377698.png" />
        <meta property="og:title" content="Norse Quiz" />
        <meta property="og:image" content={db.metaImg} />
        <meta property="og:description" content="Come make sure that you are ready for the Valhalla!" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>Norse Mythology Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Make sure that you are ready for the Valhalla!
              </p>
              <form onSubmit={function (event) {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <input
                  onChange={function (event) {
                    setName(event.target.value);
                  }}
                  placeholder="Tell me your name"
                  required
                />
                <button type="submit" disabled={name.length === 0}>
                  Are you ready
                  {' '}
                  {name}
                  ?
                </button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>

              <h1>Other awesome quizzes!</h1>
              <p>
                loren ipsum dolor
              </p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/valker-vinicius/norsequiz" />
      </QuizBackground>
    </>
  );
}

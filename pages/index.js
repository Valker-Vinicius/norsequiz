import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Norse Quiz</title>
        <link rel="shortcut icon" href="https://image.flaticon.com/icons/png/512/1377/1377698.png" />
        <meta property="og:title" content="Norse Quiz" />
        <meta property="og:image" content={db.metaImg} />
        <meta property="og:description" content="Come make sure that you are ready for the Valhalla!" />
      </Head>
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
            <Form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="user name"
                onChange={(event) => { setName(event.target.value); }}
                placeholder="Tell me your name"
                value={name}
                required
              />
              <Button type="submit" disabled={name.length === 0}>
                Play
              </Button>
            </Form>
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
  );
}

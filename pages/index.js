import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
import Link from '../src/components/Link';

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
        <title>Quiz nórdico</title>
        <link rel="shortcut icon" href="https://image.flaticon.com/icons/png/512/1377/1377698.png" />
        <meta property="og:title" content="Quiz Nórdico" />
        <meta property="og:image" content={db.metaImg} />
        <meta property="og:description" content="Venha ver se você está pronto para o Valhalla!" />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
		    show: { opacity: 1, y: '0' },
		    hidden: { opacity: 0, y: '100%' },
		  }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz de mitologia nórdica</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Vejamos se você está pronto para o Valhalla
            </p>
            <Form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="user name"
                onChange={(event) => { setName(event.target.value); }}
                placeholder="Me diga seu nome"
                value={name}
                autoComplete="off"
                required
              />
              <Button type="submit" disabled={name.length === 0}>
                Serei o einhiejar
                {' '}
                {name}
              </Button>
            </Form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
		    show: { opacity: 1 },
		    hidden: { opacity: 0 },
		  }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Outros quizzes desafiadores</h1>
            <ul>
              {db.external.map((externalLink) => {
                const [projectName, githubUser] = externalLink
                  .split('//')[1]
                  .split('.', 2);
                return (
                  <li key={externalLink}>
                    <Widget.Topic
                      as={Link}
                      href={`${name.length === 0 ? '/' : `/quiz/${projectName}___${githubUser}`}?name=${name}`}
                      disabled={name.length === 0}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
			  })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/valker-vinicius/norsequiz" />
    </QuizBackground>
  );
}

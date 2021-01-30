import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function AwesomeQuizzesPage({ externDb }) {
  return (
    <ThemeProvider theme={externDb.theme}>
      <QuizScreen
        externalQuestions={externDb.questions}
        externalBg={externDb.bg}
      />
    </ThemeProvider>
  // {/*<pre style={{ color: 'black' }}>
  // { JSON.stringify(externDb.questions, null, 4) }
  // </pre>*/}
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
	  const externDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
		   if (serverResponse.ok) {
			   return serverResponse.json();
		   }

		   throw new Error('Failure to get data');
      })
      .then((responseConvertedToObject) => responseConvertedToObject);

	  // console.log('Infos that Next give us', context.query.id);
	  // console.log('db externo', externDb);

	  return {
      props: {
		  externDb,
      },
	  };
  } catch (err) {
    throw new Error(err);
  }
}

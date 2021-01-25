import styled from 'styled-components'
import db from '../db.json'
import Head from 'next/head'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

/*
const BackGroundImage = styled.div`
	background-image: url(${db.bg});
	flex: 1;
	background-size: cover;
	background-position: center;
`
*/

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
	return (
		<div>
			<Head>
				<meta property="og:image" content={db.bg}/>
				<meta property="og:image:type" content="image/jpg"/>
			</Head>

			<QuizBackground backgroundImage={db.bg}>
				<QuizContainer>
					<Widget>
						<Widget.Header>
							<h1>Norse Mythology Quiz</h1>
						</Widget.Header>
						<Widget.Content>
							<p>
								loren ipsum dolor
						</p>
						</Widget.Content>
					</Widget>
					<Widget>
						<Widget.Content>

							<h1>Quizzes da galera</h1>
							<p>
								loren ipsum dolor
						</p>
						</Widget.Content>
					</Widget>
					<Footer />
				</QuizContainer>
				<GitHubCorner projectUrl="https://github.com/valker-vinicius/norsequiz" />
			</QuizBackground>
		</div>
	)
}

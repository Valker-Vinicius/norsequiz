import styled from 'styled-components';
import Widget from '../Widget';

const StyledWidgetTopic = styled(Widget.Topic)`
  background-color: ${({ theme, isAnswerCorrect }) => (isAnswerCorrect ? theme.colors.success : theme.colors.wrong)};
  opacity: 2;
`;

export default function PopUp({
  isAnswerCorrect, correctAnswer, children, ...props
}) {
  return (
    <StyledWidgetTopic isAnswerCorrect={isAnswerCorrect} {...props}>
      {children}
      {isAnswerCorrect
	    ? 'Está certo!'
	    : `Errado! A resposta certa era a ${correctAnswer}`}
    </StyledWidgetTopic>
  );
}

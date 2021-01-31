import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  border-style: solid;
  color: white;
  background-color: #2196f3;
  border-color: #155fa0;
  border-radius: 4px;
  padding: 9px 4px;
  margin-top: 8px;
  cursor: pointer;
  transition: 300ms;

  &:hover {
	  background-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
	border-color: #979797;
    background-color: #979797;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;

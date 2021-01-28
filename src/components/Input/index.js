/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 7px 4px;
  background-color: ${({ theme }) => theme.colors.fieldBg};
  color: snow;
  border-color: #424242;
  border-style: solid;
`;

export default function Input({
  onChange, placeholder, required, ...props
}) {
  return (
    <div>
      <InputBase
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

const ButtonContainer = styled(Box)`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#ccc' : props.bgColor)};

  font-size: ${(props) => (props.small ? `12px` : `15px`)};
  font-family: 'Nanum Gothic', sans-serif;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: 0;
  padding: ${(props) => (props.small ? `5px 16px` : `10px 30px`)};

  user-select: none;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#aaa' : props.hoverBackgroundColor)};
  }
`;

const Button = ({
  text,
  onClick,
  disabled = false,
  backgroundColor = 'white',
  hoverBackgroundColor = backgroundColor,
  small = false,
  ...props
}) => {
  const onButtonClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer
      {...props}
      bgColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      onClick={onButtonClick}
      disabled={disabled}
      small={small}
    >
      {text}
    </ButtonContainer>
  );
};

Button.propTypes = {
  text: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  small: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  backgroundColor: 'white',
  hoverBackgroundColor: 'white',
  small: false,
};

export default Button;

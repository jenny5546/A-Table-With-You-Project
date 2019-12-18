import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';

const ButtonContainer = styled(Box)`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.disabled ? '#ccc' : props.bgColor)};

  font-size: ${(props) => (props.small ? `12px` : `15px`)};
  font-family: NotoSansCJKkr;

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
  loading = false,
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

export default Button;

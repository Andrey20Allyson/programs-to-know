import React from 'react';
import styled from 'styled-components';

export interface FormButtonProps {
  title: string;
  onClick?: () => void;
}

export function FormButton(props: FormButtonProps) {
  const { title, onClick } = props;

  return (
    <StyledFormButton onClick={onClick}>
      {title}
    </StyledFormButton>
  );
}

export const StyledFormButton = styled.button`
  box-shadow: -.1rem .1rem .2rem #0005;
  border: 1px solid #fff5;
  background-color: #0000;
  border-radius: 1rem;
  padding: .5rem 1rem;
  outline: none;
  transition: all 500ms;
  cursor: pointer;

  &:hover {
    background-color: #fff2;
  }

  &:active {
    transform: scale(.95);
    box-shadow: none;
  }
`;
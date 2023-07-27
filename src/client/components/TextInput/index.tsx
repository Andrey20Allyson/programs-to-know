import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

type InputType<T extends React.HTMLInputTypeAttribute> = T;

export interface TextInputProps {
  title: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  type?: Extract<React.HTMLInputTypeAttribute, InputType<'text' | 'email' | 'password' | 'number'>>;
}

export function TextInput(props: TextInputProps) {
  const [text, setText] = useState('');
  const { title, onChange, onBlur, type = 'text' } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const newText = ev.currentTarget.value;

    onChange?.(newText);

    setText(newText);
  }

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <StyledTextInput onClick={handleClick} className={text.length > 0 ? 'not-empity' : ''}>
      <label>{title}</label>
      <input onChange={handleChange} ref={inputRef} onBlur={onBlur} type={type} />
    </StyledTextInput>
  );
}

export const TextInputCSS = css`
  box-shadow: -.1rem .1rem .2rem #0003 inset;
  background-color: #0000;
  border: 1px solid #fff4;
  border-radius: 1rem;
  outline: none;
  padding: .5rem;
`; 

export const StyledTextInput = styled.span`
  position: relative;
  display: flex;
  
  &>label {
    position: absolute;
    font-size: .8rem;
    left: .5rem;
    cursor: text;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 500ms;
    user-select: none;
  }

  &.not-empity,
  &:focus-within {
    &>label {
      top: 0;
      transform: scale(.8) translate(0, -50%);
    }
  }

  &>input {
    ${TextInputCSS}
    flex: 1;
  }
`;
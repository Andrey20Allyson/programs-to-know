import React, { useState } from 'react';
import styled from 'styled-components';
import { TextInputCSS } from '../TextInput';

export interface TextAreaInputProps {
  title: string;
  rows?: number;
  charLimit?: number;
  onChange?: (text: string) => void;
}

export function TextAreaInput(props: TextAreaInputProps) {
  const { title, rows = 4, charLimit = 80, onChange } = props;

  const [text, setText] = useState('');

  const charRemaining = charLimit - text.length;

  function handleChangeText(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = ev.currentTarget.value;

    if (charLimit - newText.length >= 0) {
      onChange?.(newText);
      
      setText(newText);
    }
  }

  return (
    <StyledTextAreaInput>
      <label>{title}</label>
      <textarea value={text} onChange={handleChangeText} rows={rows}/>
      <span className={`chars-left-display${charRemaining / charLimit <= .1 ? ' low-char-remaining' : ''}`}>{charRemaining}/{charLimit}</span>
    </StyledTextAreaInput>
  );
}

export const StyledTextAreaInput = styled.span`
  display: flex;
  position: relative;

  &>label {
    position: absolute;
    transform: scale(.8) translate(0, -50%);
    top: 0;
    user-select: none;
    left: .5rem;
  }

  &>textarea {
    ${TextInputCSS}
    flex: 1;
    resize: none;
  }

  &>.chars-left-display {
    position: absolute;
    right: .5rem;
    bottom: 0;
    transform: scale(.8) translate(0, 50%);
    transition: all 500ms;
    user-select: none;

    &.low-char-remaining {
      color: #ffa7a7;
    }
  }
`;
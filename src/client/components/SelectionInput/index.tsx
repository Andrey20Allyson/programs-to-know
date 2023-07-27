import React, { useState } from 'react';
import styled from 'styled-components';

export interface SelectionInputProps<U extends string, TOptions extends Readonly<[U, ...U[]]>> {
  title: string;
  options: TOptions;
  onChange?: (option: TOptions[number] | undefined) => void;
}

export function SelectionInput<U extends string, TOptions extends Readonly<[U, ...U[]]>>(props: SelectionInputProps<U, TOptions>) {
  const { options, onChange, title } = props;

  const [selected, setSelected] = useState<TOptions[number]>();

  function handleSelection(option: TOptions[number]) {
    if (option === selected) {
      onChange?.(undefined);
      return setSelected(undefined);
    }

    onChange?.(option);
    setSelected(option);
  }

  const optionElements = options.map(value => (
    <span onClick={() => handleSelection(value)} className={`option${selected === value ? ' selected' : ''}`}>
      {value}
    </span>
  ));

  return (
    <StyledSelectionInput>
      {title}
      <section className='option-container'>
        {optionElements}
      </section>
    </StyledSelectionInput>
  );
}

export const StyledSelectionInput = styled.span`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  text-align: center;
  gap: .5rem;

  &>.option-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: .5rem;

    &>.option {
      flex: 1;
      max-width: 30%;
      user-select: none;
      cursor: pointer;
      padding: .5rem;
      border-radius: 1rem;
      border: 1px solid #fff4;
      transition: all 300ms;
      text-align: center;
      box-shadow: -.1rem .1rem .2rem #0004;

      &.selected {
        background-color: #fff2;
        font-weight: bold;
        transform: scale(.95);
        box-shadow: none;
      }
    }  
  }
`;
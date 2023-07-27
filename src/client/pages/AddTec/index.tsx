import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { BackgroundCSS, ContainerCSS } from "../Home";
import { Link } from "react-router-dom";
import { TextInput } from "../../components/TextInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { SelectionInput } from "../../components/SelectionInput";

export interface AddTecProps { }

export default function AddTec(props: AddTecProps) {
  return (
    <StyledAddTec>
      <section className='head'>
        <h1>Preencha os campos</h1>
        <div>
          <Link to='/'>Home</Link>
        </div>
      </section>
      <section className='form'>
        <span>
          <TextInput title="Nome" />
          <TextInput title="URL Do Download" />
          <TextInput title="URL Da Imagem" />
          <SelectionInput title='Arquitetura' options={['x64', 'x86']} />
        </span>
        <span>
          <TextAreaInput title="Descrição" rows={12} charLimit={256} />
          <TextAreaInput title="Dependencias" rows={12} charLimit={256} />
        </span>
      </section>
    </StyledAddTec>
  );
}

export const StyledAddTec = styled.div`
  ${BackgroundCSS}

  &>* {
    ${ContainerCSS}
  }

  &>.head {
    width: 70%;
  }

  &>.form {
    display: grid;
    width: 70%;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    &>span {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
  }
`;
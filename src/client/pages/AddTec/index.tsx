import React, { useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import { BackgroundCSS, ContainerCSS, tecStorageAPI } from "../Home";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../components/TextInput";
import { TextAreaInput } from "../../components/TextAreaInput";
import { SelectionInput } from "../../components/SelectionInput";
import { FormButton } from "../../components/FormButton";
import { TecDatabasePostDTO } from "../../../server/routes/api/storage/tecs/schemas";
import { Dots } from 'react-activity';

export interface AddTecProps { }

export interface AddTecFormState {
  architecture?: 'x64' | 'x86';
  description?: string;
  dependences?: string;
  downloadUrl?: string;
  imageUrl?: string;
  name?: string;
}

const formArchToDTOArchMap: Record<NonNullable<AddTecFormState['architecture']>, TecDatabasePostDTO['architecture']> = {
  x64: '64',
  x86: '86',
}

export default function AddTec(props: AddTecProps) {
  const [formState, setFormState] = useState<AddTecFormState>({});
  const [adding, setAddign] = useState(false);

  async function handleSubmit() {
    const { architecture, dependences, description, downloadUrl, imageUrl, name } = formState;

    if (!name || adding) return;

    setAddign(true);

    try {
      const resp = await tecStorageAPI.add({
        title: name,
        dependences: dependences ? dependences.split(/\n|;/g).filter(s => s.length > 0) : [],
        architecture: architecture ? formArchToDTOArchMap[architecture] : undefined,
        description,
        downloadUrl,
        imageUrl,
      });

      if (resp.ok) {
        alert(`Tecnologia adicionada com sucesso, id='${resp.data.id}'`);
        location.reload();
      } else {
        alert(`Erro: ${resp.error}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAddign(false);
    }
  }

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
          <TextInput
            title="Nome"
            onChange={name => setFormState({ ...formState, name })} />
          <TextInput
            title="URL Do Download"
            onChange={downloadUrl => setFormState({ ...formState, downloadUrl })} />
          <TextInput
            title="URL Da Imagem"
            onChange={imageUrl => setFormState({ ...formState, imageUrl })} />
          <SelectionInput
            title='Arquitetura'
            options={['x64', 'x86']}
            onChange={architecture => setFormState({ ...formState, architecture })} />
          <span className='confirm-box'>
            <FormButton
              title='Adicionar'
              onClick={handleSubmit} />
          </span>
          <span className={`loading-box${adding ? '' : ' inative'}`}>
            <Dots />
          </span>
        </span>
        <span>
          <TextAreaInput
            title="Descrição"
            rows={12}
            charLimit={256}
            onChange={description => setFormState({ ...formState, description })} />
          <TextAreaInput
            title="Dependências"
            rows={8}
            charLimit={256}
            onChange={dependences => setFormState({ ...formState, dependences })} />
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
    
      &>.confirm-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      &>.loading-box {
        display: flex;
        justify-content: center;

        & * {
          color: #39f8ff;
        }

        &.inative {
          opacity: 0;
        }
      }
    }
  }
`;
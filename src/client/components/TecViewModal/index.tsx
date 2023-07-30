import React from 'react';
import { styled } from 'styled-components';
import { TecDTO } from '../../../server/routes/api/storage/tecs/schemas';
import { ModalHandler, createModalContext } from '../../contexts/modal';
import { ContainerCSS } from '../../pages/Home';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';

export interface ModalHeaderProps {
  handler: ModalHandler<any>;
  title: string;
}

function ModalHeader(props: ModalHeaderProps) {
  const { handler, title } = props;

  return (
    <StyledModalHeader>
      <button className='open-editor'>
        <AiOutlineEdit/>
      </button>
      <h1 className='title'>{title}</h1>
      <button className='close-button' onClick={() => handler.close()}>
        <AiOutlineClose />
      </button>
    </StyledModalHeader>
  );
}

const StyledModalHeader = styled.section`
  display: flex;
  border-bottom: 1px solid #fff5;
  padding-bottom: .5rem;

  &>.title {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    flex: 1;
    margin: 0;
    padding: 0;
  }

  &>button {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 200ms;
    outline: none;
    color: white;
    border: 1px solid #fff5;
  }

  &>.open-editor {
    background-color: #fff5;

    &:hover {
      background-color: #ffffff84;
    }
  }

  &>.close-button {
    background-color: #ff000073;
    border-color: #ff0000d3;

    &:hover {
      background-color: #ff0000ba;
    }
  }
`;

export interface TecViewModalProps {
  tec: TecDTO;
}

export const {
  Provider: TecViewModalProvider,
  useModal: useTecViewModal,
  Modal: TecViewModal,
} = createModalContext<TecViewModalProps>(function (props) {
  const { tec } = props;
  const handler = useTecViewModal();

  return (
    <StyledTecViewModal>
      <ModalHeader title={tec.title} handler={handler} />
      <div className='tec-image-box'>
        <img className='tec-image' src={tec.imageUrl} alt="" />
      </div>
      <p>{tec.description}</p>
      <p>Dependências: {tec.dependences.join(', ')}</p>
      <a href={tec.downloadUrl}>{tec.downloadUrl}</a>
    </StyledTecViewModal>
  );
});

export const StyledTecViewModal = styled.span`
  box-shadow: -.2rem .2rem .2rem #0005;
  background-color: #6e389b;
  border: 1px solid #fff5;
  box-sizing: border-box;
  border-radius: 1rem;
  padding: .5rem 2rem;
  width: 50%;
  height: 50%;

  &>.tec-image-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &>.tec-image {
      width: 5rem;
      height: 5rem;
      object-fit: contain;
      border-radius: .5rem;
    }
  }
`;
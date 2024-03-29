import React from "react";
import { styled } from "styled-components";
import type { TecDTO } from "../../../server/routes/api/storage/tecs/schemas";
import { AiOutlineDownload } from 'react-icons/ai';
import { useTecViewModal } from "../TecViewModal";

export interface TecCardProps {
  tec: TecDTO;
}

export function TecCard(props: TecCardProps) {
  const { tec } = props;
  const {
    architecture,
    dependences,
    downloadUrl,
    description,
    imageUrl,
    title,
    id,
  } = tec;
  
  const modal = useTecViewModal();
  
  function handleOpenModal() {
    modal.open({ tec })
  }

  return (
    <StyledTecCard onClick={handleOpenModal}>
      <img src={imageUrl} alt="" />
      <div className='body'>
        <span className='title-box'>
          <h2>{title}</h2>
          {architecture && <p>Arch: x{architecture}</p>}
        </span>
        <span className='info'>
          <p><strong>Descrição:</strong> {description ?? 'N/A'}</p>
          <p><strong>Dependências:</strong> {dependences.length > 0 ? dependences.join(',') : 'Nenhuma'}</p>
        </span>
        {downloadUrl && <span className='download-box'>
          <a href={downloadUrl}>
            <AiOutlineDownload size={20} />
          </a>
        </span>}
      </div>
    </StyledTecCard>
  );
}

export const StyledTecCard = styled.span`
  min-height: 5rem;
  width: 100%;
  border: 1px solid #fff5;
  box-sizing: border-box;
  border-radius: 1rem;
  display: flex;
  gap: .5rem;
  transition: all 500ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.005);
    background-color: #fff1;
    box-shadow: -.2rem .2rem .2rem #0005;
  }

  &,
  & * {
    color: #fff;
  }

  &>img {
    height: 5rem;
    width: 5rem;
    background-size: cover;
    object-fit: contain;
    background-color: #fff;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  &>.body {
    padding: .5rem;
    display: flex;
    gap: 1rem;
    flex: 1;

    &>.title-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 6rem;
      gap: 1rem;

      &>h2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
        font-size: 1rem;
        width: 5.5rem;
        margin: 0;
      }

      &>p {
        font-size: .8rem;
        margin: 0;
      }

      padding-right: .5rem;
      border-right: 1px solid #fff5;
    }

    &>.info {
      font-size: .8rem;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-right: 1rem;

      &>p {
        margin: .2rem 0;
        width: 100%;
        max-height: 2rem;
        text-overflow: ellipsis;
        text-indent: .6rem;
        overflow: hidden;
        text-align: justify;
      }
    }

    &>.download-box {
      &>a {
        transition: all 300ms;
        opacity: .6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
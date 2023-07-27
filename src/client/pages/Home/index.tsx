import React, { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import type { TecDTO } from "../../../server/routes/api/storage/tecs";
import { AiOutlineSearch } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import lodash from 'lodash'
import { Link } from 'react-router-dom';
import { TecCard } from "../../components/TecCard";

function sleep(ms: number) {
  return new Promise(res => setInterval(res, ms));
}

async function fakeAPI(): Promise<TecDTO[]> {
  await sleep(100);

  const resp: TecDTO[] = Array.from(lodash.range(0, 20), _ => {
    return {
      id: lodash.uniqueId('tec-'),
      architecture: '64',
      dependences: [],
      downloadUrl: 'https://nodejs.org/en',
      title: 'NodeJS',
      imageUrl: './imgs/nodejs.jpeg',
      description: 'Ambiente de execução javascript Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque ab optio minus asperiores, harum at ipsum aliquam odio, dignissimos facere eaque? Voluptatem assumenda ipsum id blanditiis debitis nihil ut nostrum.'
    };
  });

  return resp;
}

type ResponseState<T, E = unknown> = {
  status: 'loading';
} | {
  status: 'error';
  error: E;
} | {
  status: 'success';
  data: T;
}

function useTecs() {
  const [response, setResponse] = useState<ResponseState<TecDTO[]>>({ status: 'loading' });
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    async function requestTecs() {
      try {
        const resp = await fakeAPI();

        setResponse({ status: 'success', data: resp });
      } catch (e) {
        setResponse({ status: 'error', error: e });
      }
    }

    if (response.status !== 'loading') setResponse({ status: 'loading' });

    requestTecs();
  }, [searchString]);

  async function search(title: string) {
    setSearchString(title);
  }

  return { response, search, searchString }
}

export interface HomeProps { }

export default function Home(props: HomeProps) {
  const [searchString, setSearchString] = useState('');
  const { response, search } = useTecs();

  function handleSearchChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(ev.currentTarget.value);
  }

  function handleSearch() {
    search(searchString)
  }

  const tecElements = response.status === 'error' ? <p>{JSON.stringify(response.error)}</p> : response.status === 'success'
    ? Array.from(response.data, (tec, key) => <TecCard key={key} tec={tec} />)
    : Array.from(lodash.range(0, 10), key => <Skeleton key={key} width='100%' height='5rem' />);

  return (
    <StyledHome>
      <section className='head'>
        <section className='search-container'>
          <label>Buscar tecnologia</label>
          <span className='search-bar'>
            <input type="text" placeholder="buscar" onChange={handleSearchChange} onBlur={handleSearch} />
            <AiOutlineSearch />
          </span>
        </section>
        <nav>
          <Link to='add-tec'>Adicionar</Link>
        </nav>
      </section>
      <section className='tec-list'>
        <section className='scroll-box'>
          <section className='scrollable'>
            {tecElements}
          </section>
        </section>
      </section>
    </StyledHome>
  );
}

export const ContainerCSS = css`
  background-color: #6e389b;
  border: 1px solid #fff5;
  border-radius: 1rem;
  padding: .5rem 2rem;
  box-shadow: -.2rem .2rem .2rem #0005;
  box-sizing: border-box;

  @media screen and (max-width: 750px) {
    width: 100%;
    border-radius: 0;
    border: 0;
  }
`;

export const ScrollBoxCSS = css`
  position: relative;
  flex: 1;

  &>.scrollable {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0 .5rem;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b873f1;
      border: 1px solid #fff5;
      border-radius: 5px;
    }
  }
`;

export const BackgroundCSS = css`
  background-image: linear-gradient(45deg, #130a1b, #230a3a);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &,
  & * {
    color: #fff;
  }
`;

export const StyledHome = styled.div`
  ${BackgroundCSS}

  @media screen and (max-width: 750px) {
    gap: 0;

    &>.head {
      box-shadow: 0 .2rem .2rem #0005;
      z-index: 2;
    }
  }

  &>.head {
    width: 70%;
    ${ContainerCSS}
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  
    &>.search-container {
      align-items: center;
      gap: .9rem;
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
  
      &>.search-bar {
        display: flex;
        align-items: center;
        gap: .5rem;
        transition: all 200ms;
        position: relative;
        
        &,
        & * {
          font-size: 1.1rem;
        }

        &::after {
          content: " ";
          position: absolute;
          width: 0;
          height: 1px;
          left: 0;
          bottom: 0;
          background-color: #fff;
          transition: all 600ms;
        }

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          left: 0;
          bottom: 0;
          background-color: #00ebc4d5;
        }

        &:focus-within{
          &::after {
            width: 100%;
          }
        }
  
        &>input[type="text"] {
          outline: none;
          background-color: #0000;
          border: none;
        }
  
        &>svg {
          cursor: pointer;
        }
      }
    }

    &>nav {
      flex-direction: row-reverse;
      display: flex;
      align-items: end;
      flex: 1;

      &>a {
        color: #fff;
      }
    }
  }

  &>.tec-list {
    height: 70%;
    width: calc(70% - .5rem);
    ${ContainerCSS}
    display: flex;

    @media screen and (max-width: 750px) {
      flex: 1;
      height: auto;
    }
    
    &>.scroll-box {
      ${ScrollBoxCSS}
      
      &>.scrollable {
        display: flex;
        flex-direction: column;
        gap: .5rem;
      }
    }
  }
`;
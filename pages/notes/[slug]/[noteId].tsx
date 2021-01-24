import { useEffect } from 'react';
import Head from 'next/head'
import { getNote, getNotes } from '@utils/api';
import { getFormattedId, slugifyTitle } from '@utils/helpers';

import { NotionRenderer } from 'react-notion';
import styled from 'styled-components';

const Note = ({ note }): JSX.Element => {
  if(!note) return null;
  
  // useEffect(() => {
  //   console.log(window.matchMedia('(prefers-color-scheme: dark)'));
  // }, [])

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <NotionRenderer blockMap={note} />
      </Content>
    </div>
  )
}

const Content = styled.article`
  max-width: 90%;
  display: flex;
  margin: 100px auto 50px;

  @media (min-width: 1024px) {
    max-width: 80%;
  }

  .notion {
    max-width: 100%;
  }

  h1.notion-h1, 
  h2.notion-h2, 
  h3.notion-h3 {
    font-family: ${({ theme }) => theme.fonts.heading };
    color: ${({ theme }) => theme.colors.heading };
  }

  h1.notion-h1 {
    font-size: 50px;
    line-height: 60px;
    letter-spacing: -2px;
    text-align: center;
    
    @media (min-width: 1024px) {
      font-size: 80px;
      line-height: 90px;
    } 
  }

  p.notion-text {
    font-family: ${({ theme }) => theme.fonts.text };
    font-size: 18px;
    line-height: 38px;
    margin-bottom: 32px;
    letter-spacing: 0.25px;
    color: ${({ theme }) => theme.colors.text};

    @media (min-width: 1024px) {
      font-size: 20px;
    }
  }

  h2.notion-h2 {
    margin-bottom: 36px;
    padding-top: 35px;
    font-size: 38px;
  }

`;

export async function getStaticPaths() {
  const notes = await getNotes();
  const paths = notes.map(note => ({ params: { slug: slugifyTitle(note.title), noteId: getFormattedId(note.id) }}));
  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const { noteId } = params;
  const note = await getNote(noteId);
  return { props: { note }, revalidate: 1 }
}

export default Note;
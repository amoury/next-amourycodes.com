import { NextSeo } from 'next-seo';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { NotionRenderer } from 'react-notion';
import styled, { TTheme } from 'styled-components';
import { getNotesPage } from '@utils/api';
import ArticleList from '@components/ArticleList';

const NotesPage = (): JSX.Element => {
  const { data } = useQuery('notesPage', getNotesPage);
  const { notesPage, notes } = data;
  return (
    <>
      <NextSeo
        title="Notes | Amourycodes"
        description="Half-baked notes from my learnings and research as a software engineer"
      />
      <Content>
        <HeroSection>
          <NotionRenderer blockMap={notesPage} customBlockComponents={{
            collection_view: () => null
          }} />
        </HeroSection>

        <ArticleList articles={notes} type="notes" />
      </Content>
    </>
  )
}

const Content = styled.div`
  max-width: 1200px;
  padding: 0 10px;
  
  @media (min-width: 1200px) {
    margin: 0 auto;
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;

  h1.notion-h1 {
    font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.secondary};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    font-size: 40px;
  }
  
  p.notion-text {
    font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.text};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    font-size: 20px;
  }
`

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('notesPage', getNotesPage);
  return { props: { dehydratedState: dehydrate(queryClient) }}
}

export default NotesPage

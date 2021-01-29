import Head from 'next/head'
import styled, { TTheme } from 'styled-components';
import { getHomePage } from './api/home';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { formatUrl } from '@utils/helpers';

import Link from 'next/link';
import Intro from '@components/Intro';
import ArticleCard from '@components/ArticleCard';

const Home = (): JSX.Element => {
  const { data } = useQuery('home', getHomePage);
  if (!data) return null;
  const { guides, intro, notes } = data;
  return (
    <div>
      <Head>
        <title>Amoury | Full stack software engineer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Main>
        <HeroSection>
          <Intro intro={intro} />
        </HeroSection>
        <TeasersSection>
          <div>
            <TeaserTitle>Guides</TeaserTitle>
            <Guides>
              {Boolean(guides.length) && guides.map(guide => (
                  <Link key={guide.id} href={`/guides/${formatUrl(guide.title, guide.id)}`}>
                    <a>
                      <ArticleCard key={guide.id} article={guide} />
                    </a>
                  </Link>
                ))}
            </Guides>
          </div>


          <div>
            <TeaserTitle>Notes</TeaserTitle>
            <TeaserDescription>These are half-baked notes from my daily learnings and research.</TeaserDescription>
            <Notes>
              <NotesList>
                {Boolean(notes.length) && notes.map(note => (
                  <ListItem key={note.id}>
                    <Link href={`/notes/${formatUrl(note.title, note.id)}`}>
                      <a>
                        <h4>{note.title}</h4>
                      </a>
                    </Link> 
                  </ListItem>
                ))}
              </NotesList>
            </Notes>
          </div>
        </TeasersSection>
      </Main>
    </div>
  )
}

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  margin-bottom: 100px;
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  
  @media (min-width: 1024px) {
    max-height: 90vh;
    height: 90vh;
  }
`

const Guides = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: dense;
  grid-row-gap: 30px;
  justify-content: center;
  
  @media (min-width: 595px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
  }
`;

const TeaserDescription = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text}; 
  font-size: 22px;
`;

const Notes = styled.div`
  background-color: ${({ theme }) => theme.isDarkMode ? theme.colors.background : '#FFF' };
  padding: 20px 5px;
  border-radius: 10px;
  margin-top: 20px;
`;

const NotesList = styled.ol`
  list-style: none;
  counter-reset: my-counter;
  padding: 0 20px;
`;

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  counter-increment: my-counter;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  &::before {
    content: "0" counter(my-counter);
    font-weight: bold;
    font-size: 3rem;
    margin-right: 0.9rem;
    font-family: ${({ theme }) => theme.fonts.text};
    line-height: 1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }

  h4 {
    font-size: 19px;
  }
`;

const TeasersSection = styled.section`
  display: grid;
  grid-column-gap: 50px;
  
  @media (min-width: 800px) {
    grid-template-columns: 60% auto;    
  }
`;

const TeaserTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 25px;
  font-size: 40px;
  font-weight: normal;
  color: ${({ theme }: { theme: TTheme }) => theme.isDarkMode ? theme.colors.primary : theme.colors.text }
`;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('home', getHomePage);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Home;
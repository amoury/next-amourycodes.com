import Head from 'next/head'
import styled from 'styled-components';
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
        <title>Create Next Home</title>
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
            <p>These are half-baked notes from my learnings and research.</p>
            <Notes>
              <NotesList>
                {Boolean(notes.length) && notes.map(note => (
                  <Link key={note.id} href={`/notes/${formatUrl(note.title, note.id)}`}>
                    <a>
                      <ListItem><h4>{note.title}</h4></ListItem>
                    </a>
                  </Link> 
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
    max-height: 80vh;
  }
`

const Guides = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-auto-flow: dense;
`;

const Notes = styled.div`
  background-color: #FFF;
  padding: 20px 5px;
  border-radius: 10px;
`;

const NotesList = styled.ol`
  list-style: none;
  counter-reset: my-counter;

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

  h4 {
    font-size: 19px;
  }
`;

const TeasersSection = styled.section`
  display: grid;
  grid-column-gap: 50px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 60% auto;    
  }
`;

const TeaserTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  margin-bottom: 25px;
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('home', getHomePage);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Home;
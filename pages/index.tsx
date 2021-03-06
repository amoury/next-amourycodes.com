import Head from 'next/head'
import styled, { TTheme } from 'styled-components';
import { getHomePage } from '@utils/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { formatUrl } from '@utils/helpers';
import { NextSeo } from 'next-seo'

import Link from 'next/link';
import Intro from '@components/Intro';
import ArticleCard from '@components/ArticleCard';
import ArticleList from '@components/ArticleList';

const Home = (): JSX.Element => {
  const { data } = useQuery('home', getHomePage);
  if (!data) return null;
  const { guides, intro, notes } = data;
  return (
    <div>
      <NextSeo 
        title="Amoury | Frontend Engineer based in Dubai"  
        description="A software engineer who loves learning in public and sharing what he learns"
      />

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
              {!!notes.length && <ArticleList type="notes" articles={notes} />}
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
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
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
import Head from 'next/head'
import styled from 'styled-components';
import { getHomePage } from './api/home';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { formatUrl } from '@utils/helpers';

import Link from 'next/link';
import Intro from '@components/Intro';

const Home = (): JSX.Element => {
  const { data } = useQuery('home', getHomePage);
  if (!data) return null;
  const { guides, intro } = data;
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
        <ul>
          {Boolean(guides.length) && guides.map(guide => (
            <Link key={guide.id} href={`/guides/${formatUrl(guide.title, guide.id)}`}>
              <a>
                <li>{guide.title}</li>
              </a>
            </Link>
          ))}
        </ul>
      </Main>
    </div>
  )
}

const Main = styled.main``;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  padding: 0 20px;
  
  @media (min-width: 1024px) {
    padding: 0 150px;
    max-height: 80vh;
  }
`

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('home', getHomePage);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Home;
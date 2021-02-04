import { NextSeo } from 'next-seo';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { NotionRenderer } from 'react-notion';
import styled, { TTheme } from 'styled-components';
import { getGuidesPage } from '@utils/api';
import ArticleList from '@components/ArticleList';

const GuidesPage = (): JSX.Element => {
  const { data } = useQuery('guidesPage', getGuidesPage);
  const { guidesPage, guides } = data;
  return (
    <>
      <NextSeo
        title="Guides | Amourycodes"
        description="Half-baked notes from my learnings and research as a software engineer"
      />
      <Content>
        <HeroSection className="hero-section">
          <NotionRenderer blockMap={guidesPage} customBlockComponents={{
            collection_view: () => null
          }} />
        </HeroSection>

        <ArticleList articles={guides} type="guides" />
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

const HeroSection = styled.section``;

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('guidesPage', getGuidesPage);
  return { props: { dehydratedState: dehydrate(queryClient) }}
}

export default GuidesPage

import styled, { TTheme } from 'styled-components';
import { getAboutPage } from '@utils/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { NotionRenderer } from 'react-notion';

const About = () => {
  const { data } = useQuery('aboutPage', getAboutPage);
  if (!data) return <div>Loading...</div>;
  return (
    <Content className="content about-page">
      <NotionRenderer blockMap={data} />
    </Content>
  )
}

const Content = styled.article`
  max-width: 1200px;
  padding: 0 10px;
  
  @media (min-width: 1200px) {
    margin: 0 auto;
  }

  &.about-page {
    h1.notion-h1 {
      text-align: left;
    }
  }
`;


export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('aboutPage', getAboutPage);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default About

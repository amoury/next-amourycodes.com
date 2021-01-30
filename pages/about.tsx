import styled, { TTheme } from 'styled-components';
import { getAboutPage } from '@utils/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { NotionRenderer } from 'react-notion';

const About = () => {
  const { data } = useQuery('aboutPage', getAboutPage);
  if (!data) return <div>Loading...</div>;
  return (
    <Content>
      <NotionRenderer blockMap={data} />
    </Content>
  )
}

const Content = styled.div`
  max-width: 1200px;
  padding: 0 10px;
  
  @media (min-width: 1200px) {
    margin: 0 auto;
  }

  h1.notion-h1,
  h2.notion-h2 {
    font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.secondary};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    font-size: 40px;
  }

  h2.notion-h2 {
    font-size: 30px;
    letter-spacing: 0.2px;
  }
  
  p.notion-text {
    font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.text};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    font-size: 20px;
  }
`;


export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('aboutPage', getAboutPage);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default About

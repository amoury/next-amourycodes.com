import Head from 'next/head'
import styled from 'styled-components';
import { getNotes } from '@utils/api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { formatUrl } from '@utils/helpers';

import Link from 'next/link';

const Home = (): JSX.Element => {
  const { data } = useQuery('notes', getNotes);
  if (!data) return null;
  return (
    <div>
      <Head>
        <title>Create Next Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <Title>
          Hello
        </Title>
        <ul>
          {Boolean(data.length) && data.map(note => (
            <Link key={note.id} href={`/notes/${formatUrl(note.title, note.id)}`}>
              <a>
                <li>{note.title}</li>
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </div>
  )
}

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text}
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('notes', getNotes);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Home;
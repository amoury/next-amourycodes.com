import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { getNote, getNotes } from '../../api/notes-svc';
import { useRouter } from 'next/router';
import { getFormattedId, slugifyTitle } from '@utils/helpers';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import PostContent from '@components/PostContent';

const Note = (): JSX.Element => {
  const { data } = useQuery('notes', getNotes);
  const { query } = useRouter();
  const { data: note } = useQuery(['note', query.noteId], () => getNote(query.noteId as string));

  const title = note[Object.keys(note)[0]]?.value.properties.title[0][0];
  const metadata = !!data && data.filter(item => getFormattedId(item.id) === query.noteId)[0];

  // useEffect(() => {
  //   console.log(window.matchMedia('(prefers-color-scheme: dark)'));
  // }, [])

  return (
    <div>
      <NextSeo title={`${title} | Amourycodes`} />
      <PostContent title={title} metadata={metadata} notionBlocks={note} />
    </div>
  )
}



export async function getStaticPaths(): Promise<any> {
  const notes = await getNotes();
  const paths = notes.map(note => ({ params: { slug: slugifyTitle(note.title), noteId: getFormattedId(note.id) }}));
  return { paths, fallback: false }
}


export async function getStaticProps({ params }): Promise<any> {
  const { noteId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['note', noteId], () => getNote(noteId));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Note;
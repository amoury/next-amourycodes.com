import { NextSeo } from 'next-seo';
import { getNote, getNotes } from '@utils/api';
import { useRouter } from 'next/router';
import { getFormattedId, slugifyTitle, getFormattedMetaData } from '@utils/helpers';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import { BlockMapType } from 'react-notion';
import PostContent from '@components/PostContent';

const Note = (): JSX.Element => {
  const { query } = useRouter();
  const { data: note }: { data: BlockMapType } = useQuery(['note', query.noteId], () => getNote(query.noteId as string));

  const metadata = getFormattedMetaData(note, query.noteId as string);

  return (
    <div>
      <NextSeo title={`${metadata.title} | Amourycodes`} description={metadata.description} />
      <PostContent title={metadata.title} metadata={metadata} notionBlocks={note} />
    </div>
  )
}



export async function getStaticPaths(): Promise<any> {
  const notes = await getNotes();
  const paths = notes.map(note => ({ params: { slug: slugifyTitle(note.title), noteId: getFormattedId(note.id) }}));
  return { paths, fallback: 'blocking' }
}


export async function getStaticProps({ params }): Promise<any> {
  const { noteId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['note', noteId], () => getNote(noteId));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Note;
import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { getNote, getNotes } from '@utils/api';
import { getFormattedId, slugifyTitle } from '@utils/helpers';
import { useQuery } from 'react-query';
import PostContent from '@components/PostContent';
import { BlockMapType } from 'react-notion';

const Note = ({ note }: { note: BlockMapType}): JSX.Element => {
  if(!note) return null;
  const { data } = useQuery('notes', getNotes);
  const { query } = useRouter();

  const title = note[Object.keys(note)[0]]?.value.properties.title[0][0];
  const metadata = !!data && data.filter(item => getFormattedId(item.id) === query.noteId)[0];

  // useEffect(() => {
  //   console.log(window.matchMedia('(prefers-color-scheme: dark)'));
  // }, [])

  return (
    <div>
      <Head>
        <title>{`${title} | Amourycodes`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PostContent title={title} metadata={metadata} notionBlocks={note} />
    </div>
  )
}



export async function getStaticPaths() {
  const notes = await getNotes();
  const paths = notes.map(note => ({ params: { slug: slugifyTitle(note.title), noteId: getFormattedId(note.id) }}));
  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const { noteId } = params;
  const note = await getNote(noteId);
  return { props: { note }, revalidate: 1 }
}

export default Note;
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getNotes, getPage } from '@utils/api';
import { getFormattedId, slugifyTitle } from '@utils/helpers';
import { useQuery } from 'react-query';
import PostContent from '@components/PostContent';
import { BlockMapType } from 'react-notion';

const Guide = ({ guide }: { guide: BlockMapType}): JSX.Element => {
  if(!guide) return null;
  const { data } = useQuery('notes', getNotes);
  const { query } = useRouter();

  const title = guide[Object.keys(guide)[0]]?.value.properties.title[0][0];
  const metadata = !!data && data.filter(item => getFormattedId(item.id) === query.guideId)[0];

  // useEffect(() => {
  //   console.log(window.matchMedia('(prefers-color-scheme: dark)'));
  // }, [])

  return (
    <div>
      <NextSeo title={`${title} | Amourycodes`} />
      <PostContent title={title} metadata={metadata} notionBlocks={guide} />
    </div>
  )
}



export async function getStaticPaths() {
  const notes = await getNotes();
  const paths = notes.map(note => ({ params: { slug: slugifyTitle(note.title), guideId: getFormattedId(note.id) }}));
  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const { guideId } = params;
  const guide = await getPage(guideId);
  return { props: { guide }, revalidate: 1 }
}

export default Guide;
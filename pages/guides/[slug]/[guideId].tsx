import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getGuides, getGuide } from '../../api/guides-svc';
import { getFormattedId, slugifyTitle } from '@utils/helpers';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration'
import PostContent from '@components/PostContent';

const Guide = (): JSX.Element => {
  const { data } = useQuery('notes', getGuides);
  const { query } = useRouter();
  const { data : guide } = useQuery(['guide', query.guideId], () => getGuide(query.guideId as string));

  const title = guide[Object.keys(guide)[0]]?.value.properties.title[0][0];
  const metadata = !!data && data.filter(item => getFormattedId(item.id) === query.guideId)[0];

  return (
    <div>
      <NextSeo title={`${title} | Amourycodes`} />
      <PostContent title={title} metadata={metadata} notionBlocks={guide} />
    </div>
  )
}



export async function getStaticPaths() {
  const guides = await getGuides();
  const paths = guides.map(guide => ({ params: { slug: slugifyTitle(guide.title), guideId: getFormattedId(guide.id) }}));
  return { paths, fallback: 'blocking' }
}


export async function getStaticProps({ params }) {
  const { guideId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['guide', guideId], () => getGuide(guideId));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Guide;
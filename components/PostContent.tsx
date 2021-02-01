import styled, { TTheme } from 'styled-components';
import { NotionRenderer, BlockMapType, BaseTextValueType } from 'react-notion'
import Metadata from './Metadata';
import { TPost } from 'types/post';
import { rgba } from '@utils/helpers';
import { slugifyTitle } from '@utils/helpers'

type TProps = {
  title: string;
  metadata: TPost | null;
  notionBlocks: BlockMapType;
}

const renderSubtitle = (blockValue: BaseTextValueType) => {
  const title = blockValue.properties?.title[0][0];
  return (<h2 className="notion-h2" id={slugifyTitle(title)}>{title}</h2>)
}

const PostContent = ({ title, metadata, notionBlocks }: TProps): JSX.Element => {
  return (
    <Content className="content">
      <h1 className="notion-h1">{title}</h1>
      <MetaSection>
        {!!metadata && <Metadata data={metadata} />}
      </MetaSection>
      <NotionRenderer blockMap={notionBlocks} customBlockComponents={{
        sub_header: ({ blockValue }) => renderSubtitle(blockValue)
      }} />
    </Content>
  )
}

const MetaSection = styled.div`
  border-top: 1px solid ${({ theme }: { theme: TTheme }) => rgba(theme.colors.text, '0.5')};
  border-bottom: 1px solid ${({ theme }: { theme: TTheme }) => rgba(theme.colors.text, '0.5')};
  padding: 20px 0;
  max-width: 500px;
  margin: 50px auto;
`;

const Content = styled.article`
  max-width: 90%;
  margin: 70px auto 50px;

  @media (min-width: 1024px) {
    max-width: 1024px;
  }
`;

export default PostContent;
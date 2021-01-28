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
    <Content>
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
  border-top: 1px solid ${({ theme }: { theme: TTheme }) => rgba(theme.colors.text, 0.5)};
  border-bottom: 1px solid ${({ theme }: { theme: TTheme }) => rgba(theme.colors.text, 0.5)};
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

  .notion {
    max-width: 100%;
  }

  h1.notion-h1, 
  h2.notion-h2, 
  h3.notion-h3 {
    font-family: ${({ theme }) => theme.fonts.heading };
    color: ${({ theme }) => theme.colors.heading };
  }

  h1.notion-h1 {
    font-size: 50px;
    line-height: 60px;
    letter-spacing: -2px;
    text-align: center;
    margin-bottom: 0;
    
    @media (min-width: 1024px) {
      font-size: 80px;
      line-height: 90px;
    } 
  }

  p.notion-text s {
    text-decoration: none;
    position: relative;
    display: inline-block;

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 30%;
      left: 0;
      bottom: 15%;
      background: ${({ theme }: { theme: TTheme }) => rgba(theme.colors.highlight, '0.8')};
    }
  }

  p.notion-text,
  blockquote.notion-quote {
    font-family: ${({ theme }) => theme.fonts.text };
    font-size: 16px;
    line-height: 38px;
    margin-bottom: 22px;
    letter-spacing: 0.25px;
    color: ${({ theme }) => theme.colors.text};

    @media (min-width: 1024px) {
      font-size: 18px;
    }
  }
  
  .notion-list {
    font-family: ${({ theme }) => theme.fonts.text };
    font-size: 16px;
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
  }

  blockquote.notion-quote {
    background: ${({ theme }: { theme: TTheme }) => theme.colors.secondary};
    border-radius: 4px;
  }

  h2.notion-h2 {
    margin-bottom: 26px;
    padding-top: 25px;
    font-size: 30px;
  }

`;

export default PostContent;
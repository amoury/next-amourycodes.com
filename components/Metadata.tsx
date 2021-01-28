import styled, { TTheme } from 'styled-components';
import { formatDistance } from 'date-fns';
import { TPost } from 'types/post';
import { rgba } from '@utils/helpers';

type TProps = {
  data: TPost;
}

const Metadata = ({ data }: TProps): JSX.Element | null => {
  if (!data) return null;
  const publishTime = `published ${formatDistance(new Date(data.createdAt), new Date(), { addSuffix: true })}`;
  return (
    <Meta>
      <PublishTime>{publishTime}</PublishTime>
      <TagsList>
        {!!data.tags.length && data.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </TagsList>
    </Meta>
  ) 
}

const Meta = styled.section`
  font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.secondary}; 
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PublishTime = styled.span`
  color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
  font-size: 13px;
  margin-bottom: 10px;
`;

const TagsList = styled.div`
  display: flex;
`;

const Tag = styled.span`
  background-color: ${({ theme }: { theme: TTheme }) => `${rgba(theme.colors.text, '0.7')}`};
  color: ${({ theme }: { theme: TTheme }) => theme.colors.secondary};
  padding: 6px 10px 5px;
  display: inline-block;
  margin: 0 5px;
  border-radius: 3px;
  font-size: 13px;
`;

export default Metadata;
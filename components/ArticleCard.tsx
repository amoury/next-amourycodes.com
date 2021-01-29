import styled, { TTheme } from 'styled-components';
import Image from 'next/image';

interface IProps {
  article: {
    id: string;
    status: string;
    tags: string[];
    title: string;
    createdAt: Date;
    image?: Array<{name: string; rawUrl: string; url: string;}>
  }
}

const ArticleCard = ({ article }: IProps): JSX.Element => {
  return (
    <Card>
      <ImageWrapper>
        {!!article.image?.length && 
          <Image 
            src={article.image[0].url} 
            width="500px"
            height="300px"
            layout="responsive"
          />
        }
      </ImageWrapper>
      <Title>{article.title}</Title>
    </Card>
  )
}

const Title = styled.h4`
  font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.heading};
  color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
  line-height: 25px;
  font-size: 19px;
  transition: color 0.2s ease-in;
`;

const Card = styled.article`
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.isDarkMode? `15px 15px 30px #091b21, -15px -15px 30px #0d252d;`: `15px 15px 30px #d6d6d6, -15px -15px 30px #ffffff`};
  overflow: hidden;
  padding: 20px;
  transition: all 0.4s ease-in-out;
  max-width: 320px;
  
  &:hover {
    box-shadow: ${({ theme }: { theme: TTheme }) => theme.isDarkMode ? '24px 24px 48px #091b21, -24px -24px 48px #0d252d' : '24px 24px 48px #cdcdcd, -24px -24px 48px #ffffff' };

    ${Title} {
      color: ${({ theme }) => theme.colors.link};
    }
  }
`;

const ImageWrapper = styled.div`
`;

export default ArticleCard

import styled from 'styled-components';
import Link from 'next/link';
import { formatUrl } from '@utils/helpers';

interface IArticle {
  createdAt: string;
  id: string;
  status: string;
  tags: string[];
  title: string;
  url: string;
}

interface IProps {
  articles: Array<IArticle>;
  type: 'notes' | 'guides';
}

const ArticleList = ({ articles, type }: IProps): JSX.Element | null => {
  if (!articles.length) return null;
  const formattedArticles = articles.map(article => ({ ...article, url: `/${type}/${formatUrl(article.title, article.id)}`}));
  return (
    <ArticlesList>
      {Boolean(formattedArticles.length) && formattedArticles.map(article => (
        <ListItem key={article.id}>
          <Link href={article.url}>
            <a>
              <h4>{article.title}</h4>
            </a>
          </Link> 
        </ListItem>
      ))}
    </ArticlesList>
  )
}

const ArticlesList = styled.ol`
  list-style: none;
  counter-reset: my-counter;
  padding: 0;
`;

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  counter-increment: my-counter;
  font-size: 0.8rem;
  display: flex;
  margin: 40px 0;
  align-items: flex-end;

  &::before {
    content: "0" counter(my-counter);
    min-width: 60px;
    text-align: left;
    font-weight: bold;
    font-size: 3rem;
    margin-right: 0.9rem;
    font-family: ${({ theme }) => theme.fonts.text};
    line-height: 0.8;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }

  h4 {
    font-size: 19px;
    margin: 0;
  }
`;


export default ArticleList

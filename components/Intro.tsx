import { NotionRenderer, BlockMapType } from 'react-notion';
import styled, { TTheme } from 'styled-components';


const Intro = ({ intro }: { intro: BlockMapType }): JSX.Element => {
  return (
    <SIntro>
      <NotionRenderer blockMap={intro} />
    </SIntro>
  )
}

const SIntro = styled.div`
  max-width: 1024px;
  
  h1.notion-h1 {
    font-size: 40px;
    font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.heading};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    
    @media (min-width: 1024px) {
      font-size: 60px;
    }
  }
  
  h2.notion-h2 {
    font-size: 22px;
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text}; 
    
    @media (min-width: 1024px) {
      font-size: 40px;
    }
  }
  
  p.notion-text {
    font-size: 16px;
    color: ${({ theme }: { theme: TTheme }) => theme.colors.text}; 
    
    @media (min-width: 1024px) {
      font-size: 20px;
    }
  }

  a.notion-link {
    ${({ theme }) => theme.isDarkMode && `color: ${theme.colors.primary}`};
  }
`;

export default Intro

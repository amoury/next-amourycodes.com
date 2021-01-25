import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext, TTheme } from 'styled-components';
import styled from 'styled-components';

const menuItems = [
  { id: 1, url: '/notes', name: 'Notes' },
  { id: 2, url: '/guides', name: 'Guides' }
];

const Nav = (): JSX.Element => {
  const themeContext = useContext<TTheme>(ThemeContext);
  const { heading } = themeContext.colors;

  return (
    <StyledNav>
      <div>
        <Link href='/'>
          <a>
            <svg width="40px" height="40px" viewBox="0 0 182.33 182.33"><path fill="none" stroke={heading} strokeMiterlimit="10" strokeWidth="12" d="M3.5 3.5h175.33v175.33H3.5z"></path><path d="M95.7 170.86l35.56-79.7 35.68 79.7h-16.05l-19.63-43.83-19.5 43.83z" fill={heading}></path></svg>
          </a>
        </Link>
      </div>
      <div>
        <Menu>
          { menuItems.map(item => (
            <Link key={item.id} href={item.url}>
              <a><li>{item.name}</li></a>
            </Link>
          ))}
        </Menu>
      </div>
    </StyledNav>
  )
}


const StyledNav = styled.nav`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
  position: sticky;
  top: 0;
  background: ${({ theme }: { theme: TTheme }) => theme.colors.background};
  z-index: 10;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;

  a {
    padding: 0 10px;
  }
`;

export default Nav;
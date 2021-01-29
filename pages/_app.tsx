import { useEffect, useState } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import GlobalStyle from '../styles/globals';
import { ReactQueryDevtools } from 'react-query/devtools'

import Nav from '@components/Nav';

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }): JSX.Element {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const config = window.localStorage.getItem('appConfig');

    if (config) {
      const parsedConfig = JSON.parse(config);
      parsedConfig.isDarkMode ? setDarkMode(true) : setDarkMode(false);
      return;
    }
    
    window.matchMedia('(prefers-color-scheme: dark)') ? setDarkMode(true) : setDarkMode(false);
  }, []);

  const toggleDarkMode = (isEnabled: boolean) => {
    setDarkMode(isEnabled);
    window.localStorage.setItem('appConfig', JSON.stringify({ isDarkMode: isEnabled }));
  }

  return (
    <ThemeProvider theme={theme(isDarkMode)}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <Nav toggleDarkMode={toggleDarkMode} />          
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default MyApp

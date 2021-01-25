import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import GlobalStyle from '../styles/globals';
import { ReactQueryDevtools } from 'react-query/devtools'

import Nav from '@components/Nav';

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
            <Nav />          
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default MyApp

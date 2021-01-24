import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../styles/globals.css'
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-twilight.css";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default MyApp

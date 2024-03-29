import "../styles/globals.css";
import "../styles.css";
/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";

import { Provider } from "next-auth/client";
import theme from "../utils/theme";
import { ThemeProvider } from "theme-ui";
import ToastProvider from "../src/components/common/toast-provider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider session={pageProps.session}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;

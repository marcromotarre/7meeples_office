import "../styles/globals.css";
import { Provider } from "next-auth/client";
import theme from "../utils/theme";
import { ThemeProvider } from "theme-ui";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;

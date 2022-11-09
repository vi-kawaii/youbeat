import "../styles/globals.css";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit", {});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

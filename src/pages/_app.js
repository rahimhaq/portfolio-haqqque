import '@/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rahim T. Z. Haq | Embedded & Full Stack Developer</title>
        <meta name="description" content="Portfolio of Rahim Tahajjadan Zhaahir Haq — Computer Engineering B.A.Sc., specialized in Embedded Systems and Full-Stack Web Development."/>
        <meta name="keywords" content="Rahim Haq, Embedded Systems, Full Stack, STM32, FreeRTOS, IoT, BRIN, Portfolio"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

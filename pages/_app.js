'use client';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserProvider as AtlasUserProvider } from '../context/UserContext.js';
import styles from './page.module.css';
import './globals.css';

export default function App({ Component, pageProps }) {
  console.log('coimponent', Component);
  console.log('props:', pageProps);
  return (
    <>
      <Head>
        <title>Foodie - Food lovers</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <main className={styles.main}>
        <UserProvider>
          <AtlasUserProvider>
            <Component {...pageProps} />
          </AtlasUserProvider>
        </UserProvider>
      </main>
    </>
  );
}

'use client';
import Head from 'next/head';
import { AuthProvider } from '../context/authContexts.js'
import styles from './page.module.css';
import './globals.css';

export default function App({ Component, pageProps }) {
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
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
      </main>
    </>
  );
}

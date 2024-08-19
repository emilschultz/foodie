'use client';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserProvider as AtlasUserProvider } from '../context/UserContext.js';
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
import 'firebase/storage';
import styles from './page.module.css';
import './globals.css';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'foodie-file-storage.appspot.com',
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);

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
        <UserProvider>
          <AtlasUserProvider>
            {/* component is a page component from the pages folder and the ...pageProps is all the initial properties for the page. These can include data fetched at build time, query parameters, or any other props needed by the page component.   */}
            <Component {...pageProps} />
          </AtlasUserProvider>
        </UserProvider>
      </main>
    </>
  );
}

'use client';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserProvider as AtlasUserProvider } from '../context/UserContext.js';
import { initializeApp } from 'firebase/app';
import styles from './page.module.css';
import './globals.css';


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
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
            <Component {...pageProps} />
          </AtlasUserProvider>
        </UserProvider>
      </main>
    </>
  );
}

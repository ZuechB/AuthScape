import React from 'react';
import Head from 'next/head';
import {apiService} from 'authscape';

export default function Home({currentUser}) {

  return (
    <div>
      <Head>
      <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Admin Portal</title>
        <link rel="icon" href="/favicon.ico" />

        

      </Head>
        <main>
            <div className="container-fluid">
              <main>
                <h1>

                  Dashboard will go here

                </h1>
              </main>
            </div>
        </main>
    </div>
  )
}

import React from 'react'
import type { AppProps } from 'next/app'
import { ProvideData } from '~platform';
import { AuthRedirect } from '~auth';

import '../styles/globals.css'

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideData>
      <AuthRedirect>
        <Component {...pageProps} />
      </AuthRedirect>
    </ProvideData>
  );
}

export default GPDApp

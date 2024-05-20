import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ProvideData } from '~platform';
import { AuthRedirect } from '~auth';
import { ProvideProjects } from '~projects';
import { ProvideToday, ProvideSessions } from '~calendar';
import { AppLayout } from '~core-ui';
import cn from 'classnames';

import '../styles/globals.css';
import '../styles/editor.css';
import { ProvideTasks } from 'libs/tasks/hooks/useTasks';

const GPDApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ProvideData>
      <AuthRedirect>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </AuthRedirect>
    </ProvideData>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  if (router.pathname === '/login') {
    return children;
  }

  return (
    <>
      <ProvideProjects>
        <ProvideTasks>
          <ProvideToday>
            <ProvideSessions>
              <AppLayout>
                {children}
              </AppLayout>
            </ProvideSessions>
          </ProvideToday>
        </ProvideTasks>
      </ProvideProjects>

      {process.env.NODE_ENV === 'development' && (
        <div className="absolute left-56 top-3 text-red-600 text-2xl font-light py-1 px-12 bg-yellow-500">
          DEV
        </div>
      )}

      <div
        className={cn(
          'hidden h-6 h-5 h-4 h-3 w-6 w-5 w-4 h-3.5 w-3 w-3.5',
          'border-gray-400 hover:border-gray-400 hover:border-gray-400/50 hover:border-gray-400/25 border-gray-400/50 border-gray-400/75 bg-gray-400 bg-gray-400/10 bg-gray-400/25 bg-gray-400/50 hover:bg-gray-400 hover:bg-gray-400/75 focus:outline-gray-400 text-gray-400 after:bg-gray-400',
          'border-yellow-500 hover:border-yellow-500 hover:border-yellow-500/50 hover:border-yellow-500/25 border-yellow-500/50 border-yellow-500/75 bg-yellow-500 bg-yellow-500/10 bg-yellow-500/25 bg-yellow-500/50 hover:bg-yellow-500 hover:bg-yellow-500/75 focus:outline-yellow-500 text-yellow-500 after:bg-yellow-500',
          'border-green-500 hover:border-green-500 hover:border-green-500/50 hover:border-green-500/25 border-green-500/50 border-green-500/75 bg-green-500 bg-green-500/10 bg-green-500/25 bg-green-500/50 hover:bg-green-500 hover:bg-green-500/75 focus:outline-green-500 text-green-500 after:bg-green-500',
          'border-sky-500 hover:border-sky-500 hover:border-sky-500/50 hover:border-sky-500/25 border-sky-500/50 border-sky-500/75 bg-sky-500 bg-sky-500/10 bg-sky-500/25 bg-sky-500/50 hover:bg-sky-500 hover:bg-sky-500/75 focus:outline-sky-500 text-sky-500 after:bg-sky-500',
          'border-orange-500 hover:border-orange-500 hover:border-orange-500/50 hover:border-orange-500/25 border-orange-500/50 border-orange-500/75 bg-orange-500 bg-orange-500/10 bg-orange-500/25 bg-orange-500/50 hover:bg-orange-500 hover:bg-orange-500/75 focus:outline-orange-500 text-orange-500 after:bg-orange-500',
          'border-purple-500 hover:border-purple-500 hover:border-purple-500/50 hover:border-purple-500/25 border-purple-500/50 border-purple-500/75 bg-purple-500 bg-purple-500/10 bg-purple-500/25 bg-purple-500/50 hover:bg-purple-500 hover:bg-purple-500/75 focus:outline-purple-500 text-purple-500 after:bg-purple-500'
        )}
      />
    </>
  );
};

export default GPDApp;

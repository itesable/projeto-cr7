'use client';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import SessionProvider from './SessionProvider';

const ErudaProvider = dynamic(
  () => import('./ClientContent/Eruda').then((c) => c.ErudaProvider),
  { ssr: false }
);

interface ClientProvidersProps {
  children: ReactNode;
  session: any;
}

export default function ClientProviders({
  children,
  session,
}: ClientProvidersProps) {
  return (
    <ErudaProvider>
      {/* Removi completamente o MiniKitProvider */}
      <SessionProvider session={session}>{children}</SessionProvider>
    </ErudaProvider>
  );
}

'use client';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import SessionProvider from './SessionProvider';

const ErudaProvider = dynamic(
  () => import('./ClientContent/Eruda').then((c) => c.ErudaProvider),
  { ssr: false }
);

// Adicione esta importação dinâmica para o MiniKitProvider:
const MiniKitProvider = dynamic(
  () => 
    import('@worldcoin/minikit-js').then((mod) => {
      // Se houver problema com o nome, tentamos diferentes formas
      return mod.MiniKitProvider || mod.default || mod;
    }),
  { 
    ssr: false // Isso é ESSENCIAL!
  }
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
      {/* Isso agora vai funcionar apenas no navegador */}
      <MiniKitProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </MiniKitProvider>
    </ErudaProvider>
  );
}

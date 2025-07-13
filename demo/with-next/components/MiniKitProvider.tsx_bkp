// components/MiniKitProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

const MiniKitContext = createContext<{
  isInitialized: boolean;
  user: any | null;
}>({
  isInitialized: false,
  user: null,
});

export const MiniKitProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await MiniKit.init();
        const userInfo = await MiniKit.getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('MiniKit initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    if (typeof window !== 'undefined') {
      initialize();
    }
  }, []);

  return (
    <MiniKitContext.Provider value={{ isInitialized, user }}>
      {children}
    </MiniKitContext.Provider>
  );
};

export const useMiniKit = () => useContext(MiniKitContext);
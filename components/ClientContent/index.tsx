'use client';

import { MiniKit } from '@worldcoin/minikit-js';
import {
  GetSearchedUsernameResult,
  UsernameSearch,
} from '@worldcoin/minikit-react';
import dynamic from 'next/dynamic';

import { useState } from 'react';
import { WalletAuth } from './WalletAuth';
//import { TokenSwap } from './TokenSwap';
//import { SendTransaction } from './Transaction';


const VersionsNoSSR = dynamic(
  () => import('./Versions').then((comp) => comp.Versions),
  { ssr: false },
);

export const ClientContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] =
    useState<GetSearchedUsernameResult>();
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  return (
    <div className="p-2 lg:p-8 grid content-start gap-y-2">
      <hr />
          <WalletAuth />
          <hr />
    </div>
  );
};

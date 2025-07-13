import {
  MiniKit,
  ResponseEvent,
  User,
  WalletAuthErrorCodes,
  WalletAuthPayload,
} from '@worldcoin/minikit-js';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { validateSchema } from './helpers/validate-schema';
import { useRouter } from 'next/navigation';

const walletAuthSuccessPayloadSchema = yup.object({
  status: yup.string<'success'>().oneOf(['success']),
  message: yup.string().required(),
  signature: yup.string().required(),
  address: yup.string().required(),
  version: yup.number().required(),
});

const walletAuthErrorPayloadSchema = yup.object({
  error_code: yup
    .string<WalletAuthErrorCodes>()
    .oneOf(Object.values(WalletAuthErrorCodes))
    .required(),
  status: yup.string<'error'>().equals(['error']).required(),
});

/* 
Note: This is not a secure implementation of Wallet Auth.
It is only for demo purposes.
*/
export const WalletAuth = () => {
  const router = useRouter();

  const [message, setMessage] = useState<WalletAuthPayload | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);
  const [receivedWalletAuthPayload, setReceivedWalletAuthPayload] =
    useState<Record<string, any> | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  const [
    walletAuthPayloadValidationMessage,
    setWalletAuthPayloadValidationMessage,
  ] = useState<string | null>();

  const [walletAuthVerificationMessage, setWalletAuthVerificationMessage] =
    useState<string | null>();

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    MiniKit.subscribe(ResponseEvent.MiniAppWalletAuth, async (payload) => {
      console.log('MiniAppWalletAuth, SUBSCRIBE PAYLOAD', payload);
      if (payload.status === 'error') {
        const errorMessage = await validateSchema(
          walletAuthErrorPayloadSchema,
          payload,
        );

        if (!errorMessage) {
          setWalletAuthPayloadValidationMessage('Payload is valid');
        } else {
          setWalletAuthPayloadValidationMessage(errorMessage);
        }
      } else {
        const errorMessage = await validateSchema(
          walletAuthSuccessPayloadSchema,
          payload,
        );

        if (!errorMessage) {
          setWalletAuthPayloadValidationMessage('Payload is valid');
        } else {
          setWalletAuthPayloadValidationMessage(errorMessage);
        }

        console.log('MiniKit. payload', payload);

        // Call the API to verify the message
        const response = await fetch('/api/verify-siwe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payload,
            nonce,
          }),
        });

        const responseJson = await response.json();

        const isValid = responseJson.isValid;
        setWalletAuthVerificationMessage(
          isValid
            ? 'Valid! Successfully Signed In'
            : `Failed: ${responseJson.message}`,
        );

        // Se a verificação for bem-sucedida, redirecione para o dashboard
        if (isValid) {
          if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
            const res = await fetch(
              'https://usernames.worldcoin.org/api/v1/query',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  addresses: [payload.address],
                }),
              },
            );

            const usernames = await res.json();
            const userProfile = usernames?.[0] ?? {
              username: null,
              profilePictureUrl: null,
            };
            setProfile(userProfile);
            // Salvar o perfil no localStorage para usar no dashboard
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            // Redirecionar para o dashboard
            router.push('/dashboard');
          } else {
            const user = await MiniKit.getUserInfo();
            console.log(user);
            setProfile(user);
            // Salvar o perfil no localStorage para usar no dashboard
            localStorage.setItem('userProfile', JSON.stringify(user));
            // Redirecionar para o dashboard
            router.push('/dashboard');
          }
        }
      }

      setReceivedWalletAuthPayload(payload);
      console.log('From object', MiniKit.user?.walletAddress);
    });

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppWalletAuth);
    };
  }, [nonce, router]); // Adicione router nas dependências

  const onGenerateMessageClick = useCallback(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    const nonce = window.crypto.randomUUID();
    setNonce(nonce);
    const generateMessageResult = MiniKit.commands.walletAuth({
      nonce: nonce,
      requestId: '0',
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      statement:
        'This is my statement and here is a link https://worldcoin.com/apps',
    });
    console.log('generateMessageResult', generateMessageResult);
    if (!generateMessageResult) {
      return setGenerationError('Failed to generate message');
    }

    return setMessage(generateMessageResult);
  }, []);

  return (

      <button
        className="flex items-center justify-center w-full space-x-2 px-6 py-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 font-medium"
        onClick={onGenerateMessageClick}
      >
        Login with wallet
      </button>

  );
};

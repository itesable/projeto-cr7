// components/ClaimButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { toast } from 'react-toastify';

// Interface para o perfil do usuário
interface UserProfile {
  username: string | null;
  profilePictureUrl?: string | null;
  walletAddress?: string;
}

const ClaimButton = () => {
  const { address, isConnected } = useAccount();
  const [canClaim, setCanClaim] = useState(false);
  const [lastClaimTime, setLastClaimTime] = useState<number | null>(null);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Efeito para carregar o perfil do usuário do localStorage
  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          const profile = JSON.parse(storedProfile);
          setUserProfile(profile);
          
          if (profile.walletAddress) {
            setUserAddress(profile.walletAddress);
          } else if (profile.username) {
            fetchUserAddress(profile.username);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar informações do usuário");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // Função para buscar o endereço da carteira associado a um username do World ID
  const fetchUserAddress = async (username: string) => {
    try {
      const response = await axios.get(
        `https://usernames.worldcoin.org/api/v1/search/${username}`
      );
      
      const userData = response.data.find(
        (user: any) => user.username === username
      );
      
      if (userData) {
        setUserAddress(userData.address);
        // Atualiza o perfil no estado e no localStorage com o endereço encontrado
        const updatedProfile = {
          ...userProfile!,
          walletAddress: userData.address
        };
        
        setUserProfile(updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      toast.error("Não foi possível buscar o endereço da carteira.");
    }
  };

  // Verificar status do claim com tratamento de erros robusto
const checkClaimStatus = async () => {
  const claimAddress = address || userAddress;
  if (!claimAddress) return;
  
  try {
    const response = await fetch(`/api/check-claim?address=${encodeURIComponent(claimAddress)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    setCanClaim(data.canClaim);
    setLastClaimTime(data.lastClaimTime);
    setTotalClaimed(data.totalClaimed);
    
    if (!data.canClaim && data.lastClaimTime) {
      calculateTimeLeft(data.lastClaimTime);
    }
  } catch (err: any) {
    console.error('Erro ao verificar status:', err);
    
    // Exibir detalhes completos do erro
    const errorMsg = err.details 
      ? `Erro: ${err.message}\nDetalhes: ${err.details}`
      : err.message;
    
    setError(errorMsg);
  }
};

  // Calcular tempo restante
  const calculateTimeLeft = (lastTime: number) => {
    const now = Date.now();
    const nextClaimTime = lastTime + 24 * 60 * 60 * 1000;
    const difference = nextClaimTime - now;
    
    if (difference <= 0) {
      setCanClaim(true);
      setTimeLeft('');
      return;
    }
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    setTimeLeft(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (lastClaimTime && !canClaim) {
      timer = setInterval(() => {
        if (lastClaimTime) {
          calculateTimeLeft(lastClaimTime);
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [lastClaimTime, canClaim]);

  useEffect(() => {
    // Definir username com base no perfil do usuário ou gerar um
    if (userProfile?.username) {
      setUsername(userProfile.username);
    } else if (address) {
      setUsername(`user_${address.slice(2, 8)}`);
    }
    
    // Verificar o status de claim apenas quando o perfil estiver carregado
    if (!isLoadingProfile) {
      checkClaimStatus();
    }
  }, [address, userAddress, userProfile, isLoadingProfile]);

  const handleClaim = async () => {
    // Usar o endereço da carteira conectada OU o endereço do perfil do usuário
    const claimAddress = address || userAddress;
    if (!claimAddress || !username || isClaiming) return;
    
    setIsClaiming(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: claimAddress, 
          username 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar a solicitação');
      }
      
      const data = await response.json();
      
      setSuccess(true);
      setTotalClaimed(prev => prev + 1);
      setCanClaim(false);
      setLastClaimTime(Date.now());
      
      // Atualizar o status após 3 segundos
      setTimeout(() => {
        checkClaimStatus();
      }, 3000);
    } catch (err: any) {
      console.error('Erro ao fazer claim:', err);
      setError(err.message || 'Erro ao processar claim');
    } finally {
      setIsClaiming(false);
    }
  };

  // Determinar o status de conexão
  const isUserConnected = isConnected || (userAddress !== null && !isLoadingProfile);

  if (isLoadingProfile) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }


  return (
      <div className="w-full">

      <div className="flex flex-col items-center mb-2">
        <div className="flex justify-center items-center mb-2">
          <span className="text-gray-600 font-semibold">Status:</span>
          <span className={`ml-2 font-semibold ${canClaim ? 'text-green-600' : 'text-purple-600'}`}>
            {canClaim ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
       
        {!canClaim && timeLeft && (
          <div className="flex justify-center items-center">
            <span className="text-gray-600 font-semibold">Next claim in:</span>
            <span className="ml-2 font-semibold text-gray-600">{timeLeft}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleClaim}
        disabled={!canClaim || isClaiming}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
          canClaim && !isClaiming
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isClaiming ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'CLAIM 1 CR7'
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
          1 CR7 token successfully claimed!
        </div>
      )}

    </div>
  );
};

export default ClaimButton;

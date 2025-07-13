"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Trophy,
  Target,
  ExternalLink,
  TrendingUp,
  ArrowUpDown,
  Copy,
  Check,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MiniKit } from '@worldcoin/minikit-js';
import ClaimButton from '@/components/ClaimButton';

interface UserProfile {
  username: string | null;
  profilePictureUrl?: string | null;
}

interface UserSearchResult {
  username: string;
  address: string;
  profile_picture_url: string | null;
  minimized_profile_picture_url: string | null;
}

type Section = "airdrop" | "trading";

// Endereços reais dos contratos
const CR7_TOKEN_ADDRESS = "0x3664c2D02e0DAcdBCbB90F839CAeaa7b925142d7";
const WLD_TOKEN_ADDRESS = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003";

interface PoolState {
  reserveCR7: number;
  reserveWLD: number;
  k: number;
}

interface SupplyData {
  initial: number;
  distributed: number;
  available: number;
}

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [addressCopied, setAddressCopied] = useState(false);
  const [cr7Balance, setCr7Balance] = useState<number>(0);
  const [wldBalance, setWldBalance] = useState<number>(0);
  const [supplyData, setSupplyData] = useState<SupplyData | null>(null);
  const [loadingSupply, setLoadingSupply] = useState(true);
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserProfile(profile);
      
      if (profile.username) {
        fetchUserAddress(profile.username);
      }
    }
    
    // Buscar dados de supply assim que o componente for montado
    fetchSupplyData();
  }, []);
  
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("airdrop");

  // Função para buscar dados de supply
  const fetchSupplyData = async () => {
    setLoadingSupply(true);
    try {
      const response = await fetch('/api/supply');
      if (!response.ok) {
        throw new Error('Falha ao buscar dados de supply');
      }
      const data: SupplyData = await response.json();
      setSupplyData(data);
    } catch (error) {
      console.error('Erro ao buscar supply data:', error);
      toast.error('Falha ao carregar dados de supply');
    } finally {
      setLoadingSupply(false);
    }
  };

  const fetchUserAddress = async (username: string) => {
    try {
      const response = await axios.get(
        `https://usernames.worldcoin.org/api/v1/search/${username}`
      );
      
      const userData = response.data.find(
        (user: UserSearchResult) => user.username === username
      );
      
      if (userData) {
        setUserAddress(userData.address);
      } else {
        toast.warning(`Endereço não encontrado para este username`);
      }
    } catch (error) {
      console.error(`Erro ao buscar endereço do usuário:`, error);
      toast.error(`Falha ao buscar endereço do usuário`);
    }
  };

  const fetchTokenBalance = async (tokenAddress: string) => {
    if (!userAddress) return 0;
    
    try {
      const cleanAddress = userAddress.replace(/^0x/, "").toLowerCase();
      
      const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [{
          to: tokenAddress,
          data: '0x70a08231000000000000000000000000' + cleanAddress
        }, "latest"]
      };

      const response = await axios.post(
        "https://worldchain-mainnet.g.alchemy.com/v2/xBzojrqHVjUdrTiSMuaJWpcdo09HNUw4",
        payload
      );

      const result = response.data.result;
      if (result && result !== "0x") {
        const balanceWei = parseInt(result, 16);
        return balanceWei / 10**18;
      }
      return 0;
    } catch (error) {
      console.error(`Erro ao buscar saldo do token ${tokenAddress}:`, error);
      toast.error(`Falha ao buscar saldo do token ${tokenAddress}`);
      return 0;
    }
  };

  const fetchBalances = async () => {
    const cr7 = await fetchTokenBalance(CR7_TOKEN_ADDRESS);
    const wld = await fetchTokenBalance(WLD_TOKEN_ADDRESS);
    setCr7Balance(cr7);
    setWldBalance(wld);
  };

  useEffect(() => {
    if (userAddress) {
      fetchBalances();
      const interval = setInterval(fetchBalances, 30000);
      return () => clearInterval(interval);
    }
  }, [userAddress]);

  
/* ──────────────── TRADING SECTION ──────────────── */
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [tradeAmount, setTradeAmount] = useState("");
  const [pairData, setPairData] = useState<any>(null);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(true);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [pool, setPool] = useState<PoolState | null>(null);

  const formatValue = (value: number, maxDecimals: number = 8) => {
    if (value === 0) return "0";
    
    if (value < 0.0001) {
      return value.toFixed(8).replace(/\.?0+$/, '');
    }
    
    const integerPlaces = value >= 1 ? value.toString().split('.')[0].length : 0;
    const decimalPlaces = Math.max(4, Math.min(maxDecimals, 10 - integerPlaces));
    
    return value.toFixed(decimalPlaces).replace(/\.?0+$/, '');
  };

  const fetchPairData = async () => {
    try {
      setLoadingPrices(true);
      setPriceError(null);
      
      const response = await axios.get(
        `https://api.dexscreener.com/latest/dex/search/?q=${CR7_TOKEN_ADDRESS}`
      );
      
      const cr7WldPair = response.data.pairs.find(
        (pair: any) => 
          (pair.baseToken.address.toLowerCase() === CR7_TOKEN_ADDRESS.toLowerCase() && 
           pair.quoteToken.address.toLowerCase() === WLD_TOKEN_ADDRESS.toLowerCase()) ||
          (pair.baseToken.address.toLowerCase() === WLD_TOKEN_ADDRESS.toLowerCase() && 
           pair.quoteToken.address.toLowerCase() === CR7_TOKEN_ADDRESS.toLowerCase())
      );

      if (!cr7WldPair) {
        throw new Error(`Par CR7/WLD não encontrado`);
      }

      setPairData(cr7WldPair);
      
      const isCr7Base = cr7WldPair.baseToken.address.toLowerCase() === CR7_TOKEN_ADDRESS.toLowerCase();
      
      if (cr7WldPair.liquidity?.base && cr7WldPair.liquidity?.quote) {
        const cr7Reserve = isCr7Base ? 
          parseFloat(cr7WldPair.liquidity.base) : 
          parseFloat(cr7WldPair.liquidity.quote);
        
        const wldReserve = isCr7Base ? 
          parseFloat(cr7WldPair.liquidity.quote) : 
          parseFloat(cr7WldPair.liquidity.base);
        
        setPool({
          reserveCR7: cr7Reserve,
          reserveWLD: wldReserve,
          k: cr7Reserve * wldReserve
        });
      }
    } catch (error) {
      console.error(`Erro ao buscar dados do par:`, error);
      setPriceError(`Falha ao carregar preços. Tentando novamente...`);
      setTimeout(fetchPairData, 5000);
    } finally {
      setLoadingPrices(false);
    }
  };

  useEffect(() => {
    fetchPairData();
    const interval = setInterval(fetchPairData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPriceData = () => {
    if (!pool || pool.reserveCR7 === 0 || pool.reserveWLD === 0) return { price: 0, change: 0 };
    
    const price = pool.reserveWLD / pool.reserveCR7;
    const change = pairData ? parseFloat(pairData.priceChange.h24) : 0;
    
    return { price, change };
  };

  const { price: cr7Price, change: priceChange24h } = getPriceData();

  const displayPrice = () => {
    if (!cr7Price) return "0";
    return formatValue(cr7Price);
  };

  const calculateReceiveAmount = () => {
    if (!tradeAmount || !pool || pool.reserveCR7 === 0 || pool.reserveWLD === 0) return "0";
    
    const amountIn = parseFloat(tradeAmount);
    if (amountIn <= 0) return "0";
    
    const minhaTaxa = amountIn * 0.007;
    const amountAfterMinhaTaxa = amountIn - minhaTaxa;
    
    if (tradeType === "buy") {
      const numerator = pool.reserveCR7 * amountAfterMinhaTaxa * 997;
      const denominator = pool.reserveWLD * 1000 + amountAfterMinhaTaxa * 997;
      const amountOut = numerator / denominator;
      return formatValue(amountOut);
    } else {
      const numerator = pool.reserveWLD * amountAfterMinhaTaxa * 997;
      const denominator = pool.reserveCR7 * 1000 + amountAfterMinhaTaxa * 997;
      const amountOut = numerator / denominator;
      return formatValue(amountOut);
    }
  };

  // Função principal para lidar com compra/venda
  const handleTrade = () => {
    if (!tradeAmount) return;
    
    const amountIn = parseFloat(tradeAmount);
    if (amountIn <= 0) return;

    // Verificação do MiniKit antes de prosseguir
    try {
      if (!MiniKit.isInstalled()) {
        toast.error(`❌ MiniKit não está instalado no World App`, {
          position: "top-center",
          autoClose: 5000,
          theme: "colored"
        });
        return;
      }

      toast.success(`✅ MiniKit reconhecido! Preparando transação...`, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored"
      });

      // Aqui você chamará a função de assinatura off-chain
      // iniciarProcessoDeAssinatura(tradeType, amountIn);

      console.log(`${tradeType.toUpperCase()} ${tradeAmount} CR7`);
      setTradeAmount("");

    } catch (error: any) {
      toast.error(`⚠️ Erro ao verificar MiniKit: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored"
      });
    }
  };

  const copyAddress = () => {
    if (userAddress && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(userAddress);
      setAddressCopied(true);
      toast.success(`Endereço copiado!`);
      setTimeout(() => setAddressCopied(false), 2000);
    } else if (!userAddress && userProfile?.username) {
      fetchUserAddress(userProfile.username);
      toast.info(`Buscando endereço, tente novamente em instantes`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    router.push("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />

      {/* Header */}
      <header className="relative z-10 sticky top-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl" />
        <div className="relative px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
              CR7 TOKEN
            </h1>
            <span className="text-xs text-green-300 font-semibold tracking-widest">
              {activeSection.toUpperCase()}
            </span>
          </div>

          {userProfile && userProfile.username && (
            <div className="flex items-center space-x-2">
              <div className="bg-green-500/20 px-3 py-1 rounded-lg border border-green-500/30 flex items-center space-x-2">
                <span className="text-green-300 text-sm font-medium">
                  {userProfile.username}
                </span>
                <button 
                  onClick={copyAddress} 
                  className="text-green-300 hover:text-white"
                  title="Copiar endereço"
                >
                  {addressCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 px-4 py-6 space-y-6 pb-24">
        {/* Seção de Airdrop */}
        {activeSection === "airdrop" && (
          <>
            <Card className="bg-white/95 text-white shadow-2xl border-0">
              <CardContent className="p-6 text-center">
                
                  {/* Imagem personalizada */}
  		<div className="mx-auto mb-4 flex justify-center">
    		  <img 
      		    src="/cr7_sticker_2_.ico" 
      		    alt="Airdrop"
      		    className="w-32 h-32 object-contain drop-shadow-lg"
    		  />
  		</div>
                <h2 className="text-xl text-blue-600 font-bold mb-2">Claim CR7 daily</h2>
                < ClaimButton />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {/* Card Available */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
                <CardContent className="p-4 text-center">
                  <Coins className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Available</h3>
                  
                  {loadingSupply ? (
                    <div className="animate-pulse">
                      <div className="h-6 w-24 bg-gray-200 rounded mx-auto mb-1"></div>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-blue-600">
                      {supplyData?.available.toLocaleString() || '0'} CR7
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Card Distributed */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">Distributed</h3>
                  
                  {loadingSupply ? (
                    <div className="animate-pulse">
                      <div className="h-6 w-24 bg-gray-200 rounded mx-auto mb-1"></div>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-purple-600">
                      {supplyData?.distributed.toLocaleString() || '0'} CR7
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Seção de Trading */}
        {activeSection === "trading" && (
          <div className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CR7/WLD Price</p>
                    {loadingPrices ? (
                      <div className="h-8 flex items-center">
                        <div className="animate-pulse bg-gray-200 rounded h-6 w-24" />
                      </div>
                    ) : priceError ? (
                      <p className="text-red-500 text-sm">{priceError}</p>
                    ) : (
                      <p className="text-2xl font-bold text-green-600">
                        {displayPrice()}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">24h Change</p>
                    {loadingPrices ? (
                      <div className="h-8 flex items-center justify-end">
                        <div className="animate-pulse bg-gray-200 rounded h-6 w-16" />
                      </div>
                    ) : priceError ? (
                      <p className="text-red-500 text-sm">-</p>
                    ) : (
                      <p
                        className={`text-lg font-semibold ${
                          priceChange24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {priceChange24h >= 0 ? "+" : ""}
                        {priceChange24h?.toFixed(2)}%
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex bg-gray-100 rounded-xl p-1">
              {["buy", "sell"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTradeType(type as "buy" | "sell")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    tradeType === type
                      ? type === "buy"
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-red-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {type === "buy" ? "BUY $CR7" : "SELL $CR7"}
                </button>
              ))}
            </div>

            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {tradeType === "buy" ? "Pay with WLD" : "Sell CR7"}
                      </label>
                      <span className="text-xs text-gray-500">
                        Amount: {tradeType === "buy" 
                          ? `${wldBalance.toFixed(2)} WLD` 
                          : `${cr7Balance.toFixed(2)} CR7`}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-4 pr-16 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-sm font-medium text-gray-500">
                          {tradeType === "buy" ? "WLD" : "CR7"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ArrowUpDown className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tradeType === "buy" ? "Receive CR7" : "Receive WLD"}
                    </label>
                    <div className="relative">
                      <div className="w-full p-4 pr-16 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-semibold text-gray-700">
                        {loadingPrices || priceError
                          ? "Carregando..."
                          : tradeAmount
                          ? calculateReceiveAmount()
                          : "0"}
                      </div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-sm font-medium text-gray-500">
                          {tradeType === "buy" ? "CR7" : "WLD"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {["25%", "50%", "75%", "MAX"].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => {
                          const maxAmount = tradeType === "buy" 
                            ? wldBalance 
                            : cr7Balance;
                          
                          const percentage = percent === "MAX" 
                            ? 100 
                            : Number.parseInt(percent);
                          
                          setTradeAmount(((maxAmount * percentage) / 100).toString());
                        }}
                        className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors"
                      >
                        {percent}
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={handleTrade}
                    disabled={!tradeAmount || loadingPrices || priceError || !pool}
                    className={`w-full py-4 text-lg font-bold transition-all ${
                      tradeType === "buy"
                        ? "bg-green-600 hover:bg-green-700 shadow-green-500/25"
                        : "bg-red-600 hover:bg-red-700 shadow-red-500/25"
                    } text-white shadow-lg`}
                  >
                    {loadingPrices || priceError
                      ? "Prices loading..."
                      : !pool
                        ? "Pool data unavailable"
                        : !tradeAmount
                          ? "Set the value"
                          : `${tradeType === "buy" ? "BUY" : "SELL"} $CR7`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  History
                </h3>
                <div className="space-y-2">
                  {[
                    { type: "buy", amount: "25.50", price: "1.2480", time: "2m atrás" },
                    { type: "sell", amount: "10.00", price: "1.2520", time: "5m atrás" },
                    { type: "buy", amount: "50.25", price: "1.2475", time: "8m atrás" },
                  ].map((trade, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${trade.type === "buy" ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span className="text-sm font-medium">{trade.amount} CR7</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{trade.price}</p>
                        <p className="text-xs text-gray-500">{trade.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl" />
        <div className="relative px-4 py-3 flex items-center justify-between">
          {[
            { id: "airdrop", icon: <Target className="w-5 h-5" />, color: "from-green-500 to-emerald-600", label: "AirDrop" },
            { id: "trading", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-500 to-pink-600", label: "Trading" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as Section)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                activeSection === s.id
                  ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.icon}
              <span className="text-xs font-medium">{s.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 text-red-300 hover:bg-red-500/10 hover:text-red-200"
          >
            <ExternalLink className="w-5 h-5 rotate-180" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </nav>

      <ToastContainer />
    </div>
  );
}

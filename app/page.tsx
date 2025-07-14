"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Target,
  Coins,
  Users,
  Shield,
  ExternalLink,
  User,
  FileText,
  CheckCircle,
} from "lucide-react"
//import Home from "../home"
//import { useAuthHandler } from '../components/AuthButton'
import { MiniKit } from "@worldcoin/minikit-js"
import { ClientContent } from '../components/ClientContent';

export default function CR7WhitepaperApp() {
  const [activeSection, setActiveSection] = useState<"login" | "whitepaper" | "dashboard">("whitepaper")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
  })
  const [isVerified, setIsVerified] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sections = [
    {
      id: "summary",
      title: "Executive Summary",
      icon: <Trophy className="w-5 h-5" />,
      content: (
        <p className="text-gray-700 leading-relaxed">
	  The $CR7 Token was created on World Chain, built to represent a winning and disciplined community mindset. 
          Inspired by the legacy of Cristiano Ronaldo — discipline, perseverance, and the relentless pursuit of 
          excellence — $CR7 goes beyond the typical memecoin narrative. It’s a long-term movement for those who believe 
          in meaningful financial growth, not just quick flips or short-term hype. Join a community driven by consistency,
          ambition, and the belief that greatness is earned — not given.
        </p>
      ),
    },
    {
      id: "vision",
      title: "Project Vision",
      icon: <Target className="w-5 h-5" />,
      content: (
        <p className="text-gray-700 leading-relaxed">
          To build one of the strongest and most committed holder communities in the crypto world — where every investor is a financial athlete training daily to achieve extraordinary results.
        </p>
      ),
    },
    {
      id: "mission",
      title: "Mission",
      icon: <Users className="w-5 h-5" />,
      content: (
        <ul className="text-gray-700 space-y-2">
          <li>• Build and promote a long-term holding culture in the crypto market</li>
          <li>• Provide tools and products that reward consistent and loyal holders</li>
          <li>• Turn token holders into fans of an ecosystem inspired by the legacy of CR7</li>
        </ul>
      ),
    },
    {
      id: "roadmap",
      title: "Roadmap",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">✅ Completed Phases</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Token launch</li>
              <li>• Official website release</li>
              <li>• Creation of official support channel</li>
              <li>• Launch of official social media channels</li>
              <li>• Reach 2000 WLD in liquidity pool and aim for listing on DEX</li>
              <li>• Token Burn Program</li>
              <li>• Launch of official mini app</li>
              <li>• Airdrop to active users</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">🔄 Upcoming & Pending Phases</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Trading section on miniapp</li>
              <li>• Token locking system development</li>
              <li>• Staking system with progressive APY</li>
              <li>• Bounty Program based on CR7 achievements</li>
              <li>• Official merchandise store</li>
              <li>• Collectible card album release</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "tokenomics",
      title: "Tokenomics",
      icon: <Coins className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2">Token Details</h4>
            <p className="text-sm">
              <strong>Name:</strong> $CR7 Token
            </p>
            <p className="text-sm">
              <strong>Total Supply:</strong> 100,000,000
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Distribution</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-50 to-transparent rounded">
                <span>Airdrop</span>
                <span className="font-medium text-blue-600">1%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-transparent rounded">
                <span>Holders Rewards</span>
                <span className="font-medium text-green-600">9%</span>
              </div>                            
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-green-50 to-transparent rounded">
                <span>Staking Rewards</span>
                <span className="font-medium text-green-600">10%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-purple-50 to-transparent rounded">
                <span>Burn Program</span>
                <span className="font-medium text-purple-600">10%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-orange-50 to-transparent rounded">
                <span>Team & Marketing</span>
                <span className="font-medium text-orange-600">10%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-cyan-50 to-transparent rounded">
                <span>Community</span>
                <span className="font-medium text-cyan-600">60%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "features",
      title: "Unique Features",
      icon: <Trophy className="w-5 h-5" />,
      content: (
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>• Inspired by Cristiano Ronaldo success</li>
          <li>• Real-life achievements integrated into bounty system</li>
          <li>• Exclusive collectible card album</li>
          <li>• Official store integration</li>
          <li>• Token lock & staking rewards</li>
          <li>• Burn program</li>
        </ul>
      ),
    },
    {
      id: "governance",
      title: "Governance",
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="text-gray-700 space-y-2">
          <p className="text-sm">A DAO system is planned for future development, enabling holders to vote on:</p>
          <ul className="text-sm space-y-1">
            <li>• Development fund allocation</li>
            <li>• Mini app features</li>
            <li>• Official store content</li>
            <li>• Burn events</li>
          </ul>
        </div>
      ),
    },
    {
      id: "risks",
      title: "Risks",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>• High volatility typical of memecoins</li>
          <li>• Dependency on roadmap execution</li>
          <li>• Potential technical vulnerabilities</li>
        </ul>
      ),
    },
  ]

  //const { onClick, isPending } = useAuthHandler()

  const LoginPage = () => (
    
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pb-24">
        <Card className="w-full max-w-sm bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg animate-pulse" />
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                Access CR7World
              </h1>
              <p className="text-gray-600 text-sm">Verify to access CR7World</p>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">SECURE</span>
              </div>
              <div className="w-px h-3 bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-purple-600 font-medium">CR7 TOKEN</span>
              </div>
            </div>


            {/* Verify Button */}
    <div className="bg-white text-black min-h-full p-5">
      <ClientContent />
    </div>

            {/* Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 mb-2">Access CR7World</p>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )

  const WhitepaperPage = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Technological Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Floating Hexagons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-blue-400/20 rotate-45"
              style={{
                width: "60px",
                height: "60px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Circuit Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              d="M50,50 L150,50 L150,150 L250,150 L250,250 L350,250"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M100,350 L200,350 L200,250 L300,250 L300,150 L350,150"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />

        {/* Particle Network */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Professional Header */}
      <div className="relative z-10 sticky top-0">
        {/* Background with advanced blur and gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        {/* Animated border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Content */}
        <div className="relative px-6 py-5">
          {/* Top row with status indicators */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60" />
                <div className="w-1 h-1 bg-blue-400 rounded-full opacity-30" />
              </div>
              <span className="text-xs text-blue-300">100%</span>
            </div>
          </div>

          {/* Main title section */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              {/* Enhanced trophy with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-lg animate-pulse" />
                <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-500 p-2 rounded-xl shadow-lg">
                  <Trophy className="w-6 h-6 text-yellow-900" />
                </div>
              </div>

              {/* Title with advanced styling */}
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent tracking-tight">
                  $CR7 TOKEN
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400" />
                  <span className="text-xs text-blue-300 font-semibold tracking-widest uppercase">Whitepaper</span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400" />
                </div>
              </div>

              {/* Blockchain icon */}
              <div className="relative">
                <div
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Subtitle with tech elements */}
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-blue-200 font-medium">Blockchain Technology Document</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${(i + 3) * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom tech bar */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-xs text-cyan-300">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-xs text-purple-300">Verified</span>
              </div>
            </div>

            <div className="text-xs text-gray-400 font-mono">
              {new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Animated tech lines */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-6 space-y-4 pb-24">
        {sections.map((section) => (
          <Card
            key={section.id}
            className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 hover:shadow-blue-500/10 transition-all duration-300"
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-blue-600 p-2 bg-blue-50 rounded-lg">{section.icon}</div>
                  <h2 className="font-semibold text-gray-900">{section.title}</h2>
                </div>
                <div className="p-1 rounded-full bg-gray-100">
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </button>

              {expandedSections[section.id] && (
                <div className="px-4 pb-4 border-t border-gradient-to-r from-blue-100 to-cyan-100">
                  <div className="pt-4">{section.content}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Conclusion */}
        <Card className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white shadow-2xl border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 to-orange-500/90" />
          <CardContent className="relative z-10 p-6 text-center">
            <div className="relative">
              <Trophy className="w-12 h-12 mx-auto mb-4 drop-shadow-lg" />
              <div className="absolute inset-0 w-12 h-12 mx-auto bg-white/20 rounded-full blur-md animate-pulse" />
            </div>
            <h2 className="text-xl font-bold mb-3">Conclusion</h2>
            <p className="text-sm leading-relaxed opacity-95">
              The $CR7 Token is not about quick wins or small profits — its a solid and well-structured project, based on the principles of consistency, ambition, and the spirit of a legendary athlete.
            </p>
            <p className="font-bold mt-3 text-lg drop-shadow-md">Here, only those who think big will win big.</p>
          </CardContent>
        </Card>

        {/* Contact Links */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4 text-center">Official Links</h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 transition-all duration-300"
                onClick={() => window.open("https://cr7token.xyz", "_blank")}
              >
                <span>Website</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 transition-all duration-300"
                onClick={() => window.open("https://x.com/CR7TOKEN_WORLD", "_blank")}
              >
                <span>X (Twitter)</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 transition-all duration-300"
                onClick={() => window.open("mailto:support@cr7token.xyz")}
              >
                <span>Support Email</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Render active section */}
      {activeSection === "login" ? (
        <LoginPage />
      ) : activeSection === "whitepaper" ? (
        <WhitepaperPage />
      ) : (
        <Home
          onLogout={() => {
            setIsVerified(false)
            setActiveSection("whitepaper")
          }}
        />
      )}

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Navigation Content */}
        <div className="relative px-4 py-3">
          {!isVerified && (
            <div className="flex items-center justify-between">
              {/* Whitepaper Section */}
              <button
                onClick={() => setActiveSection("whitepaper")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === "whitepaper"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Whitepaper</span>
              </button>

              {/* Center Divider */}
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              </div>

              {/* Login Section */}
              <button
                onClick={() => setActiveSection("login")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === "login"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

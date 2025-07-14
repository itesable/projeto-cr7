"use client"

import { Card, CardContent } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { CheckCircle, Shield, User, Coins, Trophy, Target, ExternalLink } from "lucide-react"

interface HomeProps {
  onLogout: () => void
}

export default function Home({ onLogout }: HomeProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Same technological background */}
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
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-purple-400 font-medium">HUMAN</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60" />
                <div className="w-1 h-1 bg-blue-400 rounded-full opacity-30" />
              </div>
              <span className="text-xs text-blue-300">ONLINE</span>
            </div>
          </div>

          {/* Main title section */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              {/* Enhanced shield with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-lg animate-pulse" />
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Title with advanced styling */}
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent tracking-tight">
                  CR7 DASHBOARD
                </h1>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-green-400" />
                  <span className="text-xs text-green-300 font-semibold tracking-widest uppercase">
                    Verified Access
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-green-400" />
                </div>
              </div>

              {/* User icon */}
              <div className="relative">
                <div
                  className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Subtitle with tech elements */}
            <div className="flex items-center justify-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-green-200 font-medium">Authenticated Portal</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-green-400 rounded-full animate-pulse"
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
          <div className="h-full bg-gradient-to-r from-transparent via-green-400/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 px-4 py-6 space-y-6 pb-24">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-2xl border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/90 to-teal-500/90" />
          <CardContent className="relative z-10 p-6 text-center">
            <div className="relative mb-4">
              <CheckCircle className="w-12 h-12 mx-auto drop-shadow-lg" />
              <div className="absolute inset-0 w-12 h-12 mx-auto bg-white/20 rounded-full blur-md animate-pulse" />
            </div>
            <h2 className="text-xl font-bold mb-2">Welcome to CR7 Token!</h2>
            <p className="text-sm opacity-95 leading-relaxed">
              Access to exclusive CR7 Token features and dashboard is now available.
            </p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-blue-600 mb-2">
                <Coins className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Token Balance</h3>
              <p className="text-2xl font-bold text-blue-600">0 CR7</p>
              <p className="text-xs text-gray-500 mt-1">Ready to earn</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-purple-600 mb-2">
                <Trophy className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Rewards</h3>
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-xs text-gray-500 mt-1">Achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4 text-center">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg transition-all duration-300"
                onClick={() => console.log("Navigate to AirDrop")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Claim AirDrop</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
                onClick={() => console.log("Navigate to Trading")}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Start Trading</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Account Created</p>
                  <p className="text-xs text-gray-500">Welcome to CR7 Token ecosystem</p>
                </div>
                <span className="text-xs text-gray-400">Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Security Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Account Security</span>
                </div>
                <span className="text-xs text-blue-600 font-medium">PROTECTED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Navigation for Home */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-2xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Navigation Content */}
        <div className="relative px-4 py-3">
          <div className="flex items-center justify-between">
            {/* AirDrop Section */}
            <button className="flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25">
              <Target className="w-5 h-5" />
              <span className="text-xs font-medium">AirDrop</span>
            </button>

            {/* Trading Section */}
            <button
              onClick={() => console.log("Navigate to Trading")}
              className="flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 text-blue-200 hover:bg-white/10 hover:text-white"
            >
              <Coins className="w-5 h-5" />
              <span className="text-xs font-medium">Trading</span>
            </button>

            {/* Logout Section */}
            <button
              onClick={onLogout}
              className="flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-300 text-red-300 hover:bg-red-500/10 hover:text-red-200"
            >
              <ExternalLink className="w-5 h-5 rotate-180" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          </div>
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

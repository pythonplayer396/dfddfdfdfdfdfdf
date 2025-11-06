'use client'

import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const navLinks = session ? [
    { href: '/dashboard/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ] : []

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-discord-blurple to-discord-fuchsia rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">FxG</span>
            </div>
            <span className="text-xl font-bold hidden sm:block gradient-text">
              FxG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {session && (
              <span className="text-gray-400 mr-2">
                Welcome, {session.user?.name}
              </span>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-discord-blurple/20 transition-all duration-300 text-gray-300 hover:text-white"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-discord-dark transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-discord-blurple/20 transition-all duration-300 text-gray-300 hover:text-white"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

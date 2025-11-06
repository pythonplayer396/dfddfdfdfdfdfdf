import { Github, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-discord-dark border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">FakePixel X Giveaways</h3>
            <p className="text-gray-400">
              Your premier Discord community for amazing giveaways and events. Join us today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by FakePixel X Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

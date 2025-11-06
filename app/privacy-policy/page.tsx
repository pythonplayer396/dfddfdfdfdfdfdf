export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
              <p>When you apply for a staff position, we collect:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Discord username and ID</li>
                <li>Email address</li>
                <li>Application responses</li>
                <li>Discord profile information (via OAuth2)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Process your staff application</li>
                <li>Contact you regarding your application status</li>
                <li>Maintain application records</li>
                <li>Improve our application process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Data Storage</h2>
              <p>
                Your application data is stored securely and is only accessible to authorized administrators.
                We retain application data for record-keeping purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Discord OAuth2</h2>
              <p>
                We use Discord OAuth2 for authentication. By logging in, you authorize us to access your
                basic Discord profile information (username, avatar, email). We do not access your messages
                or other private Discord data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Request access to your application data</li>
                <li>Request deletion of your application</li>
                <li>Withdraw your application at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Contact</h2>
              <p>
                For privacy-related questions or requests, please contact us through our Discord server.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

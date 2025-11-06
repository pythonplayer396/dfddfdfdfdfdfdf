export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-discord-dark border border-white/10 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this staff application portal, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. Eligibility</h2>
              <p>To apply for a staff position, you must:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Have a valid Discord account</li>
                <li>Be a member of the FakePixel X Giveaways Discord server</li>
                <li>Meet the minimum requirements for the position you're applying for</li>
                <li>Provide accurate and truthful information in your application</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Application Process</h2>
              <p>
                All applications are reviewed by our administration team. We reserve the right to accept or deny
                any application at our discretion. Application decisions are final.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Submit false or misleading information</li>
                <li>Submit multiple applications for the same position</li>
                <li>Attempt to access unauthorized areas of the portal</li>
                <li>Harass or spam administrators regarding your application</li>
                <li>Share your application status publicly before official announcement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Account Security</h2>
              <p>
                You are responsible for maintaining the security of your Discord account. Any activity
                performed through your account will be considered your responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the portal
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Disclaimer</h2>
              <p>
                This application portal is provided "as is" without warranties of any kind. We are not
                liable for any damages arising from your use of this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Contact</h2>
              <p>
                For questions about these terms, please contact us through our Discord server.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

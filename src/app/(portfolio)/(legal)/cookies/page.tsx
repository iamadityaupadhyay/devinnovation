import PolicyLayout from "../../components/Layout/PolicyLayout";

export default function CookiePolicy() {
  return (
    <PolicyLayout title="Cookie Policy">
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-700 mt-6">1. What Are Cookies</h3>
        <p>
          Cookies are small text files stored on your device when you access our website. They help
          us provide a better user experience and understand how our services are being used.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">2. How We Use Cookies</h3>
        <p>
          Devinvo uses cookies to:
        </p>
        <ul>
          <li>Remember your preferences</li>
          <li>Analyze site traffic and usage patterns</li>
          <li>Improve our services</li>
          <li>Provide personalized content</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">3. Types of Cookies We Use</h3>
        <p>
          We use both session cookies (which expire when you close your browser) and persistent cookies
          (which stay on your device until they expire or you delete them).
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">4. Managing Cookies</h3>
        <p>
          You can control or delete cookies through your browser settings. However, disabling cookies
          may affect your ability to use certain features of our website.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">5. Changes to This Policy</h3>
        <p>
          We may update this Cookie Policy periodically. The "Last Updated" date at the top of this
          page will reflect the most recent changes.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">6. Contact Us</h3>
        <p>
          For questions about our Cookie Policy, contact us at trackode.ai@gmail.com.
        </p>
      </div>
    </PolicyLayout>
  );
}
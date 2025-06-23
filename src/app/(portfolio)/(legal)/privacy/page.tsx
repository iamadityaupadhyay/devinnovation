import PolicyLayout from "../../components/Layout/PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-700 mt-6">1. Information We Collect</h3>
        <p>
          At Devinvo, we collect information that you provide directly to us when you use our services.
          This may include your name, email address (including trackode.ai@gmail.com for support inquiries),
          and other contact or identifying information.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">2. How We Use Your Information</h3>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Send you technical notices, updates, and security alerts</li>
          <li>Monitor and analyze trends, usage, and activities</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">3. Data Security</h3>
        <p>
          We implement appropriate technical and organizational measures to protect the security of your
          personal information. However, please be aware that no security measures are perfect or impenetrable.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">4. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. The updated date at the top of this page
          will reflect the most recent changes. Your continued use of our services after any changes
          constitutes your acceptance of the new Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">5. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us at trackode.ai@gmail.com.
        </p>
      </div>
    </PolicyLayout>
  );
}
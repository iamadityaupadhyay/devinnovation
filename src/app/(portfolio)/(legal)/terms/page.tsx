import PolicyLayout from "../../components/Layout/PolicyLayout";

export default function TermsOfService() {
  return (
    <PolicyLayout title="Terms of Service">
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-700 mt-6">1. Acceptance of Terms</h3>
        <p>
          By accessing or using Devinvo's services, you agree to be bound by these Terms of Service.
          If you disagree with any part of the terms, you may not access the service.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">2. Service Description</h3>
        <p>
          Devinvo provides mobile and web application development services. We reserve the right to
          modify or discontinue our services at any time without notice.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">3. User Responsibilities</h3>
        <p>
          You agree not to:
        </p>
        <ul>
          <li>Use our services for any illegal purpose</li>
          <li>Violate any laws in your jurisdiction</li>
          <li>Infringe upon our intellectual property rights</li>
          <li>Attempt to gain unauthorized access to our systems</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">4. Limitation of Liability</h3>
        <p>
          Devinvo shall not be liable for any indirect, incidental, special, consequential or punitive
          damages resulting from your use of or inability to use our services.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">5. Governing Law</h3>
        <p>
          These Terms shall be governed by the laws of India without regard to its conflict of law provisions.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">6. Contact Information</h3>
        <p>
          For any questions about these Terms, please contact us at trackode.ai@gmail.com.
        </p>
      </div>
    </PolicyLayout>
  );
}
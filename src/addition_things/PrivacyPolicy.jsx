export const PrivacyPolicy = () => (
    <div className="mt-15 min-h-screen bg-white">
        <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
                Privacy & Policy
            </h2>

            {/* Intro */}
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                At ShopSphere, we respect your privacy and are committed to protecting your personal data. We only collect information necessary to process your orders and enhance your shopping experience.
            </p>

            {/* Data Collection */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                What Information We Collect
            </h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                <li>Name, email address, and contact information</li>
                <li>Shipping and billing address</li>
                <li>Order history and preferences</li>
                <li>Payment details (processed securely via third-party gateways)</li>
            </ul>

            {/* How It's Used */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                How We Use Your Data
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                Your data helps us process orders, improve our website, and personalize your experience. Occasionally, we may send promotional content — but you can opt out anytime.
            </p>

            {/* Third-Party Disclosure */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Third-Party Sharing
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                We never sell, trade, or rent your personal information to third parties. Trusted third-party services (e.g., payment processors, shipping partners) only receive limited necessary data to fulfill services.
            </p>

            {/* Email Preferences */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Promotional Emails
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                You may opt-out of promotional emails anytime by clicking the unsubscribe link at the bottom of the email or by contacting our support.
            </p>

            {/* Data Security */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Data Security
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                We implement strict security measures to keep your information safe. All transactions are encrypted, and personal details are stored securely in compliance with applicable data protection laws.
            </p>

            {/* Updates */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Policy Updates
            </h3>
            <p className="text-stone-600 mb-8 text-sm sm:text-base">
                We may update this policy occasionally. Please check this page periodically to stay informed about how we protect your information.
            </p>

        </div>
    </div>
);

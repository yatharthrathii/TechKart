export const TermsConditions = () => (
    <div className="mt-15 min-h-screen bg-white">
        <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
                Terms & Conditions
            </h2>

            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                By accessing and using TechKart, you agree to abide by our terms. These terms govern your use of our website and services.
            </p>

            {/* General Terms */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                General Terms
            </h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                <li>All content on this website is the property of TechKart.</li>
                <li>Prices and product availability are subject to change without notice.</li>
                <li>Users are responsible for maintaining confidentiality of their account information.</li>
                <li>Misuse of the website may lead to termination of services.</li>
            </ul>

            {/* User Responsibilities */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                User Responsibilities
            </h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                <li>You agree to provide accurate and current information at all times.</li>
                <li>You will not engage in fraudulent or illegal activity while using our platform.</li>
                <li>You must not attempt to gain unauthorized access to any part of the website or systems.</li>
            </ul>

            {/* Limitation of Liability */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Limitation of Liability
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                TechKart is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. All services are provided “as is” without warranties of any kind.
            </p>

            {/* Privacy Summary */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Privacy Policy Summary
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                Your privacy is important to us. We collect minimal user data to improve our services. Please refer to our full <span className="underline">Privacy Policy</span> for more details.
            </p>

            {/* Updates */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Updates to Terms
            </h3>
            <p className="text-stone-600 mb-8 text-sm sm:text-base">
                We reserve the right to modify these terms at any time. Continued use of the platform after changes indicates acceptance of the new terms.
            </p>

        </div>
    </div>
);

export const ReturnPolicy = () => (
    <div className="mt-15 min-h-screen bg-white">
        <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
                Return Policy
            </h2>

            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                We want you to love what you ordered. If you're not 100% satisfied, you can return most items within <strong>7 days</strong> of delivery for a full refund.
            </p>

            {/* Return Conditions */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Conditions for Return
            </h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                <li>Items must be unused and in original packaging.</li>
                <li>Include proof of purchase (invoice or order confirmation).</li>
                <li>Refunds will be credited to your original method of payment.</li>
                <li>Return shipping costs are the responsibility of the buyer unless the product was defective.</li>
            </ul>

            {/* How to Initiate a Return */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                How to Initiate a Return
            </h3>
            <p className="text-stone-600 mb-4 text-sm sm:text-base">
                To start a return, contact our support team at <span className="underline">support@techkart.com</span> with your order ID and reason for return. Our team will guide you through the process.
            </p>

            {/* Exceptions */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Exceptions
            </h3>
            <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                <li>Perishable goods (like food or flowers) cannot be returned.</li>
                <li>Personalized or made-to-order items are non-returnable.</li>
                <li>Items marked "final sale" cannot be returned.</li>
            </ul>

            {/* Processing Time */}
            <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                Refund Processing Time
            </h3>
            <p className="text-stone-600 mb-8 text-sm sm:text-base">
                Once we receive your returned item and inspect it, refunds are typically processed within 5–7 business days.
            </p>

        </div>
    </div>
);

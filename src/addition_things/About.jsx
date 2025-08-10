const About = () => {
    return (
        <div className="mt-15 min-h-screen bg-white">
            <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-6">
                    About Us
                </h2>

                {/* Intro */}
                <p className="text-stone-600 mb-4 text-sm sm:text-base">
                    Welcome to <strong>TechKart</strong> – your trusted online destination for premium gadgets and lifestyle tech. Since our inception, we've been driven by a simple goal: to make quality electronics accessible, affordable, and enjoyable for everyone.
                </p>

                {/* What we offer */}
                <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                    What We Offer
                </h3>
                <p className="text-stone-600 mb-4 text-sm sm:text-base">
                    From wireless audio devices to cutting-edge smartwatches, we handpick every product to meet the needs of modern consumers. Each item goes through a strict quality check to ensure it matches our high standards.
                </p>

                {/* Why choose us */}
                <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                    Why Shop With Us?
                </h3>
                <ul className="list-disc list-inside text-stone-600 space-y-2 text-sm sm:text-base mb-6">
                    <li>Competitive prices on latest tech</li>
                    <li>Fast and reliable shipping across India</li>
                    <li>Exceptional customer service support</li>
                    <li>Secure payment gateways</li>
                </ul>

                {/* Our Mission */}
                <h3 className="text-lg sm:text-xl font-semibold text-stone-700 mt-6 mb-2">
                    Our Mission
                </h3>
                <p className="text-stone-600 mb-4 text-sm sm:text-base">
                    To create a seamless online shopping experience where technology meets trust. We’re not just a store – we’re a community of gadget lovers building a smarter future together.
                </p>

            </div>
        </div>
    );
};

export default About;

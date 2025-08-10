import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [newsLetterEmail, setNewsLetterEmail] = useState("");

  const handleNewsLetterSubmit = (e) => {
    e.preventDefault();

    if (newsLetterEmail.trim() === "") {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("You're subscribed to our newsletter!");
    console.log(newsLetterEmail);

    setNewsLetterEmail("");
  };

  return (
    <section className="w-full bg-gradient-to-br from-stone-100 to-zinc-100 py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-stone-600 text-base md:text-lg mb-6">
          Subscribe for exclusive updates, latest drops, and early access to offers.
          <br className="hidden md:block" />
          Get <span className="font-semibold text-stone-900">10% OFF</span> on your first order!
        </p>

        <form
          onSubmit={handleNewsLetterSubmit}
          className="flex items-center justify-center gap-4"
        >
          <input
            type="email"
            value={newsLetterEmail}
            onChange={(e) => setNewsLetterEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full sm:w-auto flex-1 px-4 py-2 md:px-6 md:py-3 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-600"
            required
          />
          <button
            type="submit"
            className="bg-stone-800 text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-stone-700 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-stone-500 mt-4">
          No spam, unsubscribe anytime. Read our{" "}
          <a href="/privacy-policy" className="underline hover:text-stone-700">
            Privacy Policy
          </a>.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
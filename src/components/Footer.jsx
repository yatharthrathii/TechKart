import NewsLetter from "../addition_things/NewsLetter"

const Footer = () => {
  return (
    <>
      <NewsLetter />
      <footer className="bg-stone-900 text-stone-100 px-6 py-10 md:px-16">
        {/* Top Footer */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-stone-700 pb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-stone-400">
              TechKart is your one-stop shop for top-quality electronics and lifestyle gadgets.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-stone-400">123 Main Street, New Delhi, IN</p>
            <p className="text-sm text-stone-400">+91 XXXXX XXXXX</p>
            <p className="text-sm text-stone-400">support@techkart.com</p>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="hover:underline">Headphones</li>
              <li className="hover:underline">Smartwatch</li>
              <li className="hover:underline">Speakers</li>
              <li className="hover:underline">Wireless Earphone</li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy & Policy</a></li>
              <li><a href="/return" className="hover:underline">Return</a></li>
              <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold text-white">TechKart</div>
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} TechKart. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <h1 className="font-display text-6xl font-extrabold text-itouch-orange">404</h1>
    <p className="text-itouch-white/60">The page you're looking for doesn't exist.</p>
    <Link to="/" className="rounded-xl bg-itouch-orange px-6 py-2.5 font-semibold text-black hover:shadow-glow">
      Back to Home
    </Link>
  </div>
);

export default NotFound;

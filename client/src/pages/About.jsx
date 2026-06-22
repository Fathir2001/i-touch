import { Dumbbell, Gamepad2, Smartphone, ShieldCheck } from "lucide-react";

const pillars = [
  { icon: Dumbbell, title: "Sports & Sportswear", text: "Quality gear and apparel for cricket, football, badminton and more." },
  { icon: Gamepad2, title: "PS5 Gaming Zone", text: "Shooting, racing, multiplayer and tournament-ready gaming experiences." },
  { icon: Smartphone, title: "Mobile & Accessories", text: "Phones, chargers, earphones, covers and the latest mobile templates." },
  { icon: ShieldCheck, title: "Trusted Service", text: "Genuine products, fair prices, and friendly customer support." },
];

const About = () => (
  <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
    <div className="text-center">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">About i-Touch</h1>
      <p className="mx-auto mt-4 max-w-2xl text-itouch-white/70">
        i-Touch is a modern shop bringing together sports items, sportswear, an exciting PS5
        gaming zone, mobile phones, phone accessories, and mobile templates — all under one roof.
        We believe shopping for sports gear and tech should be simple, exciting, and trustworthy.
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-itouch-white/70">
        Whether you're gearing up for the next match, upgrading your phone, or looking for an
        adrenaline-filled gaming session, i-Touch is your one-stop touchpoint for sports, gaming,
        and mobile lifestyle.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {pillars.map((p) => (
        <div key={p.title} className="rounded-2xl border border-white/10 bg-itouch-surface p-6">
          <p.icon className="text-itouch-orange" size={28} />
          <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
          <p className="mt-1 text-sm text-itouch-white/60">{p.text}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 rounded-2xl border border-itouch-orange/30 bg-itouch-orange/5 p-6 text-center">
      <p className="font-display text-lg font-bold text-itouch-orange">Play. Shop. Connect.</p>
      <p className="mt-1 text-sm text-itouch-white/60">
        Your touchpoint for Sports, Gaming &amp; Mobile.
      </p>
    </div>
  </div>
);

export default About;

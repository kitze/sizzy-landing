"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content:
      "If you aren't using @sizzyapp to test your web projects, you've goofed. This app saves me so much time manually resizing windows and toggling dev tool settings - plus, synchronized scrolling is straight magic",
    author: "Brian Lovin",
    handle: "@brian_lovin",
    avatar: "https://pbs.twimg.com/profile_images/1423720946458963968/jI8O2FWE_400x400.jpg",
    featured: true,
  },
  {
    content:
      "Just bought a lifetime license to @thekitze's https://sizzy.co because it seems like a MUCH better dev browser than Chrome/Brave/etc. for typical development. Especially looking forward to 'sessions' allowing me to easily be logged in as different users simultaneously",
    author: "Kent C. Dodds",
    handle: "@kentcdodds",
    avatar: "https://pbs.twimg.com/profile_images/1780044012521254912/E48-pSDw_400x400.jpg",
    featured: true,
  },
  {
    content:
      "Before @sizzyapp: Damn, I forgot to test this on smaller screen sizes. *installed Sizzy* Now: Wow, looks great on all screen sizes! Let's push this to production!",
    author: "Stefan Natter",
    handle: "@natterstefan",
    avatar: "https://pbs.twimg.com/profile_images/1816847205036924928/MVWXR3o__400x400.jpg",
  },
  {
    content:
      "As a UX/UI Designer Sizzy helps me test the designs I receive from developers and save time testing on different layouts/screen sizes. Also, I can experiment with html/css directly and get back with very specific feedback to them.",
    author: "Manolis Papadakis",
    handle: "Software Engineer at NVIDIA",
    avatar: "https://ui-avatars.com/api/?name=MP&background=3f3f46&color=fff",
  },
  {
    content:
      "I've been using @sizzyapp for the past couple of days and damn, it feels good. Writing CSS doesn't make my blood boil anymore and testing changes in chrome feels like pounding nails with a screwdriver",
    author: "Matt",
    handle: "@veryspry",
    avatar: "https://ui-avatars.com/api/?name=M&background=52525b&color=fff",
  },
  {
    content:
      "I feel like @sizzyapp doesn't get enough love. It's an incredible app for web development. And only $7/mo it pays for itself many times over.",
    author: "Joe Flateau",
    handle: "@joeflateau",
    avatar: "https://ui-avatars.com/api/?name=JF&background=3f3f46&color=fff",
  },
  {
    content:
      "If anyone designs, tests and audits websites... @sizzyapp is just amazing... You can test a site or app across loads of devices/browsers in one click",
    author: "Sarah Tamsin",
    handle: "Web Dev & WordPress Specialist",
    avatar: "https://ui-avatars.com/api/?name=ST&background=52525b&color=fff",
  },
  {
    content:
      "Sizzy is a powerful selling tool. When we have a prospect who doesn't have a responsive site, when we show them their site on Sizzy, they are impressed and we look even more professional.",
    author: "Eric Dingler",
    handle: "Owner @ In Transit Studios",
    avatar: "https://ui-avatars.com/api/?name=ED&background=3f3f46&color=fff",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
  featured = false,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
  featured?: boolean;
}) => (
  <motion.div
    className={cn(
      "relative p-6 rounded-xl border transition-colors group",
      featured
        ? "bg-white/[0.04] border-white/[0.12] hover:border-white/20"
        : "bg-[#111] border-white/[0.06] hover:border-white/10"
    )}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -2 }}
  >
    {/* Quote icon */}
    <Quote className="absolute top-4 right-4 h-6 w-6 text-white/[0.06]" />

    {/* Content */}
    <p className="text-zinc-400 leading-relaxed mb-6 text-sm">{testimonial.content}</p>

    {/* Author */}
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.author}
        className="h-9 w-9 rounded-full object-cover border border-white/10"
      />
      <div>
        <div className="font-medium text-white text-sm">{testimonial.author}</div>
        <div className="text-xs text-zinc-600">{testimonial.handle}</div>
      </div>
    </div>
  </motion.div>
);

export const SizzyTestimonials = () => {
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const regularTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Loved by 10,000+ developers
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it. Here's what developers around the world say about Sizzy.
          </p>
        </motion.div>

        {/* Featured testimonials */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {featuredTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index}
              featured
            />
          ))}
        </div>

        {/* Regular testimonials */}
        <div className="grid md:grid-cols-3 gap-3">
          {regularTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index + 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

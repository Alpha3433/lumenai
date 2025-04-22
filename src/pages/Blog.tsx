
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "5 Mistakes to Avoid When Launching a Business",
    author: "Evelyn Sharp",
    date: "April 2025",
    content: (
      <>
        <p>
          Starting a business is thrilling—but it's easy to stumble. Here are five common pitfalls:
        </p>
        <ul className="list-disc ml-6 my-3 space-y-1">
          <li>Skipping market research. Talk to real people before you jump in!</li>
          <li>Ignoring your finances. Cash flow is boring—until you run out.</li>
          <li>Trying to do it all. Get help early, even if it's just advice from a friend.</li>
          <li>Not listening to customers. They're usually right (even if it's tough to hear).</li>
          <li>Hustling without rest. Burnout is real. Take breaks—you'll thank yourself.</li>
        </ul>
        <p>If you spot yourself in this list, don't stress! Every entrepreneur learns as they go.</p>
      </>
    ),
  },
  {
    title: "How to Write a Business Plan (And Actually Use It)",
    author: "Pat McCaffrey",
    date: "April 2025",
    content: (
      <>
        <p>
          A business plan is not just for investors—it's your GPS for growing your idea.
        </p>
        <p>
          Start simple: What problem are you solving? Who are your first customers? How will you reach them?
        </p>
        <p>
          Once it's on paper, use that plan! Update it as things change, and you'll always have a map for your journey.
        </p>
      </>
    ),
  },
  {
    title: "Finding Your First Customer: It’s Not Who You Expect",
    author: "Layla Jamison",
    date: "April 2025",
    content: (
      <>
        <p>
          Most entrepreneurs picture a massive launch—but often, your first customers are friends, family, or a contact you forgot about.
        </p>
        <p>
          Be ready to pitch what you do, everywhere you go. Your launch might be smaller than you'd hoped, but it's the start of something big!
        </p>
      </>
    ),
  },
];

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">From the Lumen AI Blog</h1>
        <div className="space-y-12">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-150">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                {post.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Blog;

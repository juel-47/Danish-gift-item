// BlogDetailPage.jsx
import React from "react";
import { Link, usePage } from "@inertiajs/react";

const BlogDetailPage = () => {
  const { blog, prevBlog, nextBlog } = usePage().props;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Calculate read time (approx 200 words per minute)
  const calculateReadTime = (text) => {
    if (!text) return "5 min read";
    const strippedText = text.replace(/<[^>]*>/g, "");
    const words = strippedText.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Get Initials for author avatar
  const getInitials = (name) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <div className="bg-linear-to-b from-red/10 to-transparent">
        <div className="container mx-auto px-4 pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
              <Link
                href="/blog"
                className="hover:text-red transition-colors"
              >
                ← Back to Blog
              </Link>
              <span className="text-gray">/</span>
              {blog.category && (
                <span className="bg-white px-3 py-1 rounded-full border border-gray">
                  {blog.category.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
              <span>•</span>
              <span>{blog.user?.name || "Admin"}</span>
              <span>•</span>
              <span>{calculateReadTime(blog.description)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {blog.image && (
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10 md:mb-16">
              <img
                src={`/storage/${blog.image}`}
                alt={blog.title}
                className="w-full h-auto object-cover aspect-video md:aspect-4/3 lg:aspect-video"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none prose-red lg:prose-xl">
            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
          </div>

          {/* Author Box */}
          <div className="mt-16 p-6 md:p-8 bg-white rounded-2xl border border-gray flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-20 h-20 rounded-full bg-red/10 flex items-center justify-center text-2xl font-bold text-red flex-shrink-0">
              {getInitials(blog.user?.name)}
            </div>
            <p className="text-xl font-bold text-gray-900">
              {blog.user?.name || "Admin"}
            </p>
          </div>

          {/* Pagination / Next & Previous (Exact matches your original design) */}
          <div className="mt-16 pt-10 border-t border-gray mb-10">
            <div className="grid md:grid-cols-2 gap-6">
              {prevBlog ? (
                <Link
                  href={`/blog/${prevBlog.slug}`}
                  className="group p-6 rounded-xl border border-gray hover:border-red transition-colors text-left"
                >
                  <div className="text-sm text-gray-500 mb-2">Previous Post</div>
                  <h4 className="font-medium text-gray-900 group-hover:text-red transition-colors">
                    {prevBlog.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}
              
              {nextBlog && (
                <Link
                  href={`/blog/${nextBlog.slug}`}
                  className={`group p-6 rounded-xl border border-gray hover:border-red transition-colors text-right md:text-right ${!prevBlog ? 'md:col-start-2' : ''}`}
                >
                  <div className="text-sm text-gray-500 mb-2">Next Post</div>
                  <h4 className="font-medium text-gray-900 group-hover:text-red transition-colors">
                    {nextBlog.title}
                  </h4>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

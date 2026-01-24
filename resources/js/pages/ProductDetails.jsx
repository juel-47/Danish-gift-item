 // ProductDetailsFull.jsx - Complete version with Customer Review Form
import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard'; 
import ImageZoom from "react-image-zooom";

const ProductDetailsFull = ({product}) => {
  console.log(product);
  // console.log(review);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Red');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Review Form States
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
 
  const product = {
    name: "Danish Flag Premium Polo T-Shirt",
    price: 799,
    oldPrice: 999,
    rating: 4.7,
    reviewCount: 342,
    sku: "DK-POLO-FLAG-001",
    shortDesc:
      "Classic Danish flag inspired polo t-shirt • Premium cotton • Comfort fit • Perfect for casual & travel wear",

    colors: [
      { name: "Red", hex: "#A60A07" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#0A1D37" },
      { name: "Black", hex: "#000000" },
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    images: {
      Red: ["/products/3.png", "/products/4.png", "/products/5.png"],
      White: ["/products/4.png", "/products/3.png", "/products/5.png"],
      Navy: ["/products/5.png", "/products/3.png", "/products/4.png"],
      Black: ["/products/3.png", "/products/4.png", "/products/5.png"],
    },

    description: `Made from 100% premium combed cotton (180-200 GSM) with excellent breathability and durability. 
    Features classic Danish flag design printed with eco-friendly, high-quality DTG printing that lasts wash after wash.
    Perfect for everyday casual wear, holidays in Denmark or as a thoughtful souvenir/gift.`,

    specifications: [
      { title: "Material", value: "100% Premium Combed Cotton" },
      { title: "Fabric Weight", value: "180-200 GSM" },
      { title: "Fit", value: "Regular / Comfort Fit" },
      { title: "Neck", value: "Ribbed Polo Collar" },
      { title: "Sleeves", value: "Short Sleeves" },
      { title: "Printing", value: "Direct-to-Garment (DTG)" },
      { title: "Care", value: "Machine wash cold, inside out" },
    ],

    features: [
      "Soft & breathable premium cotton",
      "Vibrant Danish flag design",
      "Reinforced collar & cuffs",
      "Side slits for comfort",
      "Tagless comfort neck label",
      "Pre-shrunk & colorfast",
    ],

    reviews: [
      {
        id: 1,
        name: "Lars Jensen",
        rating: 5,
        date: "15 Nov 2025",
        text: "Perfect quality! The Danish flag print is very vibrant and the fabric feels premium. Highly recommended!",
        verified: true,
      },
      {
        id: 2,
        name: "Maria Petersen",
        rating: 4,
        date: "02 Dec 2025",
        text: "Nice t-shirt, good fit. Colors are a bit darker than in the pictures but still beautiful.",
        verified: true,
      },
      {
        id: 3,
        name: "Ahmed Khan",
        rating: 5,
        date: "20 Dec 2025",
        text: "Bought as a souvenir for my friend in Copenhagen. He loved it! Fast delivery too.",
        verified: true,
      },
    ],

 
  };

  const currentImages = product.images[selectedColor] || product.images.Red;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewRating === 0 || !reviewText.trim() || !reviewName.trim()) {
      alert("Please fill all required fields and select a rating");
      return;
    }

    // In real application you would send this to backend/API
    console.log("New review submitted:", {
      rating: reviewRating,
      title: reviewTitle,
      text: reviewText,
      name: reviewName,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });

    // Show success message
    setReviewSubmitted(true);
    
    // Reset form
    setReviewRating(0);
    setReviewTitle('');
    setReviewText('');
    setReviewName('');
  };

   

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <Breadcrumb
          customItems={[
            { name: "Danish Souvenirs", url: "/souvenirs" },
            { name: "Apparel", url: "/souvenirs/apparel" },
          ]}
        />

        {/* ==================== MAIN PRODUCT SECTION ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden border border-gray shadow-sm  ">
              
              <ImageZoom
                src={currentImages[selectedImage]}  
                alt={`${product.name} - ${selectedColor}`}
                zoom="300"   
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`
                    aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${
                      selectedImage === idx
                        ? "border-red shadow-md scale-105"
                        : "border-gray hover:border-red-300"
                    }
                  `}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-6 self-start">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-red">
                    DKK {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      DKK {product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-700">{product.shortDesc}</p>
            </div>

            {/* Color Variant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setSelectedImage(0);
                    }}
                    className={`
                      w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${
                        selectedColor === color.name
                          ? "border-red scale-110 shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }
                    `}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Variant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-5 py-2.5 border rounded-md text-sm font-medium transition-all
                      ${
                        selectedSize === size
                          ? "border-red bg-red-50 text-red"
                          : "border-gray hover:border-red-300"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="pt-4 space-y-5">
              <div className="flex items-center gap-6">
                <label className="font-medium">Quantity:</label>
                <div className="flex border border-gray rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-11 flex items-center justify-center text-xl hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-16 flex items-center justify-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-11 flex items-center justify-center text-xl hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="
                  flex-1 bg-red text-white py-4 rounded-lg 
                  font-bold text-lg hover:bg-red-800 transition-colors
                "
                >
                  Add to Cart
                </button>
                <button
                  className="
                  flex-1 border-2 border-red text-red
                  py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors
                "
                >
                  Buy Now
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>✓ Free shipping on orders over DKK 499</p>
                <p>✓ 30 days easy return</p>
                <p>✓ Secure payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== TABS SECTION ==================== */}
        <div className="mt-12 md:mt-16">
          <div className="border-b border-gray">
            <nav className="flex flex-wrap gap-6 md:gap-10">
              {["description", "features", "specification", "shipping"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                    pb-3 px-1 font-medium text-lg transition-colors
                    ${
                      activeTab === tab
                        ? "border-b-2 border-red text-red"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-700">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red text-xl">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "specification" && (
              <div className="grid md:grid-cols-2 gap-6">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray"
                  >
                    <span className="font-medium text-gray-700">
                      {spec.title}
                    </span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-gray-700">
                <p>Delivery time: 3-7 working days in Denmark & EU</p>
                <p>Free shipping on orders above DKK 499</p>
                <p>30 days hassle-free return policy</p>
                <p>Track your order easily after purchase</p>
              </div>
            )}
          </div>
        </div>

        {/* ==================== CUSTOMER REVIEWS ==================== */}
        <div className="mt-16 border-t border-gray pt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews ({product.reviewCount})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl border border-gray shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-700 mb-4">"{review.text}"</p>

                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.name}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ==================== REVIEW SUBMISSION FORM ==================== */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-gray shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Write a Review
            </h3>

            {reviewSubmitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-green-700 mb-2">
                  Thank you for your review!
                </h4>
                <p className="text-gray-600">
                  Your feedback helps other customers make better decisions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                {/* Rating Stars */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 transition-colors ${
                            star <= reviewRating
                              ? "text-yellow-400"
                              : "text-gray-300 hover:text-yellow-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label
                    htmlFor="reviewTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Review Title (optional)
                  </label>
                  <input
                    type="text"
                    id="reviewTitle"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray rounded-lg focus:outline-none focus:border-red"
                    placeholder="Great quality Danish t-shirt!"
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label
                    htmlFor="reviewText"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Review *
                  </label>
                  <textarea
                    id="reviewText"
                    rows={5}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray rounded-lg focus:outline-none focus:border-red"
                    placeholder="What did you like or dislike about this product?..."
                    required
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="reviewName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="reviewName"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray rounded-lg focus:outline-none focus:border-red"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-red text-white px-8 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Your review will be published after moderation. We appreciate
                  honest feedback!
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ==================== RELATED PRODUCTS ==================== */}
        <div className="mt-16 border-t border-gray pt-12 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsFull;
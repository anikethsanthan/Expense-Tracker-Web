import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ProductCard from "../components/Cards/ProductCard";
import Footer from "../components/Footer/Footer";
import useGetQuery from "../hooks/getQuery.hook";

import { useSelector } from "react-redux";
import { apiUrls } from "../apis";

const HomePage = () => {
  const { getQuery, loading } = useGetQuery();
  const [products, setProducts] = useState([]);

  const userData = useSelector((state) => state.user);
  console.log("User Data redux:", userData);

  useEffect(() => {
    getQuery({
      url: apiUrls?.products.getAllProducts,
      onSuccess: (response) => {
        setProducts(response.products || []);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Products Data:", products);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-25"
      style={{
        background: "linear-gradient(135deg, #fefbf8 0%, #fce7f3 100%)",
      }}
    >
      <Header />

      {/* Hero Section - Bunny Bloom Theme */}
      <section className="relative h-96 md:h-[550px] overflow-hidden mx-4 md:mx-6 lg:mx-8 mt-6 mb-16 rounded-3xl shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/40 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Elegant beauty products with soft florals and natural botanicals"
          className="w-full h-full object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-gray-800 px-6">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-sm"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 700,
                color: "#ffffff",
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              Bunny Bloom
            </h1>
            <p
              className="text-xl md:text-2xl mb-6 drop-shadow-sm opacity-95"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 500,
                color: "#f8fafc",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Where gentle meets gorgeous - bloom into your best self
            </p>
            <button className="bg-white/95 backdrop-blur-sm text-rose-800 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 hover:text-rose-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-pink-200/50">
              Start Your Beauty Journey
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Bunny Bloom Values */}
      <section className="mx-4 md:mx-6 lg:mx-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌸</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 600,
                color: "#a3906a",
              }}
            >
              Pure & Natural
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Quicksand", fontWeight: 400 }}
            >
              Gentle formulations inspired by nature, as pure as bunny fur
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🐰</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 600,
                color: "#a3906a",
              }}
            >
              Bunny Approved
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Quicksand", fontWeight: 400 }}
            >
              Never tested on animals, always cruelty-free and ethical
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 600,
                color: "#a3906a",
              }}
            >
              Soft Care
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Quicksand", fontWeight: 400 }}
            >
              Tender care for your skin, as gentle as a bunny's touch
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pb-16">
        {/* Section Header - Bunny Bloom Style */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "Quicksand",
              fontWeight: 700,
              color: "#a3906a",
            }}
          >
            🌸 Pure Beauty Collection
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Quicksand", fontWeight: 400 }}
          >
            Discover gentle skincare products that bloom with your natural
            beauty
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-300 to-rose-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Products section */}
        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md w-full h-[520px] border border-pink-100 animate-pulse"
              >
                <div className="w-full h-64 bg-pink-100 rounded-t-xl"></div>
                <div className="p-5">
                  <div className="h-6 bg-pink-100 rounded mb-2"></div>
                  <div className="h-4 bg-pink-50 rounded mb-3"></div>
                  <div className="h-4 bg-pink-50 rounded mb-3 w-3/4"></div>
                  <div className="h-6 bg-pink-100 rounded mb-4 w-1/2"></div>
                  <div className="h-12 bg-pink-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          /* Products grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <ProductCard
                  product={product}
                  image={product.image}
                  title={product.name}
                  useCase={product.description}
                  rating={product.rating || 4.5}
                  price={product.productDetails[0].price}
                  stock={product.productDetails[0].stock}
                />
              </div>
            ))}
          </div>
        ) : (
          /* No products message */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌸</div>
            <h3
              className="text-2xl font-semibold mb-2"
              style={{
                fontFamily: "Quicksand",
                fontWeight: 600,
                color: "#a3906a",
              }}
            >
              No Products Available
            </h3>
            <p
              className="text-gray-600"
              style={{ fontFamily: "Quicksand", fontWeight: 400 }}
            >
              We're currently updating our beautiful collection. Please check
              back soon!
            </p>
          </div>
        )}

        {/* Newsletter Section - Bunny Bloom Style */}
        <section className="mt-20 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-8 md:p-12 text-center border border-pink-100">
          <div className="mb-4">
            <span className="text-4xl">🐰💌</span>
          </div>
          <h3
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "Quicksand",
              fontWeight: 700,
              color: "#a3906a",
            }}
          >
            Join Our Bunny Family
          </h3>
          <p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Quicksand", fontWeight: 400 }}
          >
            Get gentle beauty tips, exclusive bunny-approved products, and pure
            skincare secrets delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/80"
              style={{ fontFamily: "Quicksand", fontWeight: 400 }}
            />
            <button className="bg-rose-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Join Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

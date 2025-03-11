import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
// import { useProductStore } from "../stores/useProductStore";
// import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/iphone", name: "Iphone", imageUrl: "/iphone1.jpg" },
  { href: "/samsung", name: "Samsung", imageUrl: "/samsung1.jpg" },
  { href: "/google-pixel", name: "Google Pixel", imageUrl: "/pixel1.jpg" },
  { href: "/oppo", name: "Oppo", imageUrl: "/oppo1.jpg" },
  { href: "/xiaomi", name: "Xiaomi", imageUrl: "/Xiaomi1.webp" },
  { href: "/sony", name: "Sony", imageUrl: "/sony1.jpeg" },
];

const HomePage = () => {
  // const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  // useEffect(() => {
  //   fetchFeaturedProducts();
  // }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-yellow-200 mb-4">
          Explore Our Phones
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest smartphones
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {/* {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )} */}
      </div>
    </div>
  );
};
export default HomePage;

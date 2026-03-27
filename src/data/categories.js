export const categories = [
  { slug: "electronics", name: "Electronics", icon: "💻", color: "#1565C0", bg: "#E3F2FD", count: 12, banner: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800", subcategories: ["Smartphones", "Laptops", "Televisions", "Audio", "Cameras", "Accessories"] },
  { slug: "fashion", name: "Fashion", icon: "👗", color: "#880E4F", bg: "#FCE4EC", count: 8, banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800", subcategories: ["Mens Clothing", "Womens Clothing", "Footwear", "Accessories", "Sportswear"] },
  { slug: "home", name: "Home & Furniture", icon: "🛋️", color: "#E65100", bg: "#FFF3E0", count: 10, banner: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", subcategories: ["Furniture", "Decor", "Bedding", "Lighting", "Appliances"] },
  { slug: "beauty", name: "Beauty", icon: "💄", color: "#AD1457", bg: "#FCE4EC", count: 8, banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800", subcategories: ["Face", "Eyes", "Lips", "Skincare", "Fragrances"] },
  { slug: "sports", name: "Sports & Fitness", icon: "🏋️", color: "#1B5E20", bg: "#E8F5E9", count: 7, banner: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", subcategories: ["Gym Equipment", "Sports Gear", "Outdoor", "Yoga", "Cycling"] },
  { slug: "books", name: "Books", icon: "📚", color: "#4A148C", bg: "#F3E5F5", count: 5, banner: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800", subcategories: ["Fiction", "Non-Fiction", "Self Help", "Business", "Children"] },
  { slug: "toys", name: "Toys & Baby", icon: "🧸", color: "#F57F17", bg: "#FFFDE7", count: 6, banner: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800", subcategories: ["Building Toys", "Outdoor Toys", "Board Games", "Baby Products", "Educational"] },
  { slug: "kitchen", name: "Kitchen", icon: "🍳", color: "#BF360C", bg: "#FBE9E7", count: 4, banner: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", subcategories: ["Cookware", "Small Appliances", "Storage", "Bakeware", "Dining"] },
];

export const getCategoryBySlug = (slug) =>
  categories.find(c => c.slug === slug);

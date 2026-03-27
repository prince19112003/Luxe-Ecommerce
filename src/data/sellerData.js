// Seller mock data used for the seller portal
export const sellerMockData = {
  store: {
    name: "TechZone Official",
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=100",
    tagline: "Premium Electronics at Best Prices",
    category: "Electronics",
    gstin: "27AAPFU0939F1ZV",
    pan: "AAPFU0939F",
    rating: 4.7,
    reviews: 1240,
    totalProducts: 12,
    totalOrders: 843,
    totalRevenue: 2847500,
    pendingOrders: 15,
    address: "Plot 44, Tech Park, Pune, Maharashtra 411045",
    bankAccount: { bank: "HDFC Bank", ifsc: "HDFC0001234", account: "XXXX XX89 2314" },
  },
  revenueData: [
    { day: "Mon", revenue: 45000 }, { day: "Tue", revenue: 62000 },
    { day: "Wed", revenue: 38000 }, { day: "Thu", revenue: 87000 },
    { day: "Fri", revenue: 115000 }, { day: "Sat", revenue: 143000 },
    { day: "Sun", revenue: 98000 },
  ],
  orders: [
    { id: "LX-84521", product: "Samsung Galaxy S24 Ultra", buyer: "Arjun Mehta", date: "2026-03-25", amount: 124999, status: "delivered", items: 1 },
    { id: "LX-84308", product: "MacBook Air M3", buyer: "Priya Sharma", date: "2026-03-24", amount: 114900, status: "shipped", items: 1 },
    { id: "LX-84102", product: "Logitech MX Master 3S", buyer: "Rahul Singh", date: "2026-03-23", amount: 7995, status: "processing", items: 2 },
    { id: "LX-83990", product: "JBL Flip 6", buyer: "Anjali Patel", date: "2026-03-22", amount: 9499, status: "pending", items: 1 },
    { id: "LX-83745", product: "OnePlus 12 5G", buyer: "Vikram Nair", date: "2026-03-21", amount: 64999, status: "delivered", items: 1 },
    { id: "LX-83621", product: "Samsung QLED TV", buyer: "Deepak Joshi", date: "2026-03-20", amount: 54999, status: "cancelled", items: 1 },
  ],
  payments: [
    { id: "SET-001", date: "2026-03-20", amount: 284750, status: "settled", orders: 24 },
    { id: "SET-002", date: "2026-03-13", amount: 198400, status: "settled", orders: 17 },
    { id: "SET-003", date: "2026-03-06", amount: 312600, status: "settled", orders: 28 },
  ],
};

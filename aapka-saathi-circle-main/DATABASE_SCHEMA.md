# Aapka Saathi - Firebase Firestore Database Schema

## Overview
This document outlines the complete database schema for the Aapka Saathi circular economy platform. All collections are designed for real-time updates and scalability.

## Collections

### 1. vendors
**Purpose:** Store vendor profile and credit information

```javascript
{
  uid: "vendor_001",                    // Firebase Auth UID (Primary Key)
  name: "राजू कुमार",                   // Vendor's full name
  phone: "+919876543210",               // Phone number (for authentication)
  stallName: "राजू के छोले भटूरे",       // Business name
  stallAddress: "सेक्टर 15, गुड़गांव",   // Physical location
  saathiCreditLimit: 5000,              // Maximum credit allowed (Number)
  saathiCreditBalance: 2500,            // Current available credit (Number)
  wasteCreditsBalance: 180,             // Earned waste credits (Number)
  registrationDate: Timestamp,          // When vendor joined platform
  lastOrderDate: Timestamp,             // Most recent order timestamp
  totalOrders: 45,                      // Lifetime order count
  totalWasteCreditsEarned: 520,         // Lifetime waste credits earned
  preferredLanguage: "hi",              // UI language preference
  isActive: true,                       // Account status
  
  // Business metrics
  avgMonthlyOrderValue: 12500,          // Analytics for credit decisions
  creditScore: 8.5,                     // 1-10 rating for credit expansion
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Indexes:**
- phone (for login)
- saathiCreditBalance (for credit queries)
- isActive + lastOrderDate (for active vendor analytics)

---

### 2. products
**Purpose:** Master catalog of available products

```javascript
{
  productId: "prod_onion_001",          // Unique product identifier (Primary Key)
  name: "प्याज",                        // Product name in Hindi
  nameEnglish: "Onions",               // English name for internal use
  price: 25,                           // Current price per unit (Number)
  unit: "kg",                          // Unit of measurement
  imageURL: "/assets/onions.jpg",      // Product image path
  category: "vegetables",              // Product category
  subCategory: "root_vegetables",      // Detailed classification
  isAvailable: true,                   // Current availability
  seasonalPricing: {                   // Dynamic pricing rules
    winter: 22,
    summer: 28,
    monsoon: 32
  },
  nutritionalInfo: {                   // For customer education
    calories: 40,
    fiber: 1.7,
    vitaminC: 7.4
  },
  wastageRate: 0.12,                   // Expected wastage percentage
  
  // Inventory management
  minOrderQuantity: 1,
  maxOrderQuantity: 100,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Indexes:**
- category + isAvailable
- price (for sorting)
- name (for search functionality)

---

### 3. orders
**Purpose:** Track all vendor orders and their lifecycle

```javascript
{
  orderId: "ORD_20241126_001",          // Unique order identifier (Primary Key)
  vendorId: "vendor_001",              // Reference to vendors collection
  vendorName: "राजू कुमार",             // Denormalized for quick display
  
  // Order items
  items: [                             // Array of ordered products
    {
      productId: "prod_onion_001",
      name: "प्याज",
      quantity: 5,
      unit: "kg",
      pricePerUnit: 25,
      totalPrice: 125
    },
    {
      productId: "prod_tomato_001", 
      name: "टमाटर",
      quantity: 3,
      unit: "kg",
      pricePerUnit: 30,
      totalPrice: 90
    }
  ],
  
  // Financial details
  subtotal: 215,                       // Sum of all item prices
  wasteCreditsUsed: 50,               // Credits applied to this order
  finalAmount: 165,                    // Amount charged to Saathi Credit
  totalCost: 215,                      // Original cost before credits
  
  // Order lifecycle
  status: "pending",                   // pending | confirmed | assigned | delivered | cancelled
  orderDate: Timestamp,               // When order was placed
  expectedDeliveryDate: Timestamp,     // Promised delivery time
  actualDeliveryDate: Timestamp,       // When actually delivered
  
  // Assignment and delivery
  driverId: "driver_001",             // Assigned driver
  driverName: "सुरेश कुमार",           // Driver name for display
  deliveryAddress: "सेक्टर 15, गुड़गांव", // Delivery location
  deliveryInstructions: "गेट नंबर 2 के पास", // Special delivery notes
  
  // Quality and feedback
  vendorRating: 4.5,                  // Vendor's rating of service (1-5)
  qualityIssues: [],                  // Array of reported issues
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Analytics fields
  orderSource: "mobile_app",          // How order was placed
  fulfillmentTime: 180                // Minutes from order to delivery
}
```

**Indexes:**
- vendorId + orderDate (for vendor order history)
- status + orderDate (for operations dashboard)
- driverId + status (for driver assignments)

---

### 4. mfc_users
**Purpose:** Store MFC staff authentication and role information

```javascript
{
  uid: "mfc_manager_001",             // Firebase Auth UID (Primary Key)
  name: "Priya Sharma",               // Full name
  email: "priya@mfc.aapkasaathi.com", // Email for login
  role: "manager",                    // manager | driver | admin
  phone: "+919876543211",             // Contact number
  
  // Role-specific data
  permissions: [                      // Array of permissions
    "view_orders",
    "assign_drivers", 
    "generate_reports"
  ],
  
  // Driver-specific fields (if role === "driver")
  vehicleNumber: "HR01AB1234",        // Vehicle registration
  licenseNumber: "DL123456789",       // Driving license
  currentLocation: {                  // Real-time location
    latitude: 28.4595,
    longitude: 77.0266,
    lastUpdated: Timestamp
  },
  
  // Performance metrics
  ordersHandled: 150,                 // Total orders processed
  wastePickupsCompleted: 45,          // Waste collections done
  averageRating: 4.7,                 // Customer rating
  
  // Account status
  isActive: true,
  lastLogin: Timestamp,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Indexes:**
- email (for login)
- role + isActive (for role-based queries)
- currentLocation (geospatial queries for driver assignment)

---

### 5. waste_pickups
**Purpose:** Log all waste collection events and credit generation

```javascript
{
  pickupId: "WP_20241126_001",        // Unique pickup identifier (Primary Key)
  vendorId: "vendor_001",             // Reference to vendor
  vendorName: "राजू कुमार",            // Denormalized vendor name
  driverId: "driver_001",             // Driver who collected waste
  driverName: "सुरेश कुमार",          // Driver name for display
  
  // Waste details
  weightInKg: 3.5,                    // Weight of collected waste (Number)
  wasteType: "organic_mixed",         // Type classification
  wasteComposition: {                 // Breakdown of waste types
    vegetablePeels: 2.1,
    rottenProduce: 1.2,
    leaves: 0.2
  },
  
  // Credit calculation
  creditsEarned: 18,                  // ₹5 per kg = 3.5 * 5 = ₹17.5, rounded to ₹18
  creditRate: 5,                      // Rate per kg at time of pickup
  
  // Pickup details
  pickupAddress: "सेक्टर 15, गुड़गांव", // Collection location
  pickupDate: Timestamp,              // When waste was collected
  processingPartner: "GreenCycle Ltd", // Who processes the waste
  
  // Processing tracking
  processingStatus: "collected",       // collected | in_transit | processed | converted
  animalFeedGenerated: 2.8,           // Kg of animal feed produced
  conversionEfficiency: 0.8,          // Waste to feed conversion rate
  
  // Financial tracking
  vendorCreditBalance: 198,           // Vendor's balance after this pickup
  mfcRevenue: 7,                      // MFC earnings from this pickup (₹2/kg)
  processorPayment: 10.5,             // Payment to waste processor (₹3/kg)
  
  // Quality metrics
  wasteQuality: "good",               // good | fair | poor
  contaminationLevel: 0.05,           // Percentage of non-organic material
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Analytics
  seasonalFactor: 1.2,                // Waste generation multiplier
  weatherImpact: "normal"             // Weather effect on waste quality
}
```

**Indexes:**
- vendorId + pickupDate (for vendor waste history)
- driverId + pickupDate (for driver performance)
- processingStatus (for operations tracking)

---

## Additional Collections for Scale

### 6. transactions
**Purpose:** Financial audit trail for all credit movements

```javascript
{
  transactionId: "TXN_20241126_001",
  vendorId: "vendor_001",
  type: "waste_credit_earned",        // waste_credit_earned | credit_used | credit_topped_up
  amount: 18,
  balanceBefore: 162,
  balanceAfter: 180,
  relatedOrderId: "ORD_20241126_001", // If applicable
  relatedPickupId: "WP_20241126_001", // If applicable
  description: "Waste pickup - 3.5kg organic waste",
  timestamp: Timestamp
}
```

### 7. analytics_daily
**Purpose:** Aggregated daily metrics for business intelligence

```javascript
{
  date: "2024-11-26",
  totalOrders: 127,
  totalRevenue: 25340,
  totalWasteCreditsIssued: 890,
  averageOrderValue: 199.5,
  wasteCollectedKg: 178,
  activeVendors: 89,
  newVendorSignups: 3,
  topProducts: ["प्याज", "टमाटर", "आलू"],
  avgDeliveryTime: 185                // minutes
}
```

---

## Security Rules

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Vendors can only access their own data
    match /vendors/{vendorId} {
      allow read, write: if request.auth != null && request.auth.uid == vendorId;
    }
    
    // MFC users can access based on role
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (request.auth.uid in resource.data.allowedUsers || 
         request.auth.token.role in ['manager', 'driver']);
      allow write: if request.auth != null && 
        request.auth.token.role in ['manager', 'driver'];
    }
    
    // Products are read-only for vendors
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.role == 'admin';
    }
    
    // Waste pickups - drivers can create, vendors can read their own
    match /waste_pickups/{pickupId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.vendorId || 
         request.auth.token.role in ['manager', 'driver']);
      allow create: if request.auth != null && 
        request.auth.token.role == 'driver';
    }
  }
}
```

---

## Cloud Functions

### Key Functions for Real-time Updates

1. **onWastePickupCreated**
   - Trigger: New document in waste_pickups
   - Action: Update vendor's wasteCreditsBalance atomically
   - Notification: Send push notification to vendor

2. **onOrderStatusChange** 
   - Trigger: Order status field update
   - Action: Notify vendor and update analytics
   - Integration: Update driver location tracking

3. **dailyAnalyticsAggregation**
   - Trigger: Scheduled function (daily at midnight)
   - Action: Calculate and store daily metrics
   - Cleanup: Archive old transaction data

This schema supports real-time operations, maintains data consistency, and scales to support thousands of vendors across multiple cities.
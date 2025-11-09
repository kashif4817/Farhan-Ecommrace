# Farhan Ainak Point - E-commerce Website

A modern, responsive e-commerce website built with Next.js for showcasing and ordering eyewear products.

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add products with variants to cart
- **WhatsApp Integration**: Direct order placement via WhatsApp
- **Smooth Animations**: Hover effects and transitions for better UX
- **Category Navigation**: Horizontal scrollable category list
- **Product Details**: Quick view modal for product information
- **Persistent Cart**: Cart data saved in localStorage

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **State Management**: React Context API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

To get these credentials:
1. Go to [Supabase](https://supabase.com)
2. Create a new project or select your existing project
3. Go to Project Settings > API
4. Copy the `Project URL` and `anon public` key

### 3. Database Setup

Your database should already have the following tables:
- `menus`
- `categories`
- `products`
- `product_variants`

Make sure your Supabase Row Level Security (RLS) policies allow public read access:

```sql
-- Enable read access for categories
CREATE POLICY "Enable read access for all users" ON "public"."categories"
FOR SELECT USING (true);

-- Enable read access for products
CREATE POLICY "Enable read access for all users" ON "public"."products"
FOR SELECT USING (true);

-- Enable read access for product_variants
CREATE POLICY "Enable read access for all users" ON "public"."product_variants"
FOR SELECT USING (true);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
my-app/
├── app/
│   ├── category/
│   │   └── [id]/
│   │       └── page.js         # Category detail page
│   ├── globals.css             # Global styles
│   ├── layout.js               # Root layout with providers
│   └── page.js                 # Home page
├── components/
│   ├── Badge.js                # Reusable badge component
│   ├── Button.js               # Reusable button component
│   ├── Card.js                 # Reusable card component
│   ├── CartSidebar.js          # Shopping cart sidebar
│   ├── CategoryScroll.js       # Horizontal category scroller
│   ├── Navbar.js               # Navigation bar
│   └── ProductCard.js          # Product card with variants
├── contexts/
│   └── CartContext.js          # Shopping cart state management
├── lib/
│   └── supabase.js             # Supabase client configuration
└── .env.local                  # Environment variables
```

## Key Components

### Navbar
- Sticky navigation with logo
- Shopping cart icon with item count
- Mobile-responsive menu

### CategoryScroll
- Horizontal scrollable category list
- Smooth scroll navigation
- Hover effects and animations

### ProductCard
- Product image with hover zoom
- Variant selection
- Quick view modal
- Add to cart functionality
- Discount badges

### CartSidebar
- Slide-in cart panel
- Quantity adjustment
- Price calculation with discounts
- WhatsApp order integration

## WhatsApp Integration

When users click "Order via WhatsApp", the app:
1. Formats all cart items into a message
2. Calculates totals with discounts
3. Opens WhatsApp with pre-filled message
4. Sends to: 03171640134

Message format:
```
*New Order from Farhan Ainak Point*

*Order Details:*

1. *Product Name (Variant)*
   Quantity: 2
   Price: Rs. 1500.00 each
   Subtotal: Rs. 3000.00

*Total Amount: Rs. 3000.00*

Please confirm this order. Thank you!
```

## Customization

### Colors
Edit `components/` files to change the color scheme. Current theme uses:
- Primary: Blue (600-700)
- Success: Green
- Danger/Warning: Red/Yellow

### Animations
Customize animations in `app/globals.css`:
- `.animate-fadeIn`: Fade in effect
- `.animate-slideIn`: Slide in effect
- `.animate-spin`: Loading spinner

### WhatsApp Number
Change the WhatsApp number in `components/CartSidebar.js`:
```javascript
const whatsappNumber = '03171640134'; // Change this
```

## Mobile Optimization

The site is optimized for mobile users with:
- Touch-friendly buttons and links
- Responsive grid layouts (1 col mobile, 2 cols tablet, 3+ cols desktop)
- Mobile-first navigation
- Optimized images and lazy loading

## Troubleshooting

### Products not showing
- Check Supabase connection in `.env.local`
- Verify RLS policies allow public read access
- Check browser console for errors

### Cart not persisting
- Check browser localStorage is enabled
- Clear localStorage and try again

### WhatsApp link not working
- Verify phone number format (remove spaces/dashes)
- Check if WhatsApp is installed on mobile

## Support

For issues or questions, contact: 03171640134

:💻 NextLap | Full-Stack Electronics MarketplaceNextLap is a modern, high-performance e-commerce platform built for high-end electronics. Originally a specialized laptop store, it has been refactored into a modular marketplace capable of handling various categories like Gaming Mice, Mechanical Keyboards, and PC Components.The project features a Django REST Framework backend and a React (Vite) frontend, styled with Tailwind CSS.🏗️ System ArchitectureNextLap follows a decoupled architecture where the Frontend and Backend communicate via a secure REST API.The frontend handles the state management and UI rendering, while the Django backend manages the database ORM, authentication logic, and media storage.🌟 Features🛒 Shopping ExperienceUnified Product Engine: A single "Product" model that supports multiple categories (Laptops, Accessories, etc.).Dynamic Gallery: Support for multiple high-resolution images per product using an Inline Admin relationship.Real-time Cart: Authenticated shopping cart that persists across sessions.🔐 Security & AuthGoogle OAuth 2.0: Secure social login integration via Google Identity Services.Token-Based Auth: Uses Django's TokenAuthentication for secure API requests.Protected Routes: Only logged-in users can manage their cart or view profile details.🎨 UI/UXResponsive Grid: A fully fluid layout that looks great on mobile, tablet, and 4K displays.Optimized Loading: Skeleton states and graceful error handling for a smooth user experience.🛠️ Technology StackLayerTechnologyPurposeFrontendReact 18 (Vite)High-speed component-based UIBackendDjango 5.xRobust business logic and ORMAPIDjango REST FrameworkClean JSON endpoints for the frontendStylingTailwind CSSUtility-first, responsive designAuthGoogle Cloud ConsoleSocial identity providerDatabaseSQLite / PostgreSQLRelational data storage📂 Folder StructurePlaintextNextLap/
├── backend/                # Django Core
│   ├── nextlap/            # Project Settings & Root URLs
│   ├── nextapp/            # Application Logic (Models, Views, Serializers)
│   ├── media/              # Locally stored product images
│   └── manage.py           # Project Manager
└── frontend/               # React (Vite) Core
    ├── src/
    │   ├── components/     # Navbar, LaptopCard, Footer, etc.
    │   ├── pages/          # Home, ProductDetail, Profile
    │   ├── api.js          # Global Axios instance
    │   └── App.jsx         # Main Router & State
    └── tailwind.config.js  # Styling overrides
🚀 Installation & Local Setup1. PrerequisitesPython 3.10+Node.js 18+Google Cloud Client ID (for Auth)2. Backend SetupBashcd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
3. Frontend SetupBashcd frontend
npm install
npm run dev
📡 API ReferenceEndpointMethodAuthDescription/api/products/GETNoFetch all available electronics/api/products/{id}/GETNoFetch specific item + gallery images/api/google-login/POSTNoExchange Google ID for Django Token/api/cart/GETYesRetrieve user's current cart/api/cart/POSTYesAdd item to user's cart📝 Roadmap[ ] Integration with SSLCommerz for payments.[ ] Category-based filtering on the Home page.[ ] Transitioning Media storage to Cloudinary for Vercel deployment.[ ] Admin Dashboard for Sales analytics.

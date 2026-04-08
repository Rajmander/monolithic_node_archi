monolith-node/
├── src/
│   ├── config/
│   │   └── env.js                 # environment variables (.env, .env.development, etc.)
│   │
│   ├── loaders/
│   │   ├── db.js                  # MongoDB connection
│   │   └── express.js             # middleware loader (cors, morgan, json)
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js     # login/register for admin & customer
│   │   │   ├── auth.service.js        # auth logic
│   │   │   ├── admin.middleware.js    # admin auth middleware
│   │   │   └── customer.middleware.js # customer auth middleware
│   │   │
│   │   ├── user/                       # customer-facing APIs
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.routes.js
│   │   │
│   │   └── admin/                      # admin panel
│   │       ├── admin.model.js
│   │       ├── admin.controller.js
│   │       ├── admin.service.js
│   │       ├── admin.repository.js
│   │       ├── admin.routes.js
│   │       ├── middlewares/
│   │       │   ├── auth.middleware.js  # admin JWT auth
│   │       │   └── roleAuth.js         # role-based access
│   │       └── modules/                # admin submodules
│   │           ├── customers/
│   │           │   ├── customer.model.js
│   │           │   ├── customer.controller.js
│   │           │   ├── customer.service.js
│   │           │   └── customer.routes.js
│   │           ├── products/
│   │           │   ├── product.model.js
│   │           │   ├── product.controller.js
│   │           │   ├── product.service.js
│   │           │   └── product.routes.js
│   │           ├── brands/
│   │           │   ├── brand.model.js
│   │           │   ├── brand.controller.js
│   │           │   ├── brand.service.js
│   │           │   └── brand.routes.js
│   │           └── settings/
│   │               ├── setting.model.js
│   │               ├── setting.controller.js
│   │               ├── setting.service.js
│   │               └── setting.routes.js
│   │
│   └── utils/
│       └── response.js                 # standardized success/error helpers
│
├── app.js                               # main express app
├── server.js                            # entry point, connect DB + start server
├── package.json
├── .env
├── .env.development
├── .env.production
└── .env.testing
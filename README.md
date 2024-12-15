# Tap To Connect

**Tap To Connect** is a modern web application built with Next.js that enables users to consolidate and manage all their social media profiles on a single, shareable page. The platform provides a sleek, user-friendly interface designed for simplicity and efficiency.

## 🚀 Key Features

-  **Comprehensive Profile Management**: Store, edit, and organize multiple social media profiles in a single location.
-  **Effortless Sharing**: Share your entire suite of social media profiles through a single, convenient link.
-  **Intuitive User Interface**: Experience a clean, modern, and fully responsive design for seamless usability.

## 🛠️ Technology Stack

-  **Framework**: [Next.js](https://nextjs.org/) — A leading React framework for production-grade applications.
-  **Styling**: [ShadCN UI](https://shadcn.dev/) — Customizable and accessible UI components.
-  **Database**: [MongoDB Atlas](https://account.mongodb.com) — For data storage and management.
-  **Image Management**: [Cloudinary](https://cloudinary.com/) — Cloud-based image storage and optimization.
-  **API Communication**: [Axios](https://axios-http.com/) — A promise-based HTTP client for streamlined API requests.
-  **Language**: TypeScript — A statically-typed superset of JavaScript.

## 📂 Project Structure

```
📦 Tap-To-Connect
├── 📁 public
├── 📁 src
│   ├── 📁 app          # Next.js app components
│   ├── 📁 components   # Reusable components
│   ├── 📁 lib          # Utility functions
│   ├── 📁 helpers      # Helper Functions / Methods
│   ├── 📁 hooks        # Costume Hooks
│   ├── 📁 types        # Type definitions
│   ├── 📁 model        # Model Definations
│   ├── 📁 schemas      # Defination of Schemas
│   ├── 📁 context      # Global state management
│   ├── 📁 utils        # Utility functions and helpers
│   └── 📁 api          # API request logic using Axios
├── 📄 .env             # Environment variables configuration
├── 📄 next.config.js   # Next.js configuration file
├── 📄 package.json     # Project metadata and dependencies
└── 📄 README.md        # Project documentation
```

## ⚙️ Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sourav0010/Tap-To-Connect.git
   cd Tap-To-Connect
   ```

2. **Install Required Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the required variables as shown below:

   ```
   RESEND
   CLIENT_URL
   MONOGO_URI
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   NEXTAUTH_SECRET
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

We welcome contributions from the community! Whether you'd like to report issues, suggest new features, or submit pull requests, please visit our [issues page](https://github.com/Sourav0010/Tap-To-Connect/issues) to get started.

## 🙌 Acknowledgements

Special thanks to the following technologies and libraries that made this project possible:

-  [Next.js](https://nextjs.org/) — For its robust framework and server-side rendering capabilities.
-  [Cloudinary](https://cloudinary.com/) — For providing cloud-based media management.
-  [ShadCN UI](https://shadcn.dev/) — For offering elegant, accessible UI components.

## 📞 Contact Information

For inquiries, suggestions, or feedback, feel free to get in touch via:

-  **GitHub**: [Sourav0010](https://github.com/Sourav0010)

We value your input and look forward to your contributions. Happy coding! 😊

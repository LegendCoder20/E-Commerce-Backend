# ClickNShop E-Commerce Project

A feature-rich, full-stack e-commerce application built with the MERN stack. This project is meticulously engineered for high performance and robust security, simulating a real-world online shopping experience with multi-level role-based access.

**➡️ Live Demo:** [**https://clicknshop-x7fk.onrender.com/**](https://clicknshop-x7fk.onrender.com/)

---

## ℹ️ About The Project

ClickNShop is more than just a standard e-commerce site; it's a comprehensive platform architected for scalability and security. It features a complete workflow from user registration and product browsing to a secure payment gateway, all governed by a powerful **Role-Based Access Control (RBAC)** system.

This project is separated into two repositories to maintain a clean and scalable structure:

- **Frontend Code (React):** [**https://github.com/LegendCoder20/E-Commerce-Frontend**](https://github.com/LegendCoder20/E-Commerce-Frontend)
- **Backend Code (Node.js):** [**https://github.com/LegendCoder20/E-Commerce-Backend**](https://github.com/LegendCoder20/E-Commerce-Backend)

---

- **Role-Based Access Control (RBAC):** Three distinct roles (User, Seller, Admin) with specific permissions, ensuring users only access what they are authorized to.
- **Full E-Commerce Workflow:** A seamless user journey from product discovery and cart management to secure checkout with **Razorpay**.
- **Seller Dashboard:** A dedicated dashboard for sellers to perform full **CRUD (Create, Read, Update, Delete)** operations on their own products.
- **Admin Oversight:** A password-protected admin panel for monitoring all users, sellers, and products across the platform.
- **Modern, Responsive UI:** Built with **Tailwind CSS**, the application is fully responsive and offers an excellent user experience on any device.

---

## 🚀 Performance Optimization

Performance is a core pillar of this project, ensuring a fast and smooth user experience.

- **Efficient Data Loading:** **Pagination** is implemented on the main products page. This prevents the client from loading the entire product database at once, drastically reducing initial load times and bandwidth usage.
- **Global State Management:** **Redux Toolkit** centralizes the application's state. This minimizes unnecessary API calls and component re-renders, leading to a snappier user interface.
- **Single Page Application (SPA):** As a React-based SPA, the application loads only a single HTML page. Subsequent navigation is handled dynamically, providing near-instant page transitions without full reloads.
- **Reusable Components:** The frontend is built with a modular approach, using reusable React components. This reduces code duplication and decreases the final bundle size.

---

## 🛡️ Security Measures

Security is paramount in an e-commerce application. ClickNShop incorporates multiple layers of protection.

- **Secure Authentication:** **JSON Web Tokens (JWT)** are used for stateless and secure authentication. This ensures that all protected routes and resources are only accessible to verified users and sellers.
- **Robust Backend Validation:** The **Zod** library is used for strict schema-based input validation on the backend. This is a critical defense against common vulnerabilities like NoSQL injection and invalid data entries _before_ they reach the database.
- **Strict Role-Based Authorization:** The API enforces strict authorization rules. A regular user cannot access seller or admin endpoints, preventing unauthorized data access and manipulation.
- **Secure Image Uploads:** Integration with **Cloudinary** offloads image management, providing secure and optimized hosting without exposing the server's file system.
- **Environment Variable Protection:** All sensitive credentials (Database URI, JWT Secret, API Keys) are stored securely in environment variables and are not exposed in the codebase.

---

### Contact

Aryan - [**github.com/LegendCoder20**](https://github.com/LegendCoder20)

Linkedin - [**https://www.linkedin.com/in/aryan-manjarekar-/**](https://www.linkedin.com/in/aryan-manjarekar-/)

# Helpdesk Ticketing System - Development Summary

## **📌 What We Did Today**
We successfully set up the **Helpdesk Ticketing System** using **Node.js, EJS as a template engine, Passport.js for authentication, and PostgreSQL for database management.** Key tasks accomplished:

1. **Project Initialization**  
   - Created a Node.js project and installed essential dependencies.
   - Set up the project structure for scalability and maintainability.

2. **Database Connection Setup**  
   - Configured PostgreSQL using Sequelize ORM.
   - Ensured automatic table creation via model definitions.

3. **User Authentication with Passport.js**  
   - Implemented **registration, login, and session management**.
   - Used **bcrypt** for password hashing.
   - Established Express-session for session persistence.

4. **Landing Page & Basic UI**  
   - Created a **visually appealing home page** with EJS templates.
   - Added static assets (CSS for styling).

5. **Debugging & Fixes**  
   - Resolved **database connection errors**.
   - Fixed **redirect issues** in form submissions.
   - Ensured correct initialization of Passport authentication strategies.

---

## **⚠️ Challenges Faced & Solutions**
1. **Database Table Not Found Error**  
   - **Issue:** PostgreSQL threw an error saying **“relation ‘Users’ does not exist”**.  
   - **Solution:** Used Sequelize’s `sequelize.sync()` to ensure automatic table creation.

2. **Passport.js Authentication Error**  
   - **Issue:** **Unknown authentication strategy 'local'** error.  
   - **Solution:** Made sure **Passport was correctly initialized** in the main `server.js` file.

3. **Registration Page Refresh Issue**  
   - **Issue:** Form **refreshed but didn’t redirect after submission**.  
   - **Solution:** Ensured Express parsed incoming request data properly and correctly handled errors.

---

## **🔑 How Authentication Works**
1. **Registration Process**  
   - User submits their **username and password**.
   - Password is **hashed** before storing in PostgreSQL.
   - User is **redirected to the login page** upon successful registration.

2. **Login Process**  
   - User enters their credentials.
   - Passport **checks the database for the username**.
   - The submitted password is **compared** with the stored hash.
   - If credentials are valid, a **session is created**.

3. **Session Management**  
   - Using **Express-session**, users remain logged in across requests.
   - The session holds user details, allowing personalized interactions.

4. **Logout Mechanism**  
   - Logging out destroys the session and redirects the user back to the home page.




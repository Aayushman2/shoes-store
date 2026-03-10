import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  /* ------------------ INITIAL SESSION ------------------ */

  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [error, setError] = useState("");

  /* ------------------ LOAD LOCAL STORAGE ------------------ */

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("authUser");
      const savedUsers = localStorage.getItem("registeredUsers");

      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }

     if (savedUsers) {
    setRegisteredUsers(JSON.parse(savedUsers));
} else {
    // Seed default admin
    const defaultAdmin = [
      {
        username: "admin",
        password: "admin123",
        email: "admin@shoestore.com",
        role: "admin",
      },
      {
         username: "ayush",
        password: "123456",
        email: "aayus@shoestore.com",
        role: "user",
      }
    ];

    setRegisteredUsers(defaultAdmin);
    localStorage.setItem("registeredUsers", JSON.stringify(defaultAdmin));
}
    } catch (err) {
      console.error("LocalStorage parse error:", err);
    }
  }, []);

  /* ------------------ REGISTER ------------------ */

  const register = (username, email, password) => {
    setError("");

    const userExists = registeredUsers.some(
      (u) => u.username === username || u.email === email
    );

    if (userExists) {
      setError("Username or email already exists.");
      return false;
    }

    const newUser = {
      username,
      email,
      password,
      role: "customer",
    };

    const updatedUsers = [...registeredUsers, newUser];

    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    const sessionUser = {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem("authUser", JSON.stringify(sessionUser));

    return true;
  };

  /* ------------------ LOGIN ------------------ */

  const login = (username, password) => {
    setError("");

    const user = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return { success: false };
    }

    const sessionUser = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem("authUser", JSON.stringify(sessionUser));

    return { success: true, role: user.role };
  };

  /* ------------------ LOGOUT ------------------ */

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authUser");
  };

  /* ------------------ CONTEXT VALUE ------------------ */

  const value = {
    currentUser,
    error,
    login,
    register,
    logout,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------ HOOK ------------------ */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
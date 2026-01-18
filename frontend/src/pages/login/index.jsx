import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { styles } from "./style";

// Move icons OUTSIDE the component
const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire("Missing Fields", "Please fill all fields", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          didClose: () => navigate("/dashboard"),
        });
      } else {
        Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Login failed. Please try again.", "error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.pageContainer}>
      {/* LEFT IMAGE SECTION */}
      <div style={styles.leftSection}>
        <div style={styles.imagePlaceholder}></div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* EMAIL */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  style={styles.input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8a9a5b",
                    transition: "color 0.2s ease",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* FOOTER LINKS */}
            <div style={styles.footerLinks}>
              <a href="/forgot-password" style={styles.link}>
                Forgot Password?
              </a>
              <span style={{ color: "#999", margin: "0 6px" }}>•</span>
              <a href="/register" style={styles.link}>
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
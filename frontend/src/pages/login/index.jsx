import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./style";

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
      alert("Please fill all fields");
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
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.pageContainer}>

      {/* LEFT IMAGE SECTION */}
      <div style={styles.leftSection}>
        <div style={styles.imagePlaceholder}>
        </div>
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

              <div style={styles.passwordContainer}>
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
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
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
              <span style={styles.footerSeparator}>•</span>
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

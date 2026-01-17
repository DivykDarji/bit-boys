import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { styles } from "./style";

// SVG Eye Icon
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// SVG Eye Off Icon
const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      Swal.fire({
        icon: "warning",
        title: "Password Required",
        text: "Please enter a new password",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
      return;
    }

    setLoading(true);

    const res = await fetch(
      "http://localhost:5000/api/identity/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been reset successfully",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
        didClose: () => {
          navigate("/login");
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: data.message || "Failed to reset password",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Enter your new password</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <div style={styles.passwordInputWrapper}>
              <input
                style={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>
          </div>

          <button
            style={styles.submitBtn}
            disabled={loading}
            onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.submitBtnHover)}
            onMouseLeave={(e) => !loading && Object.assign(e.target.style, styles.submitBtn)}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login - Centered */}
        <div style={styles.centerLink}>
          <button
            onClick={() => navigate("/login")}
            style={styles.backLink}
            onMouseEnter={(e) => {
              e.target.style.color = "#e6c84c";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#8a9a5b";
              e.target.style.textDecoration = "none";
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
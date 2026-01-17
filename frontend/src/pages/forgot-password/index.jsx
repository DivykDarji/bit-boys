import React, { useState } from "react";
import Swal from "sweetalert2";
import { styles } from "./style";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/identity/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent Successfully",
          text: "Check your email for password reset link. Link expires in 1 hour.",
          background: "#faf9f7",
          color: "#3d3d3d",
          confirmButtonColor: "#8a9a5b",
        });
        setEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to send reset email. Please try again.",
          background: "#faf9f7",
          color: "#3d3d3d",
          confirmButtonColor: "#8a9a5b",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to connect to server. Please try again later.",
        background: "#faf9f7",
        color: "#3d3d3d",
        confirmButtonColor: "#8a9a5b",
      });
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              style={styles.input}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => {
                Object.assign(e.target.style, styles.inputFocus);
              }}
              onBlur={(e) => {
                Object.assign(e.target.style, styles.input);
              }}
              onMouseEnter={(e) => {
                if (!e.target.matches(":focus")) {
                  Object.assign(e.target.style, styles.inputHover);
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.matches(":focus")) {
                  Object.assign(e.target.style, styles.input);
                }
              }}
            />
          </div>

          <button
            style={{
              ...styles.submitBtn,
              ...(loading ? styles.submitBtnDisabled : {}),
            }}
            type="submit"
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.submitBtnHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.submitBtn);
              }
            }}
            onMouseDown={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.submitBtnActive);
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.submitBtnHover);
              }
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login - Centered */}
        <div style={styles.centerLink}>
          <a
            href="/login"
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
          </a>
        </div>
      </div>
    </div>
  );
}
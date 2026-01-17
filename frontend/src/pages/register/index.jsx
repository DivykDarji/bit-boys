import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { styles } from "./styles";


const STORAGE_KEY = "register_session";


export default function RegisterPage() {
  const navigate = useNavigate();


  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  /* ================= OTP ================= */


  const sendOTP = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.gender ||
      !form.password ||
      !form.confirmPassword
    ) {
      Swal.fire("Missing Fields", "Please fill all fields", "warning");
      return;
    }


    if (form.password !== form.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }


    if (form.password.length < 8) {
      Swal.fire("Weak Password", "Password must be at least 8 characters long", "warning");
      return;
    }


    setLoading(true);


    const res = await fetch("http://localhost:5000/api/identity/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });


    const data = await res.json();
    setLoading(false);


    if (!data.success) {
      Swal.fire("Error", data.message, "error");
      return;
    }


    Swal.fire("OTP Sent", "Check your email", "success");
    setStep(2);
  };


  const verifyOTP = async () => {
    if (!otp) {
      Swal.fire("Enter OTP", "", "warning");
      return;
    }


    setLoading(true);


    const res = await fetch("http://localhost:5000/api/identity/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp }),
    });


    const data = await res.json();
    setLoading(false);


    if (!data.success) {
      Swal.fire("Invalid OTP", "", "error");
      return;
    }


    Swal.fire("Verified", "Proceed to face enrollment", "success");
    setStep(3);
  };


  /* ================= CAMERA ================= */


  const openCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };


  const capturePhoto = () => {
    if (photos.length >= 3) return;


    const canvas = canvasRef.current;
    const video = videoRef.current;


    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    canvas.getContext("2d").drawImage(video, 0, 0);
    const img = canvas.toDataURL("image/jpeg");


    setPhotos([...photos, img]);
  };


  const registerIdentity = async () => {
    if (photos.length !== 3) {
      Swal.fire("Capture 3 photos", "", "warning");
      return;
    }


    Swal.fire({
      icon: "success",
      title: "Registration Complete",
      didClose: () => navigate("/login"),
    });
  };


  /* ================= UI ================= */


  return (
    <div style={styles.pageContainer}>
      {/* LEFT IMAGE */}
      <div style={styles.leftSection}>
        <div style={styles.imagePlaceholder}></div>
      </div>


      {/* RIGHT FORM */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Register your Pehchaan identity</p>


          <div style={styles.form}>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input
                  style={styles.input}
                  placeholder="Full Name"
                  name="name"
                  onChange={handleChange}
                />
                <input
                  style={styles.input}
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />


                <select
                  style={styles.input}
                  name="gender"
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>


                <input
                  style={styles.input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />


                <input
                  style={styles.input}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                />


                <button
                  style={styles.submitBtn}
                  onClick={sendOTP}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </>
            )}


            {/* STEP 2 */}
            {step === 2 && (
              <>
                <input
                  style={styles.input}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />


                <button
                  style={styles.submitBtn}
                  onClick={verifyOTP}
                  disabled={loading}
                >
                  Verify OTP
                </button>
              </>
            )}


            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div style={styles.cameraBox}>
                  <strong>Face Enrollment</strong>


                  <video ref={videoRef} style={styles.video} />
                  <canvas ref={canvasRef} style={{ display: "none" }} />


                  <button style={styles.submitBtn} onClick={openCamera}>
                    Open Camera
                  </button>


                  <button style={styles.submitBtn} onClick={capturePhoto}>
                    Capture ({photos.length}/3)
                  </button>


                  <div style={styles.previewRow}>
                    {photos.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        style={styles.previewImg}
                      />
                    ))}
                  </div>
                </div>


                <button
                  style={styles.submitBtn}
                  onClick={registerIdentity}
                >
                  Register Identity
                </button>
              </>
            )}


            <div style={styles.footerLinks}>
              Already have an account?{" "}
              <span
                style={styles.link}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
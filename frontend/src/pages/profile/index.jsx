import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileStyles } from "./style";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    health: { bloodGroup: "", emergencyContact: "" },
    farm: { farmerId: "", landId: "" },
    city: { address: "", cityId: "" },
  });

  /* LOAD PROFILE */

  useEffect(() => {
    const loadProfile = async () => {
      const stored = localStorage.getItem("user");

      if (!stored) {
        navigate("/login");
        return;
      }

      const token = JSON.parse(stored).token;

      const res = await fetch("http://localhost:5000/api/identity/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const profile = data.profile || {};

        setForm({
          health: {
            bloodGroup: profile.health?.bloodGroup || "",
            emergencyContact: profile.health?.emergencyContact || "",
          },
          farm: {
            farmerId: profile.farm?.farmerId || "",
            landId: profile.farm?.landId || "",
          },
          city: {
            address: profile.city?.address || "",
            cityId: profile.city?.cityId || "",
          },
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const saveProfile = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;

    const res = await fetch("http://localhost:5000/api/identity/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert("Profile save failed");
    }
  };

  if (loading) {
    return <div style={{ padding: 80 }}>Loading profile...</div>;
  }

  const isProfileFilled =
    form.health.bloodGroup || form.farm.farmerId || form.city.address;

  return (
    <div style={profileStyles.page}>
      {/* HEADER */}
      <div style={profileStyles.header}>
        <h2 style={profileStyles.headerTitle}>Pehchaan</h2>

        <button
          onClick={() => navigate("/dashboard")}
          style={profileStyles.backBtn}
        >
          ← Back
        </button>
      </div>

      {/* CONTENT */}
      <div style={profileStyles.wrapper}>
        <div style={profileStyles.mainCard}>
          <h2 style={{ marginBottom: 24 }}>
            {isProfileFilled
              ? "Edit Identity Profile"
              : "Complete Identity Profile"}
          </h2>

          {/* HEALTH */}
          <div style={profileStyles.sectionCard}>
            <h3>Health Identity</h3>

            <input
              style={profileStyles.input}
              placeholder="Blood Group"
              value={form.health.bloodGroup}
              onChange={(e) =>
                handleChange("health", "bloodGroup", e.target.value)
              }
            />

            <input
              style={profileStyles.input}
              placeholder="Emergency Contact"
              value={form.health.emergencyContact}
              onChange={(e) =>
                handleChange("health", "emergencyContact", e.target.value)
              }
            />
          </div>

          {/* FARM */}
          <div style={profileStyles.sectionCard}>
            <h3>Farmer Identity</h3>

            <input
              style={profileStyles.input}
              placeholder="Farmer ID"
              value={form.farm.farmerId}
              onChange={(e) => handleChange("farm", "farmerId", e.target.value)}
            />

            <input
              style={profileStyles.input}
              placeholder="Land ID"
              value={form.farm.landId}
              onChange={(e) => handleChange("farm", "landId", e.target.value)}
            />
          </div>

          {/* CITY */}
          <div style={profileStyles.sectionCard}>
            <h3>City Identity</h3>

            <input
              style={profileStyles.input}
              placeholder="Address"
              value={form.city.address}
              onChange={(e) => handleChange("city", "address", e.target.value)}
            />

            <input
              style={profileStyles.input}
              placeholder="City ID"
              value={form.city.cityId}
              onChange={(e) => handleChange("city", "cityId", e.target.value)}
            />
          </div>

          <div style={profileStyles.actionBar}>
            <button style={profileStyles.saveBtn} onClick={saveProfile}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

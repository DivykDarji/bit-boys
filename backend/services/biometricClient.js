const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const BIOMETRIC_URL = process.env.BIOMETRIC_URL;

exports.enrollFace = async (userId, name, files) => {

  const form = new FormData();

  form.append("userId", userId);
  form.append("username", name);

  files.forEach(file => {
    form.append("images", fs.createReadStream(file.path));
  });

  const response = await axios.post(
    `${BIOMETRIC_URL}/enroll-face`,
    form,
    { headers: form.getHeaders(), timeout: 20000 }
  );

  return response.data;
};



exports.verifyFace = async (embedding, frames) => {

  try {

    const response = await axios.post(
      `${BIOMETRIC_URL}/verify-face`,
      { embedding, frames },
      {
        timeout: 20000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    return response.data;

  } catch (error) {

    console.error("Biometric verify error:",
      error.response?.data || error.message
    );

    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Biometric failed"
    };
  }
};

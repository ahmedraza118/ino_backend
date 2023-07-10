const config = require("config");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
// Configure Twilio
const client = twilio(
  config.get("twilio.accountSid"),
  config.get("twilio.authToken")
);

cloudinary.config({
  cloud_name: config.get("cloudinary.cloud_name"),
  api_key: config.get("cloudinary.api_key"),
  api_secret: config.get("cloudinary.api_secret"),
});

// const accountSid = config.get("twilio.accountSid");
// const authToken = config.get("twilio.authToken");
// const client = require("twilio")(accountSid, authToken);

async function getToken(payload) {
  const token = await jwt.sign(payload, config.get("jwtsecret"), {
    expiresIn: "365d",
  });
  return token;
}

async function sendSmsTwilio(phoneNumber, otp) {
  try {
    return await client.messages.create({
      body: `Your mobile One Time Password (OTP) to log in to your Social Platform account is ${otp}. The OTP is valid for 5 minutes.`,
      to: phoneNumber,
      from: config.get("twilio.messagingServiceSid"),
    });
  } catch (error) {
    console.log("Twilio Error:", error);
    throw new Error("Failed to send OTP: " + error.message);
  }
}
async function getOTP() {
  var otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}

async function getImageUrl(files) {
  var result = await cloudinary.v2.uploader.upload(files[0].path, {
    resource_type: "auto",
  });
  return result.secure_url;
}
async function getVideoUrl(files) {
  var result = await cloudinary.v2.uploader.upload(files, {
    resource_type: "auto",
  });
  return result.secure_url;
}

async function genBase64(data) {
  return await qrcode.toDataURL(data);
}

async function getSecureUrl(base64) {
  var result = await cloudinary.v2.uploader.upload(base64, {
    resource_type: "auto",
  });
  return result.secure_url;
}

module.exports = {
  getToken,
  sendSmsTwilio,
  getOTP,
  getImageUrl,
  getVideoUrl,
  getSecureUrl,
  genBase64,
};

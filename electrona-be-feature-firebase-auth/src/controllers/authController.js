import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.registerUser(email, password);

    res.status(201).json({
      message: "User registered successfully",
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginData = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      idToken: loginData.idToken,
      refreshToken: loginData.refreshToken,
      uid: loginData.localId,
      email: loginData.email,
    });
  } catch (error) {
    console.error("Login controller error", error.response?.data || error.message);
    res.status(400).json({
      error:
        error.response?.data?.error?.message ||
        error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await authService.sendPasswordReset(email);

    res.status(200).json({
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    console.error("Forgot password controller error", error.response?.data || error.message);
    res.status(400).json({
      error:
        error.response?.data?.error?.message ||
        error.message,
    });
  }
};
export const profile = (req, res) => {
  res.status(200).json({
    message: "User authenticated successfully",
    user: req.user,
  });
};

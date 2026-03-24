import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser(req.body);

    // IMPORTANT: Remove password before sending response
    const { password: _, ...safeUser } = user;

    res.status(201).json(safeUser);
  } catch (err: any) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await loginUser(email, password);

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    // 🔥 Secure cookie (important for assignment)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.log("LOGIN ERROR:", err);
    res.status(401).json({ message: err.message || "Login failed" });
  }
};
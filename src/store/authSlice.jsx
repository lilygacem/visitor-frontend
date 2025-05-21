import { create } from "zustand";
import axios from "../api/axiosInstance";
import jwtDecode from "jwt-decode";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  status: "idle",

  login: async (credentials) => {
    set({ status: "loading" });

    try {
      const response = await axios.post("/auth/signin", credentials);
      const token = response.data.token;

      localStorage.setItem("token", token);
      set({ token, status: "succeeded" });

      try {
        const decoded = jwtDecode(token);
        let roles = [];

        if (Array.isArray(decoded.roles)) {
          roles =
            typeof decoded.roles[0] === "string"
              ? decoded.roles
              : decoded.roles.map((r) => r.name);
        }

        localStorage.setItem("roles", JSON.stringify(roles));
        set({ roles });
      } catch (err) {
        console.warn("JWT decoding failed, no roles stored.");
        localStorage.setItem("roles", "[]");
        set({ roles: [] });
      }
    } catch (error) {
      set({ status: "failed" });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    set({ token: null, roles: [], status: "idle" });
    window.location.href = "/login";
  },
}));

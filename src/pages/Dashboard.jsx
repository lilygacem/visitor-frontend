"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fr from "date-fns/locale/fr";

// axios instance for dashboard with token interceptor
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/visits",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, presents: 0, pending: 0 });
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: statsData } = await axiosInstance.get("/count/today");
        setStats(statsData);

        const { data: visitorsData } = await axiosInstance.get("/recent");
        setRecentVisitors(visitorsData);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Erreur inconnue lors du chargement des données"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        <p>Erreur : {error}</p>
      </div>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#70587C]">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-purple-200 to-purple-400 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Total</h2>
            <p className="text-4xl font-bold text-[#70587C]">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">Présents</h2>
            <p className="text-4xl font-bold text-[#70587C]">
              {stats.presents}
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">En attente</h2>
            <p className="text-4xl font-bold text-[#70587C]">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[#70587C] mb-4">
            Visiteurs récents
          </h2>
          {recentVisitors.length === 0 ? (
            <p className="text-center text-gray-500">Aucun visiteur récent.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {recentVisitors.map((visitor) => (
                <li key={visitor.id} className="py-3 flex justify-between">
                  <span>{visitor.name}</span>
                  <span className="text-gray-600">{visitor.visitDate}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

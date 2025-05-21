"use client";
import { useState, useEffect } from "react";

export default function Visites() {
  const API_URL = "http://localhost:8060/api/visits/stats";

  const [search, setSearch] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats data
  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = await res.json();
      setVisitors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality with debounce
  useEffect(() => {
    const searchVisitors = async () => {
      if (!search.trim()) {
        return fetchData();
      }
      try {
        const response = await fetch(
          `${API_URL}/search?query=${encodeURIComponent(search)}`
        );
        if (!response.ok) throw new Error("Erreur de recherche");
        const data = await response.json();
        setVisitors(data);
      } catch (error) {
        console.error("Erreur de recherche:", error);
      }
    };
    const debounceTimer = setTimeout(searchVisitors, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  // Helper to format duration in minutes/hours
  const formatDuration = (minutes) => {
    if (minutes == null) return "-";
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h${m > 0 ? ` ${m}min` : ""}`;
  };

  if (loading) return <div className="p-4">Chargement en cours...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent">
            Statistiques des visites
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#70587C]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-[#C8B8DB] rounded-lg bg-white text-[#70587C]
                         focus:outline-none focus:ring-2 focus:ring-[#70587C] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-sm border border-[#C8B8DB]/20 overflow-hidden">
          <table className="min-w-full divide-y divide-[#C8B8DB]/20">
            <thead className="bg-[#F5F0FA]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[15%]">
                  ID Visiteur
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[25%]">
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[25%]">
                  Prénom
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[20%]">
                  Durée moyenne
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[15%]">
                  Nombre de visites
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8B8DB]/20">
              {visitors.map((visitor) => (
                <tr
                  key={visitor.id}
                  className="hover:bg-[#F9F7FC] transition-colors"
                >
                  <td className="px-4 py-3">{visitor.id}</td>
                  <td className="px-4 py-3">{visitor.nom}</td>
                  <td className="px-4 py-3">{visitor.prenom}</td>
                  <td className="px-4 py-3">
                    {formatDuration(visitor.dureeMoyenne)}
                  </td>
                  <td className="px-4 py-3">{visitor.nombreVisites}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

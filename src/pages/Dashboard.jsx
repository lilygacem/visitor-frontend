"use client";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fr from "date-fns/locale/fr";

export default function Dashboard() {
  const API_URL = "http://localhost:8060/api/visits";

  const [stats, setStats] = useState({
    total: 0,
    presents: 0,
    pending: 0,
  });
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch(`${API_URL}/count/today`);
        if (!statsResponse.ok)
          throw new Error("Erreur de chargement des statistiques");
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch recent visitors
        const visitorsResponse = await fetch(`${API_URL}/recent`);
        if (!visitorsResponse.ok)
          throw new Error("Erreur de chargement des visiteurs");
        const visitorsData = await visitorsResponse.json();
        setRecentVisitors(visitorsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#70587C]"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-500">
        Erreur : {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-[#70587C] text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <div className="min-h-screen bg-gradient-to-br from-[#70587C]/5 to-[#C8B8DB]/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent mb-8">
            Tableau de Bord
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Total Visitors */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-[#70587C] text-white p-3 rounded-lg">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-sm font-medium text-gray-500">
                      Visiteurs aujourd'hui
                    </h3>
                    <p className="text-2xl font-semibold text-[#70587C]">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Present Visitors */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 text-white p-3 rounded-lg">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-sm font-medium text-gray-500">
                      Visiteurs présents
                    </h3>
                    <p className="text-2xl font-semibold text-green-600">
                      {stats.presents}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Visitors */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-500 text-white p-3 rounded-lg">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-sm font-medium text-gray-500">
                      Visiteurs en attente
                    </h3>
                    <p className="text-2xl font-semibold text-amber-600">
                      {stats.pending}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Visitors */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5">
              <h2 className="text-xl font-semibold text-[#70587C] mb-4">
                Derniers visiteurs
              </h2>
              <div className="space-y-4">
                {recentVisitors.length > 0 ? (
                  recentVisitors.map((visitor) => (
                    <div
                      key={visitor.id}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 bg-[#70587C] text-white h-10 w-10 rounded-full flex items-center justify-center">
                        {visitor.nom.charAt(0)}
                        {visitor.prenom.charAt(0)}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {visitor.nom} {visitor.prenom}
                        </p>
                        <p
                          className={`text-sm ${
                            visitor.statut === "PRESENT"
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >
                          {visitor.statut === "PRESENT"
                            ? "Présent"
                            : "En attente"}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(visitor.heureArrivee).toLocaleTimeString(
                          "fr-FR",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aucun visiteur récent
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

"use client";
import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";

export default function VisitorInfo() {
  const [search, setSearch] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 16);
  };

  const fetchData = async () => {
    try {
      const [servicesRes, visitsRes] = await Promise.all([
        axiosInstance.get("/services"),
        axiosInstance.get("/visits"),
      ]);

      const servicesData = servicesRes.data;
      const visitsData = visitsRes.data;

      const mappedVisits = visitsData.map((visit) => ({
        ...visit,
        service:
          servicesData.find((s) => s.id === visit.serviceId)?.nomService ||
          "Inconnu",
        heureArrivee: formatDate(visit.heureArrivee),
        heureSortie: formatDate(visit.heureSortie),
      }));

      setServices(servicesData);
      setVisitors(mappedVisits);
    } catch (err) {
      setError(err.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const searchVisitors = async () => {
      if (!search.trim()) {
        return fetchData();
      }

      try {
        const response = await axiosInstance.get(
          `/visits/search?query=${encodeURIComponent(search)}`
        );
        const data = response.data;

        let currentServices = services;
        if (!currentServices.length) {
          const res = await axiosInstance.get("/services");
          currentServices = res.data;
          setServices(currentServices);
        }

        const mappedVisits = data.map((visit) => ({
          ...visit,
          service:
            currentServices.find((s) => s.id === visit.serviceId)?.nomService ||
            "Inconnu",
          heureArrivee: formatDate(visit.heureArrivee),
          heureSortie: formatDate(visit.heureSortie),
        }));

        setVisitors(mappedVisits);
      } catch (err) {
        console.error("Erreur de recherche:", err.message);
      }
    };

    const debounceTimer = setTimeout(searchVisitors, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleAdd = async () => {
    try {
      if (services.length === 0) {
        alert("Aucun service disponible.");
        return;
      }

      const now = new Date().toISOString().slice(0, 19);
      const payload = {
        nom: "Nouveau",
        prenom: "Visiteur",
        numeroId: "000000",
        heureArrivee: now,
        serviceId: services[0].id,
        statut: "EN_ATTENTE",
      };

      await axiosInstance.post("/visits", payload);
      fetchData();
    } catch (err) {
      alert(`Erreur lors de l'ajout: ${err.message}`);
    }
  };

  const handleEdit = async (id, field, value) => {
    try {
      const currentVisit = visitors.find((v) => v.id === id);
      if (!currentVisit) return;

      const updatedVisit = { ...currentVisit };

      if (field === "service") {
        const serviceObj = services.find((s) => s.nomService === value);
        if (!serviceObj) return;
        updatedVisit.service = value;
        updatedVisit.serviceId = serviceObj.id;
      } else if (field.startsWith("heure")) {
        updatedVisit[field] = value
          ? new Date(value).toISOString().slice(0, 19)
          : null;
      } else if (field === "statut") {
        await axiosInstance.put(`/visits/${id}/statut`, null, {
          params: { statut: value },
        });
        return fetchData();
      } else {
        updatedVisit[field] = value;
      }

      setVisitors((prev) => prev.map((v) => (v.id === id ? updatedVisit : v)));

      const payload = {
        id: updatedVisit.id,
        nom: updatedVisit.nom,
        prenom: updatedVisit.prenom,
        numeroId: updatedVisit.numeroId,
        visitDate: updatedVisit.heureArrivee?.slice(0, 19),
        exitDate: updatedVisit.heureSortie?.slice(0, 19),
        service: {
          id: updatedVisit.serviceId,
        },
        status: updatedVisit.statut,
      };

      await axiosInstance.put(`/visits/${id}`, payload);
    } catch (err) {
      console.error("Erreur de mise à jour:", err.message);
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette visite ?")) return;

    setVisitors((prev) => prev.filter((v) => v.id !== id));

    try {
      await axiosInstance.delete(`/visits/${id}`);
    } catch (err) {
      console.error("Erreur de suppression:", err.message);
      fetchData();
    }
  };

  if (loading) return <div className="p-4">Chargement en cours...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  // ⬇️ Return JSX remains unchanged from your code (table, UI layout etc.)
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent">
            Gestion des visiteurs
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

            <button
              onClick={handleAdd}
              className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#70587C] to-[#C8B8DB] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Ajouter
            </button>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-sm border border-[#C8B8DB]/20 overflow-hidden">
          <table className="min-w-full divide-y divide-[#C8B8DB]/20">
            <thead className="bg-[#F5F0FA]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[15%]">
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[15%]">
                  Prénom
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[12%]">
                  NIN
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[18%]">
                  Arrivée
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[18%]">
                  Sortie
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[15%]">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-[#70587C] w-[10%]">
                  Statut
                </th>
                {/* <th className="px-4 py-3 text-right text-sm font-medium text-[#70587C] w-[7%]">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8B8DB]/20">
              {visitors.map((visit) => (
                <tr
                  key={visit.id}
                  className="hover:bg-[#F9F7FC] transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      value={visit.nom || ""}
                      onChange={(e) =>
                        handleEdit(visit.id, "nom", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={visit.prenom || ""}
                      onChange={(e) =>
                        handleEdit(visit.id, "prenom", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={visit.numeroId || ""}
                      onChange={(e) =>
                        handleEdit(visit.id, "numeroId", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="datetime-local"
                      value={visit.heureArrivee || ""}
                      onChange={(e) =>
                        handleEdit(visit.id, "heureArrivee", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="datetime-local"
                      value={visit.heureSortie || ""}
                      onChange={(e) =>
                        handleEdit(visit.id, "heureSortie", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={visit.service}
                      onChange={(e) =>
                        handleEdit(visit.id, "service", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-[#C8B8DB]/50 rounded focus:ring-1 focus:ring-[#70587C]"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.nomService}>
                          {service.nomService}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={visit.statut}
                      onChange={(e) =>
                        handleEdit(visit.id, "statut", e.target.value)
                      }
                      className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-[#70587C] ${
                        visit.statut === "EN_ATTENTE"
                          ? "text-amber-600 border-amber-200 bg-amber-50"
                          : visit.statut === "PRESENT"
                          ? "text-green-600 border-green-200 bg-green-50"
                          : "text-gray-600 border-gray-200"
                      }`}
                    >
                      <option value="EN_ATTENTE">En attente</option>
                      <option value="PRESENT">Présent</option>
                      <option value="CLOTURE">Clôturé</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* <button
                      onClick={() => handleDelete(visit.id)}
                      className="text-[#70587C] hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

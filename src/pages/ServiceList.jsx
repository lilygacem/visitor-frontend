import { useState, useEffect } from "react";

export default function ServiceList() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const API_URL = "http://localhost:8060/api/services";

  // Chargement initial des données
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Erreur lors du chargement des services:", error);
      }
    };
    fetchServices();
  }, []);

  // Recherche avec debounce
  useEffect(() => {
    const searchServices = async () => {
      if (!search.trim()) {
        const response = await fetch(API_URL);
        const data = await response.json();
        return setServices(data);
      }

      try {
        const response = await fetch(
          `${API_URL}/search?query=${encodeURIComponent(search)}`
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Erreur de recherche:", error);
      }
    };

    const debounceTimer = setTimeout(searchServices, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleAddService = async () => {
    const newService = {
      nomService: "Nouveau Service",
      responsable: "Nouveau Responsable",
      telephone: "0000000000",
      statut: "libre",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
      const createdService = await response.json();
      setServices([...services, createdService]);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleEdit = async (id, field, value) => {
    const updatedServices = services.map((service) => {
      if (service.id === id) {
        const updatedService = { ...service, [field]: value };
        
        // Mise à jour optimiste
        fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedService),
        }).catch(error => {
          console.error("Erreur de synchronisation:", error);
          fetchServices(); // Rechargement si erreur
        });

        return updatedService;
      }
      return service;
    });

    setServices(updatedServices);
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent">
            Gestion des services
          </h2>
          <button
            onClick={handleAddService}
            className="group relative inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#70587C] to-[#C8B8DB] text-white shadow-lg hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 transition-transform group-hover:scale-110 duration-300"
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
            Ajouter un service
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="card mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="relative rounded-md">
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
              placeholder="Rechercher un service, un responsable ou un statut..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-[#C8B8DB] text-[#70587C] rounded-lg 
                       bg-white/70 backdrop-blur-sm placeholder-[#C8B8DB]
                       focus:outline-none focus:ring-2 focus:ring-[#70587C] focus:border-transparent
                       transition-all duration-300"
            />
          </div>
        </div>

        {/* Tableau des services */}
        <div className="card animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#C8B8DB]/30">
              <thead>
                <tr>
                  {["Service", "Responsable", "Téléphone", "Statut", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8B8DB]/30">
                {services.map((service, index) => (
                  <tr
                    key={service.id}
                    className="hover:bg-[#C8B8DB]/5 transition-colors duration-200"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        value={service.nomService}
                        onChange={(e) => handleEdit(service.id, "nomService", e.target.value)}
                        className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                 focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        value={service.responsable}
                        onChange={(e) => handleEdit(service.id, "responsable", e.target.value)}
                        className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                 focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        value={service.telephone}
                        onChange={(e) => handleEdit(service.id, "telephone", e.target.value)}
                        className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                 focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <select
                        value={service.statut}
                        onChange={(e) => handleEdit(service.id, "statut", e.target.value)}
                        className={`block w-full text-sm rounded-lg border-[#C8B8DB] bg-white/70
                                  focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300
                                  ${service.statut === "libre" ? "text-green-600" : "text-amber-600"}`}
                    >
                        <option value="libre">Libre</option>
                        <option value="occupé">Occupé</option>
                    </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-[#70587C] hover:text-red-600 transition-colors duration-300"
                      >
                        <svg
                          className="h-5 w-5 transform hover:scale-110 transition-transform duration-300"
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
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
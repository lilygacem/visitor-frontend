import { useState } from "react";

export default function ServiceList() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([
    {
      id: 1,
      nomService: "RH",
      responsable: "Alice",
      tel: "0600000001",
      statut: "libre",
    },
    {
      id: 2,
      nomService: "IT",
      responsable: "Bob",
      tel: "0600000002",
      statut: "occupé",
    },
  ]);

  const filteredServices = services.filter((s) => {
    const searchLower = search.toLowerCase();
    return (
      s.nomService.toLowerCase().includes(searchLower) ||
      s.responsable.toLowerCase().includes(searchLower) ||
      s.statut.toLowerCase().includes(searchLower)
    );
  });

  const handleAddService = () => {
    const newService = {
      id: Date.now(),
      nomService: "",
      responsable: "",
      tel: "",
      statut: "libre",
    };
    setServices([...services, newService]);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="title">Gestion des services</h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className=" btn-primary " onClick={handleAddService}>
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
        </div>

        <div
          className="card mb-6 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-[#70587C]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              className="input-primary"
              type="text"
              placeholder="Rechercher un service, un responsable ou un statut..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div
          className="card animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#C8B8DB]/30">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                  >
                    Responsable
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                  >
                    Téléphone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                  >
                    Statut
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#70587C] uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8B8DB]/30">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <tr
                      key={service.id}
                      className="hover:bg-[#C8B8DB]/5 transition-colors duration-200"
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={service.nomService}
                          onChange={(e) =>
                            handleEdit(service.id, "nomService", e.target.value)
                          }
                          className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                   focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={service.responsable}
                          onChange={(e) =>
                            handleEdit(
                              service.id,
                              "responsable",
                              e.target.value
                            )
                          }
                          className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                   focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={service.tel}
                          onChange={(e) =>
                            handleEdit(service.id, "tel", e.target.value)
                          }
                          className="block w-full text-sm border-[#C8B8DB] rounded-lg bg-white/70 text-[#70587C]
                                   focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={service.statut}
                          onChange={(e) =>
                            handleEdit(service.id, "statut", e.target.value)
                          }
                          className={`block w-full text-sm rounded-lg border-[#C8B8DB] bg-white/70
                                    focus:ring-2 focus:ring-[#70587C] focus:border-transparent transition-all duration-300
                                    ${
                                      service.statut === "libre"
                                        ? "text-green-600"
                                        : "text-amber-600"
                                    }`}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-[#70587C] font-medium"
                    >
                      Aucun service trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

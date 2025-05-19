import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ID && password) {
      setIsAuthenticated(true);
      navigate("/Dashboard");
    } else {
      alert("Veuillez remplir les champs.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="card space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
              icosnet
            </h1>
            <h2 className="mt-6 text-2xl font-semibold text-[#70587C]">
              Connexion à votre compte
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 animate-slide-up"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="ID"
                  className="block text-sm font-medium text-[#70587C] mb-1"
                >
                  Identifiant
                </label>
                <input
                  id="ID"
                  name="ID"
                  type="text"
                  required
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#C8B8DB] text-[#70587C] rounded-lg 
                           bg-white/70 backdrop-blur-sm placeholder-[#C8B8DB]
                           focus:outline-none focus:ring-2 focus:ring-[#70587C] focus:border-transparent
                           transition-all duration-300"
                  placeholder="Entrez votre identifiant"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#70587C] mb-1"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#C8B8DB] text-[#70587C] rounded-lg 
                           bg-white/70 backdrop-blur-sm placeholder-[#C8B8DB]
                           focus:outline-none focus:ring-2 focus:ring-[#70587C] focus:border-transparent
                           transition-all duration-300"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg
                         bg-gradient-to-r from-[#70587C] to-[#C8B8DB] text-white
                         hover:opacity-90 transform hover:scale-[1.02]
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70587C]
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-white/80 group-hover:text-white/90 transition-transform duration-300 group-hover:scale-110"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

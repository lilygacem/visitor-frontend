import { useState } from "react";
import SatisfactionForm from "./Satisfaction";

// Simule une base de visiteurs pour la démo
const VISITEURS = [
  { id: "12345", nom: "John Doe", service: "Accueil" },
  { id: "67890", nom: "Jane Smith", service: "Ressources Humaines" },
  { id: "54321", nom: "Alice Johnson", service: "Informatique" },
];

export default function SatisfactionEntryScreen() {
  const [badgeId, setBadgeId] = useState("");
  const [visiteur, setVisiteur] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    const found = VISITEURS.find((v) => v.id === badgeId.trim());
    if (found) {
      setVisiteur(found);
    } else {
      alert("Badge inconnu. Veuillez réessayer.");
      setBadgeId("");
    }
  };

  if (!visiteur) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#70587C]/10 to-[#C8B8DB]/10">
        <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#70587C] mb-4">
            Scan de votre badge
          </h2>
          <form
            onSubmit={handleScan}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="text"
              placeholder="Scannez ou saisissez l'ID du badge..."
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              className="border border-[#C8B8DB] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#70587C]"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#70587C] to-[#C8B8DB] text-white px-6 py-2 rounded shadow hover:from-[#C8B8DB] hover:to-[#70587C] transition"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Ici, on affiche l'interface satisfaction avec les infos du visiteur
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#70587C]/10 to-[#C8B8DB]/10">
      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold text-[#70587C] mb-2">
          Bonjour {visiteur.nom} !
        </h2>
        <p className="mb-4 text-[#70587C]">
          Service : <span className="font-semibold">{visiteur.service}</span>
        </p>
        <SatisfactionForm visiteur={visiteur} />
      </div>
    </div>
  );
}

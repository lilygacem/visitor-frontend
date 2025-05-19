import { useState } from "react";
import { useLocation } from "react-router-dom";

function Satisfaction() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const messages = ["Médiocre", "Passable", "Moyen", "Bien", "Excellent"];
  const colors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-lime-500",
    "text-green-500",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          setComment("");
        }, 3000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#70587C]/5 to-[#C8B8DB]/5 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent mb-2 animate-slide-up">
            Votre Avis Nous Intéresse !
          </h1>
          <p
            className="text-[#70587C] animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            Comment avez-vous trouvé notre service ?
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div
              className="space-y-4 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <label className="block text-sm font-medium text-[#70587C]">
                Votre Note :
              </label>
              <div className="h-24">
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-4xl transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                        star <= (hover || rating)
                          ? colors[star - 1]
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div className="h-8 mt-2">
                  {(hover > 0 || rating > 0) && (
                    <p
                      className={`text-center font-medium ${
                        colors[(hover || rating) - 1]
                      } animate-fade-in`}
                    >
                      {hover > 0 ? messages[hover - 1] : messages[rating - 1]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* <div
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Exprimez votre ressenti..."
                className="w-full h-32 px-3 py-2 text-[#70587C] border border-[#C8B8DB] rounded-lg 
                         bg-white/70 backdrop-blur-sm placeholder-[#C8B8DB]
                         focus:outline-none focus:ring-2 focus:ring-[#70587C] focus:border-transparent 
                         transition-all duration-300 resize-none"
              />
            </div> */}

            <button
              type="submit"
              disabled={loading || !rating}
              className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-lg
                       transition-all duration-300 transform hover:scale-[1.02]
                       ${
                         loading || !rating
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-gradient-to-r from-[#70587C] to-[#C8B8DB] text-white hover:opacity-90"
                       }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </div>
              ) : (
                "Envoyer"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4 animate-fade-in">
            <div className="text-xl animate-bounce font-medium bg-gradient-to-r from-[#70587C] to-[#C8B8DB] bg-clip-text text-transparent">
              Merci pour votre retour !
            </div>
            <p className="text-4xl animate-bounce">😊</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Satisfaction;

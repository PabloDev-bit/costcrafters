import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, ChartBar, Calendar } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Comparaison Mondiale",
      description: "Comparez le coût de la vie dans différentes villes du monde entier",
    },
    {
      icon: <ChartBar className="w-12 h-12 text-secondary" />,
      title: "Visualisation Interactive",
      description: "Analysez les données avec des graphiques interactifs détaillés",
    },
    {
      icon: <Calendar className="w-12 h-12 text-accent" />,
      title: "Projections sur 5 ans",
      description: "Planifiez votre avenir avec nos projections sur 5 ans",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-700 overflow-hidden">
      {/* Déco en background */}
      <div className="absolute inset-0 pointer-events-none z-[-1] before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/20 before:to-accent/20 before:blur-3xl" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Petites particules animées */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 select-none">
          {/* ex: un composant décoratif, ou un set d’images/paricles */}
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold gradient-text tracking-tight drop-shadow-sm animate-float">
            Bienvenue sur CostCrafters
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Votre outil ultime pour comparer le coût de la vie à travers le monde
          </p>
          <Button
            onClick={() => navigate("/compare")}
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-primary via-secondary to-accent
                       hover:rotate-1 hover:scale-105 hover:opacity-95
                       transition-transform duration-300 hover:shadow-2xl"
          >
            Commencer la comparaison
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text animate-fade-in">
            Fonctionnalités Principales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50
                           shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                           animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex justify-center space-x-6 mb-2">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Nous contacter
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 CostCrafters. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

/**
 * Interface décrivant la structure attendue pour chaque langue.
 * Chaque clé (appTitle, selectFirstCity, ...) doit exister dans toutes les traductions
 * pour éviter des incohérences.
 */
interface BaseTranslation {
  appTitle: string;
  selectFirstCity: string;
  selectSecondCity: string;
  selected: string;
  compareCities: string;
  selectLanguage: string;
  selectCitiesError: string;
  selectCitiesErrorDesc: string;
  housing: string;
  food: string;
  transport: string;
  utilities: string;
  summary: string;
  insights: string;
  compare: string;
  costComparison: string;
  switchLanguage: string;
  moreExpensive: string;
  lessExpensive: string;
  housingInsight: string;
  foodInsight: string;
  transportInsight: string;
  utilitiesInsight: string;
}

/**
 * Définition des traductions disponibles :
 * - 'fr' pour le français
 * - 'en' pour l'anglais
 */
export const translations = {
  fr: {
    appTitle: "Comparateur de Coûts – Explorez et Comparez !",
    selectFirstCity: "Choisissez votre première ville",
    selectSecondCity: "Choisissez votre seconde ville",
    selected: "Sélection",
    compareCities: "Comparez les villes",
    selectLanguage: "Langue",
    selectCitiesError: "Oups, il manque des villes",
    selectCitiesErrorDesc:
      "Veuillez sélectionner deux villes avant de lancer la comparaison.",
    housing: "Logement",
    food: "Alimentation",
    transport: "Transport",
    utilities: "Services publics",
    summary: "Bilan",
    insights: "En un clin d'œil",
    compare: "Comparer",
    costComparison: "Comparaison de coûts",
    switchLanguage: "Changer de langue",
    moreExpensive: "plus cher que",
    lessExpensive: "moins cher que",
    housingInsight: "Le logement est",
    foodInsight: "L’alimentation est",
    transportInsight: "Le transport est",
    utilitiesInsight: "Les services publics sont",
  },
  en: {
    appTitle: "Cost Comparison – Explore & Compare!",
    selectFirstCity: "Choose your first city",
    selectSecondCity: "Choose your second city",
    selected: "Selected",
    compareCities: "Compare Cities",
    selectLanguage: "Language",
    selectCitiesError: "Oops, missing cities",
    selectCitiesErrorDesc:
      "Please select two cities before comparing.",
    housing: "Housing",
    food: "Food",
    transport: "Transportation",
    utilities: "Utilities",
    summary: "Summary",
    insights: "At a Glance",
    compare: "Compare",
    costComparison: "Cost Comparison",
    switchLanguage: "Switch Language",
    moreExpensive: "more expensive than",
    lessExpensive: "less expensive than",
    housingInsight: "Housing is",
    foodInsight: "Food is",
    transportInsight: "Transportation is",
    utilitiesInsight: "Utilities are",
  },
};

// Types utiles pour éviter les fautes de frappe lors de l'utilisation :
export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
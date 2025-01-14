export const translations = {
  fr: {
    housing: "Logement",
    food: "Alimentation",
    transport: "Transport",
    utilities: "Services publics",
    summary: "Résumé",
    insights: "Points clés",
    compare: "Comparer",
    costComparison: "Comparaison des coûts",
    switchLanguage: "Changer de langue",
    moreExpensive: "plus cher que",
    lessExpensive: "moins cher que",
    housingInsight: "Le logement est",
    foodInsight: "L'alimentation est",
    transportInsight: "Le transport est",
    utilitiesInsight: "Les services publics sont",
  },
  en: {
    housing: "Housing",
    food: "Food",
    transport: "Transport",
    utilities: "Utilities",
    summary: "Summary",
    insights: "Key Insights",
    compare: "Compare",
    costComparison: "Cost Comparison",
    switchLanguage: "Switch language",
    moreExpensive: "more expensive than",
    lessExpensive: "less expensive than",
    housingInsight: "Housing is",
    foodInsight: "Food costs are",
    transportInsight: "Transportation is",
    utilitiesInsight: "Utilities are",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
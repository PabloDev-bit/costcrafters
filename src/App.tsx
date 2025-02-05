import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Compare from "./pages/Compare";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <TooltipProvider>
          {/* Toast providers */}
          <Toaster />
          <Sonner />
          {/* Router */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compare" element={<Index />} />
              <Route path="/compare/:city1Id/:city2Id" element={<Compare />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

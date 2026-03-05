import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CienciaPage from "./pages/CienciaPage";
import BiomecanicaPage from "./pages/BiomecanicaPage";
import AmplitudePage from "./pages/AmplitudePage";
import InterativoPage from "./pages/InterativoPage";
import AvancadoPage from "./pages/AvancadoPage";
import ReferenciasPage from "./pages/ReferenciasPage";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ciencia" element={<CienciaPage />} />
            <Route path="/biomecanica" element={<BiomecanicaPage />} />
            <Route path="/amplitude" element={<AmplitudePage />} />
            <Route path="/interativo" element={<InterativoPage />} />
            <Route path="/avancado" element={<AvancadoPage />} />
            <Route path="/referencias" element={<ReferenciasPage />} />
            <Route paath="/chatbot" element={<ChatBot />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

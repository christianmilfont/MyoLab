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
import ChatNotification from "./components/ChatNotification";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";
import AnimatedLockedPageWrapper from "./components/AnimatedLockedPageWrapper";import MaquinasPage from "./components/ui/MaquinasPage";
import AcademiasPage from "./pages/AcademiasPage";
 {/* Páginas bloqueadas com animação */}


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Analytics />  {/* <-- aqui é o GTAG para o google analytics */}
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ciencia" element={<CienciaPage />} />
            <Route 
            path="/biomecanica"
             element={
              <AnimatedLockedPageWrapper path="/avancado">
                  <BiomecanicaPage />
              </AnimatedLockedPageWrapper> 
             }
             />

            <Route path="/amplitude" element={<AmplitudePage />} />
            <Route path="/interativo" element={<InterativoPage />} />
             
            <Route
              path="/avancado"
              element={
                <AnimatedLockedPageWrapper path="/avancado">
                  <AvancadoPage />
                </AnimatedLockedPageWrapper>
              }
            />
            <Route path="/referencias" element={<ReferenciasPage />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/chatnotification" element={<ChatNotification />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/maquinas" element={<MaquinasPage />} />
            <Route path="/academias" element={<AcademiasPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

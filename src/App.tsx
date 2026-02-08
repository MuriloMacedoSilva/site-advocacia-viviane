// App.tsx

// import { useState } from 'react';
// IMPORTANTE: Atualizando as extensões de importação para .tsx
/* import Inicio from "../src/components/Inicio.tsx";
import Header from "../src/components/Header.tsx";
import Avaliation from './components/Avaliation.tsx';
import Sobre from "./components/Sobre.tsx";
import Topics from "./components/Topics.tsx";
import Servicos from "./components/Servicos.tsx";
import Frase from "./components/Frase.tsx";
import Footer from "./components/Footer.tsx";*/
import React, { useEffect } from 'react';
import  {  lazy,  Suspense } from "react"

// Importações de assets (caminhos de imagem)
import background2 from "./assets/background2.png";
import background2_mobile from "./assets/background2_mobile.png";

// O componente App não usa o estado 'useState' importado, mas se for usado no futuro,
// o TypeScript já o reconhece.

const API_URL = 'https://api-viviane.onrender.com/avaliacao';

const App: React.FC = () => {

    useEffect(() => {
    // 1. A função de aquecimento
    const warmUpApi = async () => {
      try {
        console.log('Tentando aquecer a API...');
        
        // Faz uma requisição GET simples para o endpoint de ping
        // A requisição usa 'no-cache' para garantir que não use um resultado antigo
        const response = await fetch(`${API_URL}`, { 
          method: 'POST',
          cache: 'no-cache' // Importante para não usar cache do navegador
        });

        if (response.ok) {
          console.log('API aquecida com sucesso!');
        } else {
          // A API respondeu, mas não com 200. Mesmo assim, ela foi acordada.
          console.warn('API respondeu, mas com status:', response.status);
        }
      } catch (error) {
        // Erro na requisição (possivelmente devido à API estar "dormindo" e demorar a responder)
        // O importante é que a tentativa de wake-up foi feita.
        console.error('Falha ao tentar aquecer a API:', error);
      }
    };

    // 2. Chama a função de aquecimento
    warmUpApi();

  }, []); // O array de dependências vazio ([]) garante que isso rode apenas na montage


    // Se você não está usando o useState, você pode removê-lo para limpar o código.
    // const [count, setCount] = useState(0) 

    const Header = lazy(() => import("../src/components/Header"));
    const Inicio = lazy(() => import("../src/components/Inicio"));
    const Frase = lazy(() => import("../src/components/Frase"));
    const Topics = lazy(() => import("../src/components/Topics"));
    const Avaliation = lazy(() => import("../src/components/Avaliation"));
    const Sobre = lazy(() => import("../src/components/Sobre"));
    const Servicos = lazy(() => import("../src/components/Servicos"));
    const Footer = lazy(() => import("../src/components/Footer"));


    return (
        <div className='overflow-x-hidden overflow-y-hidden scroll-smooth bg-transparent'>
            {/* Componentes renderizados em ordem */}
            <Suspense  fallback={<p>Loading...</p>}>
              < Header />
              < Inicio />
              {/* Imagens de fundo */}
              <img src={background2} alt="" className='z-[-1] max-h-[2250px] absolute w-screen hidden lg:block' />
              <img src={background2_mobile} alt="" className='z-[-1] absolute h-[2350px] w-screen block lg:hidden' />
            
              < Frase />
              < Topics />
              < Avaliation />
              < Sobre />
              < Servicos />
              < Footer />
            </Suspense>
        </div>
    );
}

export default App;
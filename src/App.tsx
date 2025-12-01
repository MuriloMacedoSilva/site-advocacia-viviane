// App.tsx

import { useState } from 'react';
// IMPORTANTE: Atualizando as extensões de importação para .tsx
import Inicio from "../src/components/Inicio.tsx";
import Header from "../src/components/Header.tsx";
import Avaliation from './components/Avaliation.tsx';
import Sobre from "./components/Sobre.tsx";
import Topics from "./components/Topics.tsx";
import Servicos from "./components/Servicos.tsx";
import Frase from "./components/Frase.tsx";
import Footer from "./components/Footer.tsx";

// Importações de assets (caminhos de imagem)
import background2 from "./assets/background2.png";
import background2_mobile from "./assets/background2_mobile.png";

// O componente App não usa o estado 'useState' importado, mas se for usado no futuro,
// o TypeScript já o reconhece.

function App() {
    // Se você não está usando o useState, você pode removê-lo para limpar o código.
    // const [count, setCount] = useState(0) 

    return (
        <div className='overflow-x-hidden overflow-y-hidden scroll-smooth bg-transparent'>
            {/* Componentes renderizados em ordem */}
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
        </div>
    );
}

export default App;
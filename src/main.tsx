import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import FormAvaliation from './FormAvaliation';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/formAvaliation",
    element: <FormAvaliation/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// import React from 'react';
// // Importamos 'createRoot' de 'react-dom/client' para inicializar o React 18
// import { createRoot } from 'react-dom/client'; 
// import App from './App.jsx';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import FormAvaliation from './FormAvaliation.tsx'; // Importando o arquivo que você corrigiu antes

// // --- Configuração do Roteador ---

// // Define as rotas da sua aplicação usando react-router-dom
// const router = createBrowserRouter([
//   {
//     path: "/",
//     // O componente principal da sua aplicação (Home, Layout, etc.)
//     element: <App />, 
//   },
//   {
//     path: "/avaliacao",
//     // Rota para o formulário de avaliação
//     element: <FormAvaliation />,
//   },
//   // Você pode adicionar mais rotas aqui, como a página de sucesso, 404, etc.
// ]);

// // --- Inicialização do React ---

// // 1. Buscamos o elemento DOM com o ID 'root'
// const rootElement = document.getElementById('root');

// // 2. VERIFICAÇÃO CRUCIAL: Se o elemento existir, inicializamos o app
// if (rootElement) {
//     // Usamos 'createRoot' para a inicialização
//     createRoot(rootElement).render(
//         <React.StrictMode>
//             {/* O RouterProvider injeta a configuração das rotas */}
//             <RouterProvider router={router} />
//         </React.StrictMode>
//     );
// } else {
//     // Mensagem de erro caso o elemento 'root' não seja encontrado no HTML
//     console.error("Erro: O elemento com o ID 'root' não foi encontrado no seu index.html. A aplicação React não pôde ser inicializada.");
// }
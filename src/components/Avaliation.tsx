// Avaliation.tsx

import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from "react";
import React from 'react'; // Importação explícita do React para tipagem de FC
import { Star, User, MessageSquare, Loader2 } from 'lucide-react';
// Assumindo que você está usando 'react-router-dom', o tipo é importado de lá.
import { Link } from 'react-router-dom'; // CORRIGIDO: Assumindo react-router-dom

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// --- CONFIGURAÇÃO DA API ---
const API_ENDPOINT = 'https://api-viviane.onrender.com/avaliacao';
// --- FIM CONFIGURAÇÃO DA API ---

// 1. INTERFACE DE DADOS: Define a estrutura do objeto de avaliação retornado pela API
interface AvaliacaoData {
    id: string; // Adicionado id (assumindo que a API retorna um)
    nome: string;
    avaliacao: string;
    nota: number;
    dia: number;
    mes: number;
    ano: number;
    // Adicione outros campos se a API retornar, como 'data_criacao: string;'
}

// 2. INTERFACE DE PROPS: Componente StarRatingDisplay
interface StarRatingDisplayProps {
    rating: number; // Deve ser um número
}

// Componente auxiliar para exibir as estrelas da nota (Tipado)
const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ rating }) => {
    const maxRating = 5;
    return (
        <div className="flex text-yellow-500 mb-3">
            {Array.from({ length: maxRating }).map((_, index) => (
                <Star
                    key={index}
                    size={20}
                    // O TypeScript garante que 'rating' é um número
                    className={index < rating ? 'fill-yellow-500' : 'text-gray-500'}
                />
            ))}
        </div>
    );
};


// 3. INTERFACE DE PROPS: Componente AvaliationCard
interface AvaliationCardProps {
    avaliacao: AvaliacaoData; // Aceita um objeto que corresponde à nossa interface de dados
}

// Componente Card de Avaliação individual (Substitui a imagem) (Tipado)
const AvaliationCard: React.FC<AvaliationCardProps> = ({ avaliacao }) => {
    // A data está separada (dia, mes, ano). O TS garante que são números.
    const dataFormatada = `${avaliacao.dia}/${avaliacao.mes}/${avaliacao.ano}`;
    
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-yellow-800/20 text-gray-100 h-full min-h-[250px] flex flex-col justify-between transition-all duration-300 hover:shadow-yellow-500/10">
            <div>
                <StarRatingDisplay rating={avaliacao.nota} />
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
                    <User size={18} className="mr-2 text-gray-400" />
                    {avaliacao.nome || 'Usuário Anônimo'}
                </h3>
                <p className="text-gray-300 italic text-sm">
                    <MessageSquare size={16} className="inline mr-1 align-top text-yellow-400" />
                    "{avaliacao.avaliacao}"
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                    Avaliado em: {dataFormatada}
                </p>
            </div>
        </div>
    );
};


function Avaliation() {

    // --- ESTADOS PARA A BUSCA DE DADOS ---
    // O TypeScript agora sabe que 'avaliacoes' é um array de objetos AvaliacaoData
    const [avaliacoes, setAvaliacoes] = useState<AvaliacaoData[]>([]);
    // O TS infere boolean para isLoading e slidePerview como number
    const [isLoading, setIsLoading] = useState(true);
    // O TS infere string ou null para o erro
    const [error, setError] = useState<string | null>(null);
    // --- FIM ESTADOS PARA A BUSCA DE DADOS ---
    
    const [slidePerview, setSlidePerview] = useState(3);

    // Lógica para responsividade do Swiper (rendleResize)
    useEffect( () => {
        // Tipando o evento de ResizeEvent (opcional, mas recomendado)
        function rendleResize(): any {
            // window.innerWidth já é do tipo number.
            if (window.innerWidth < 720) {
                setSlidePerview(1);
            } else if (window.innerWidth >= 720 && window.innerWidth < 1100){
                setSlidePerview(2);
            } else {
                setSlidePerview(3);
            }
        }

        rendleResize();
        // O TypeScript garante que 'rendleResize' é um manipulador de eventos válido.
        window.addEventListener("resize", rendleResize);

        return () => {
            window.removeEventListener("resize", rendleResize);
        };
    }, []);
    
    // --- LÓGICA DE BUSCA DE DADOS (descomentada e tipada) ---
    // Mantendo a estrutura original, mas aplicando a tipagem assíncrona
    // useEffect(() => {
    //     const fetchAvaliations = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             const response = await fetch(API_ENDPOINT, { method: 'GET' });

    //             if (!response.ok) {
    //                 const errorText = await response.text();
    //                 throw new Error(`Falha ao buscar avaliações. Status: ${response.status}. Detalhe: ${errorText}`);
    //             }

    //             // O TypeScript agora sabe que 'data' é um array de objetos AvaliacaoData
    //             const data: AvaliacaoData[] = await response.json();
    //             setAvaliacoes(data); // Define o array de avaliações
    //         } catch (err) {
    //             // Tipando o erro para evitar 'unknown'
    //             let errorMessage = 'Ocorreu um erro desconhecido.';
    //             if (err instanceof Error) {
    //                 errorMessage = err.message;
    //             }
    //             console.error('Erro ao buscar avaliações:', err);
    //             setError(`Não foi possível carregar as avaliações: ${errorMessage}`);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchAvaliations();
    // }, []); 
    // // --- FIM LÓGICA DE BUSCA DE DADOS ---


    // // Se estiver carregando (descomentado)
    // if (isLoading) {
    //     return (
    //         <section className="w-screen m-auto py-20 bg-black flex flex-col items-center justify-center">
    //             <Loader2 className="animate-spin inline-block text-yellow-400 mb-4" size={32} />
    //             <p className="text-yellow-400">Carregando avaliações...</p>
    //         </section>
    //     );
    // }
    
    // // Se houver erro (descomentado)
    // if (error) {
    //     return (
    //         <section className="w-screen m-auto py-20 bg-black flex flex-col items-center justify-center">
    //             <p className="p-4 bg-red-600/20 text-red-300 border border-red-500 rounded-lg text-center">{error}</p>
    //             <div className='mt-6'><Link to="/formAvaliation" className='bg-transparent border border-amber-200 flex items-center justify-center h-[60px] text-[15px] text-amber-200 font-light hover:bg-amber-200/90 hover:text-amber-950 transition duration-200 px-6'>Fazer Avaliação</Link></div>
    //         </section>
    //     );
    // }


    return ( 
        <section className=" w-screen m-auto bg-gradient-to-b md:from-black/80 to-50% md:to-black/80 from-black/90 to-black items-center justify-center pb-[20px] relative overflow-hidden top-0">
            <h2 className='md:w-[400px] w-[90%] m-auto flex items-center justify-center md:pt-[50px] mb-[40px] pt-[100px] text-[36px] bg-gradient-to-r from-orange-300 from-[0%] to-[80%] to-yellow-200 bg-clip-text text-transparent font-Inter font-medium'>O que os clientes dizem</h2>
            
            <Swiper
                direction='horizontal'
                slidesPerView={slidePerview}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={20}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Pagination, A11y, Autoplay]}
                className='w-[90%] m-auto mySwiper'
            >
                
                {/* Mapeando os dados da API */}
                {avaliacoes.length > 0 ? (
                    avaliacoes.map((item, index) => (
                        <SwiperSlide key={index} className='p-1'>
                            <AvaliationCard avaliacao={item} />
                        </SwiperSlide>
                    ))
                ) : (
                    // Mensagem se não houver avaliações, mas o carregamento já terminou
                    <SwiperSlide className='p-1'>
                        <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 h-full min-h-[250px] flex flex-col items-center justify-center text-gray-400 text-center">
                            Nenhuma avaliação disponível ainda.
                        </div>
                    </SwiperSlide>
                )}
                
            </Swiper>
            <div className='w-screen flex justify-center items-center'><Link to="/formAvaliation" className='bg-transparent border border-amber-200 flex items-center justify-center h-[60px] text-[15px] text-amber-200 font-light hover:bg-amber-200/90 hover:text-amber-950 transition duration-200 px-6 mt-6'>Fazer Avaliação</Link></div>
        </section>
    );
}

export default Avaliation;
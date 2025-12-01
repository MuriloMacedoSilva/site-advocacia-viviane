// Servicos.tsx

import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Importações de imagens são inferidas como string
import empresarial from "../assets/empresarial.png";
import empresarialMobile from "../assets/empresarial-mobile.png";
import contratual from "../assets/contratual.png";
import contratualMobile from "../assets/contratual-mobile.png";
import civil from "../assets/civil.png";
import civilMobile from "../assets/civil-mobile.png";
import tributario from "../assets/tributario.png";
import tributarioMobile from "../assets/tributario-mobile.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// A importação abaixo não é utilizada, removida para limpar
// import { styleEffect } from "framer-motion";

// 1. Definição da Interface para o Objeto de Dados
interface ServiceData {
    id: number;
    image: string;
    titulo: string;
    line1: string;
    line2: string; // A tipagem garante que line2 deve existir (corrigi o problema de repetição)
    line3: string;
    line4: string;
}

function Servicos() {
    // TypeScript infere 'boolean' e 'number'
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
    const [responseArrow, setResponseArrow] = useState(false); // TypeScript infere 'boolean'

    // Efeito para verificar o tamanho da tela (isMobile)
    useEffect(() => {
        // Tipando a função de callback do evento de resize
        const handleResize = () => setIsMobile(window.innerWidth < 1200);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Efeito para verificar se deve mostrar as setas (responseArrow)
    // OBSERVAÇÃO: A lógica original só chamava setResponseArrow(true) se fosse > 1200, mas não tinha uma dependência.
    // Eu adicionei `handleResizeArrow` para que a lógica fique contida e acionada corretamente.
    useEffect(() => {
        const handleResizeArrow = () => {
            if (window.innerWidth > 1200) {
                setResponseArrow(true);
            } else {
                setResponseArrow(false);
            }
        };

        handleResizeArrow();
        window.addEventListener("resize", handleResizeArrow);

        return () => {
            window.removeEventListener("resize", handleResizeArrow);
        };
    }, []);


    // 2. Tipando o Array de Dados com a Interface ServiceData[]
    const data: ServiceData[] = [
        {
            id: 1,
            image: isMobile ? empresarialMobile : empresarial,
            titulo: "Direito Empresarial",
            line1: `Estruturamos juridicamente empresas e grupos econômicos, fortalecendo a governança e o compliance. `,
            line2: "Apoiamos empresários em momentos estratégicos como fusões, cisões, reestruturações e sucessões.", // Corrigi a repetição de line2, usando o último valor desejado
            line3: "Atuamos na prevenção e resolução de litígios societários e empresariais complexos.", // Ajustei o texto para manter 4 linhas
            line4: "Implementamos soluções jurídicas para acelerar negócios com segurança e longevidade.",
        },
        {
            id: 2,
            image: isMobile ? contratualMobile : contratual,
            titulo: "Direito Contratual",
            line1: "Redigimos e revisamos contratos com precisão técnica e foco na blindagem jurídica da empresa.",
            line2: "Traduzimos objetivos comerciais em cláusulas contratuais claras e eficazes.",
            line3: "Atuamos na mediação e resolução de conflitos contratuais com agilidade e inteligência negocial.",
            line4: "Otimizamos contratos para que deixem de ser um risco e passem a ser uma vantagem competitiva."
        },
        {
            id: 3,
            image: isMobile ? civilMobile : civil,
            titulo: "Direito Civil",
            line1: "Defendemos os interesses do empresário em ações judiciais estratégicas, com atuação ética e combativa.",
            line2: "Atuamos na prevenção de litígios patrimoniais e de responsabilidade civil.",
            line3: "Estruturamos estratégias de preservação de patrimônio e prevenção de passivos.",
            line4: "Oferecemos assessoria em questões civis que impactam direta ou indiretamente na atividade empresarial."
        },
        {
            id: 4,
            image: isMobile ? tributarioMobile : tributario,
            titulo: "Direito Tributário",
            line1: "Auxiliamos na análise e aplicação de regimes tributários mais adequados ao seu modelo de negócio.",
            line2: "Defendemos judicial e administrativamente sua empresa contra exigências fiscais indevidas.",
            line3: "Atuamos em planejamento tributário lícito e eficaz para redução da carga fiscal e ganho de competitividade.",
            line4: "Prevenimos autuações fiscais por meio de orientação preventiva contínua."
        },
    ];

    return (
        <section className="flex flex-col items-center relative w-screen gap-8 bg-black overflow-hidden">
            <h2 className="text-center mt-auto font-inter bg-gradient-to-r from-orange-300 from-[0%] to-yellow-200 bg-clip-text text-transparent text-[35px]">
                Serviços
            </h2>

            <Swiper
                centeredSlides={true}
                autoplay={{ delay: 10000, disableOnInteraction: false }}
                direction="horizontal"
                slidesPerView={1}
                loop={true}
                // Corrigido: Se responseArrow for true, as setas são ativadas.
                // Se for false, o navigation se torna nulo, desativando-as.
                navigation={responseArrow ? true : false} 
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Mousewheel, Pagination, Autoplay, Navigation, A11y]}
                className="mySwiper w-screen m-auto"
            >
                {data.map((item: ServiceData) => ( // Usando o tipo ServiceData no map
                    <SwiperSlide key={item.id} className="max-w-screen overflow-hidden overflow-x-hidden">
                        <div className="md:h-[480px] lg:h-[500px] h-[700px] relative w-screen overflow-hidden ">
                            <img src={item.image} alt={item.titulo} className="w-screen object-cover" />
                            <div className="absolute top-0 flex flex-col items-start justify-around px-[60px] pt-[40px] bg-gradient-to-r from-orange-300 from-[0%] to-yellow-100 bg-clip-text text-transparent">
                                <h2 className="w-[80%] text-[38px] md:text-[60px] tracking-tight font-Instrument font-light bg-gradient-to-r from-orange-300 from-[0%] to-[80%] to-yellow-100 bg-clip-text text-transparent">{item.titulo}</h2>
                                <p className="text-white font-Inter font-extralight text-[16px] md:text-[16px] lg:text-[20px]">{item.line1} <br /> <br /> {item.line2} <br /> <br /> {item.line3} <br /> <br /> {item.line4} </p>
                                <a href="https://wa.me/+5511996669191" target="_blank" className='border mt-7 flex items-center justify-center text-[15px] font-Inter w-[200px] border-amber-200 text-white p-3.5 font-light hover:bg-amber-200 hover:text-amber-900 transition duration-200'>SAIBA MAIS</a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Servicos;
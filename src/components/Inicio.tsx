// pasta inicio.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// O TypeScript trata as importações de imagens como string, o que é o comportamento esperado.
import backgroundMobile from "../assets/backgroundMobile.jpg";
import logoZap from "../assets/logoZap.jpg";
import backgroundInicio from "../assets/backgroundInicio.jpg";
import backgroundInicioXL from "../assets/backgroundInicioXL.jpg";

// O componente Header não recebe props, então não é necessária uma interface de props.
function Inicio() {
    // O TypeScript infere o tipo 'boolean' para showContent
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Ativa as animações apenas na primeira vez que entra
        // O `setTimeout` retorna um `NodeJS.Timeout` (em ambiente Node) ou um `number` (em ambiente Browser).
        // O TypeScript do React lida com isso perfeitamente.
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500); // atraso para dar tempo de mostrar só o fundo
        
        // O `clearTimeout` espera o valor retornado pelo `setTimeout`.
        return () => clearTimeout(timer);
    // O array de dependências vazio garante que este efeito rode apenas uma vez (no mount).
    }, []);

    return (
        <section
            id="Inicio"
            className="bg-transparent py-[100px] md:py-[200px] lg:py-[200px] xl:py-[350px] xl:h-screen scroll-smooth md:mt-0 left-0 w-screen flex flex-col pb-[100px] px-5 md:flex-row md:justify-center md:gap-10 md:items-center"
        >
            {/* Fundo */}
            <img src={backgroundMobile} alt="fundo imagem de prédios empresas advocacia" className="absolute top-0 w-screen left-0 z-[-2] md:hidden" />
            <img src={backgroundInicio} alt="fundo prédios empresa advocacia" className="absolute top-0 left-0 z-[-2] md:block xl:hidden hidden object-cover" />
            <img src={backgroundInicioXL} alt="fundo prédios empresa advocacia" className="absolute top-0 left-0 z-[-2] xl:block hidden object-cover" />

            {/* Nome - desliza da esquerda para direita */}
            <motion.div
                className="text-amber-200"
                initial={{ x: -200, opacity: 0 }}
                animate={showContent ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h1 className="text-[90px] font-Italiana bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent md:text-[110px] md:leading-[100px] lg:text-[150px] leading-[90px] lg:leading-[130px] xl:leading-[150px] font-normal xl:text-[170px]">
                    Viviane <br /> Luiz <br /> Macedo
                </h1>
            </motion.div>

            {/* Restante do conteúdo - fade in */}
            <motion.div
                className="max-w-[550px] gap-16 max-h-[500px]"
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 1 }}
            >
                <h2 className="bg-linear-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent text-[20px] tracking-[15px] font-Inter font-medium lg:text-[35px]">ADVOCACIA</h2>
                <p className="text-amber-200 text-[17px] lg:text-[22px] w-full mt-5 mb-[25px] font-Inter font-extralight">
                    Compliance estratégico e jurídico para mitigar riscos e impulsionar governança.
                </p>
                <p className="text-white w-full text-[16px] font-Inter font-extralight lg:text-[20px]">
                    Atuação especializada em Direito Empresarial focada na integridade corporativa, prevenção de riscos e conformidade regulatória.
                </p>
                <div className="md:flex md:justify-between mt-[50px] gap-7 w-full">
                    <a
                        href="https://wa.me/+5511996669191"
                        target="_blank"
                        className="w-full md:w-[50%] mt-[30px] bg-lime-300 flex items-center justify-center h-[60px] text-[15px] text-amber-950 font-light hover:bg-lime-200 hover:border hover:border-lime-300 transition duration-200"
                    >
                        <p className="font-Inter">MARQUE UMA CONSULTORIA</p>
                        <img src={logoZap} alt="imagem whatsapp" className="w-[30px]" />
                    </a>

                    <a
                        href="https://drive.google.com/file/d/1XoO8A1yM0cWZCtKtdtj86oHj6Ijh19OJ/view?usp=sharing"
                        target="_blank"
                        className="w-full md:w-[50%] mt-[30px] bg-transparent border border-amber-200 flex items-center justify-center h-[60px] text-[15px] text-amber-200 font-light hover:bg-amber-200/90 hover:text-amber-950 transition duration-200"
                    >
                        <p className="font-Inter">HISTÓRICO</p>
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

export default Inicio;
import logoHead from "../assets/logoHead.png";
import { useEffect, useState } from "react";
// Importe React para tipagem explícita se desejar, mas não é estritamente necessário
// para componentes de função simples como este no TSX moderno.

// O TypeScript infere o tipo de 'scrolled' como boolean porque o valor inicial é 'false'.
function Header() {
    const [scrolled, setScrolled] = useState(false);

    // Tipagem da função não é necessária, pois ela é inferida corretamente
    // (não recebe argumentos e não retorna nada).
    const checkScrollPosition = () => {
        // window.scrollY já é do tipo number.
        if (window.scrollY > 80)
            setScrolled(true);
        else
            setScrolled(false);
    };

    // Não há alterações no useEffect, pois a tipagem das funções de callback é inferida.
    useEffect(() => {
        // window.addEventListener e window.removeEventListener são tipados globalmente.
        window.addEventListener('scroll', checkScrollPosition);
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    // Adicionar um array de dependências vazio (`[]`) é uma boa prática
    // para indicar que o efeito só deve rodar no 'mount' e 'unmount',
    // embora o seu código original omita isso, o que é aceitável se
    // a intenção é re-executar em cada render.
    // Se a intenção é rodar apenas uma vez, mude para:
    // }, []);
    });

    return (
        <header id="Header" className={`fixed scroll-smooth transition duration-500 z-5 top-0 w-screen px-[20px] xl:px-[45px] flex justify-between items-center ${scrolled ? 'bg-cyan-950/80 backdrop-blur-lg h-[65px] shadow-lg' : 'bg-transparent h-[100px]'}`}>
            <div className="flex flex-row-reverse justify-between w-full items-center gap-3">
                <div className=" flex flex-col items-end md:flex-row-reverse">
                    <a href="https://www.instagram.com/dra.v_luizmacedoadvogada/" target="_blank" className="text-white font-Inter font-extralight md:pl-[25px] text-[12px] md:text-[18px]">@dra.v_luizmacedoadvogada</a>
                    <a href="https://www.linkedin.com/in/viviane-luiz-macedoadvogada/" target="_blank" className="text-white font-Inter font-extralight md:pr-[25px] md:border-r-white md:border-r text-[12px] md:text-[18px]">linkedin.com/in/viviane-luiz-macedoadvogada</a>
                </div>
                <a href="#Inicio">
                    <img src={logoHead} alt="logo" className={` transition duration-1000 ${scrolled ? 'w-[50px] h-[50px]' : 'w-[50px] h-[50px]'}`} />
                </a>
            </div>
        </header>
    );
}

export default Header;
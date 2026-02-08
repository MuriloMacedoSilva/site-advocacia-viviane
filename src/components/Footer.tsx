// Footer.tsx

// Importações de ícones e imagem mantêm a sintaxe JS, pois os tipos são conhecidos pelo TypeScript/React.
import { /*FaFacebookF,*/ FaInstagram, FaLinkedinIn, FaWhatsapp, /*FaPhoneAlt,*/ FaEnvelope } from "react-icons/fa";
import logoHead from "../assets/logoHead.jpg";

// Usamos 'export default function Footer()' em vez de 'export default Footer'
// com a função definida separadamente. Ambas são válidas, mas manteremos a
// estrutura da sua função original, apenas mudando o nome do arquivo.

export default function Footer() {
    return (
        <footer className="bg-linear-to-b from-black to-mar border-t border-amber-200 text-white py-10 relative bottom-0">
            <div className="container mx-auto px-2.5 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Logo e endereço */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img
                        src={logoHead}
                        alt="Logo advocacia"
                        className="w-[150px] mb-4"
                    />
                    <p className="max-w-xs">
                        São Paulo - SP
                    </p>

                    <div className="flex gap-4 mt-4">
                        <a href="https://www.instagram.com/dra.v_luizmacedoadvogada/" target="_blank" className="bg-white text-[#6B2B2B] p-2 rounded-full hover:bg-gray-200 transition">
                            <FaInstagram size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/viviane-luiz-macedobr/" target="_blank" className="bg-white text-[#6B2B2B] p-2 rounded-full hover:bg-gray-200 transition">
                            <FaLinkedinIn size={18} />
                        </a>
                        {/* Se necessário, adicione outros ícones do React Icons aqui */}
                    </div>
                </div>

                {/* Contato */}
                <div className="text-center">
                    <h3 className="text-[30px] font-normal mb-4">Contate-nos</h3>
                    <a href="https://wa.me/5511996669191" target="_blank">
                        <p className="flex items-center justify-center gap-2 mb-2 font-Inter text-[18px] font-light">
                            <FaWhatsapp /> (11) 99666-9191
                        </p>
                    </a>
                    <a href="mailto:vivianemacedoadv@adv.oabsp.org.br">
                        <p className="flex items-center justify-center gap-2 font-Inter text-[18px] font-light">
                            <FaEnvelope /> vivianemacedoadv@adv.oabsp.org.br
                        </p>
                    </a>
                </div>

                {/* Espaço vazio para alinhamento */}
                <div></div>
            </div>

            {/* Botão flutuante do WhatsApp */}
            <a
                href="https://wa.me/5511996669191"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed z-1000 bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition"
            >
                <FaWhatsapp size={24} className="text-white" />
            </a>
        </footer>
    );
}
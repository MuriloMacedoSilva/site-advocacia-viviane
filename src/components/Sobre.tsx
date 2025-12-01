// Sobre.tsx

// O TypeScript infere que estas importações são do tipo string (caminhos de imagem).
import VivianeFoto1 from "../assets/VivianeFoto1.png";
import logoHead from "../assets/logoHead.png";

function Sobre() {
    return (
        <section className="flex flex-col lg:flex-row justify-end items-center bg-linear-to-b md:from-black/80 to-20% md:to-black from-black/90 to-black pt-[70px] pb-[50px] px-1.5">
            <div className="flex border lg:flex-row flex-col md:m-0 m-auto border-amber-200 w-full md:gap-25 relative py-3.5 px-7">
                <div>
                    <img src={VivianeFoto1} alt="" className="min-w-[250px] w-[480px] md:m-0 m-auto" />
                </div>
                <div className="flex flex-col items-start max-w-[550px] px-2.5">
                    <h2 className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent font-Italiana text-[50px]">
                        Viviane Luiz Macedo
                    </h2>
                    <h3 className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent font-Inter text-[28px] tracking-[7px] font-light">
                        ADVOCACIA
                    </h3>
                    <p className="w-full text-white font-Inter text-[17px] font-light">Fundado com a convicção de que a advocacia empresarial deve ir além das abordagens tradicionais, o escritório alia conhecimento jurídico sólido a uma <strong className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent">visão estratégica e inovadora</strong>. Sob a condução da advogada <strong className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent font-Italiana text-[21px]">Viviane Luiz Macedo</strong>, a atuação é pautada pela <strong className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent">excelência e pela personalização no atendimento a empresas e empreendedores</strong>.
                        <br /> <br />
                        Com forte atuação nas áreas de Direito <strong className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent">Empresarial, Contratual, Cível e Tributário</strong>, o escritório está em constante evolução para atender às novas demandas do mercado, incorporando a <strong className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent">tecnologia</strong> como pilar essencial para os negócios contemporâneos. Reconhecendo a importância da transformação digital, oferece soluções jurídicas alinhadas às necessidades de um cenário empresarial em constante mudança.</p>
                    <a href="https://wa.me/+5511996669191" target="_blank" className="bg-amber-200 p-5 cursor-pointer hover:bg-amber-100 transition duration-200 mt-6">TRANSFORME SEU NEGÓCIO</a>
                </div>
                <div className="h-full top-0 flex right-0 absolute flex-col items-center justify-end">
                    <img src={logoHead} alt="logo" className="max-w-[100px] hidden md:block" />
                </div>
            </div>
        </section>
    );
}

export default Sobre;
// Topics.tsx

// O TypeScript infere que estas importações são do tipo string (caminhos de imagem).
import tech from "../assets/tech.jpg";
import pessoas from "../assets/pessoas.jpg";
import olho from "../assets/olho.jpg";

function Topics() {
    return (
        <section className="bg-linear-to-b from-black/80 to-black/80 w-screen items-center justify-center gap-15 flex flex-col px-[30px] pt-[45px] pb-[60px]">
            <h2 className="m-auto text-[36px] font-Inter font-medium bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent border-t border-amber-200/40 pt-8" >Aqui você encontra</h2>
            <div className="flex flex-col w-full md:flex-row gap-1.5 items-baseline-last justify-around">
                <div className="flex flex-col justify-items-start p-6 gap-3 max-w-[400px]">
                    <img src={olho} alt="" className="w-[50px] h-[50px]" />
                    <h2 className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent text-[29px] font-Inter w-full">Visão Estratégica e Inovadora</h2>
                    <p className="text-white text-[18px] w-full">O escritório alia conhecimento jurídico sólido a uma visão estratégica e inovadora</p>
                </div>
                <div className="flex flex-col justify-items-start p-6 gap-3 max-w-[400px]">
                    <img src={pessoas} alt="" className="w-[50px] h-[50px]" />
                    <h2 className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent text-[29px] font-Inter w-full border-[6px] ">Atendimento Personalizado</h2>
                    <p className="text-white text-[18px] w-full">A atuação é pautada pela excelência e pela personalização no atendimento a empresas e empreendedores.</p>
                </div>
                <div className="flex flex-col justify-items-start p-6 gap-3 max-w-[400px]">
                    <img src={tech} alt="" className="w-[50px] h-[50px]" />
                    <h2 className="bg-linear-to-r from-orange-300 from-0% to-80% to-yellow-200 bg-clip-text text-transparent text-[29px] font-Inter w-full border-y-24">Tecnologia</h2>
                    <p className="text-white text-[18px] w-full">Incorporando a tecnologia como pilar essencial para os negócios contemporâneos.</p>
                </div>
            </div>
        </section>
    );
}

export default Topics;
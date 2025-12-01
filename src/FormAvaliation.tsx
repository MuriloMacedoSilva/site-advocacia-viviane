import React, { useState } from 'react';
// Tipos de Eventos do React
import type { ChangeEvent, FormEvent } from 'react';
// Ícones do Lucide
import { ChevronLeft, Star } from 'lucide-react'; 
// Importamos o Footer, assumindo que ele está em ./components/Footer.tsx
import Footer from "./components/Footer.tsx"; 

// --- 1. INTERFACES DE TIPAGEM ---

// 1.1. Interface para o estado do formulário
interface FormData {
    nome: string;
    dia: string;
    mes: string;
    ano: string;
    avaliacao: string;
    nota: number;
}

// 1.2. Interface para o estado da mensagem de feedback
type MessageType = 'success' | 'error' | 'info';

interface MessageState {
    type: MessageType;
    text: string;
}

// 1.3. Interface para as props do componente RatingInput
interface RatingInputProps {
    rating: number;
    setRating: (newRating: number) => void; // A função que atualiza a nota
}

// --- 2. COMPONENTE RATING INPUT (ENTRADA DE NOTA) ---

// Usamos React.FC para tipar o componente funcional
const RatingInput: React.FC<RatingInputProps> = ({ rating, setRating }) => {
    const maxRating = 5;
    const stars = Array(maxRating).fill(0);

    return (
        <div className="flex space-x-1">
            {stars.map((_, index) => {
                const value = index + 1;
                const isFilled = value <= rating;

                return (
                    <Star
                        key={value}
                        size={24}
                        className={`cursor-pointer transition-colors duration-200 ${
                            isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-400'
                        }`}
                        onClick={() => setRating(value)}
                        // Lógica para desmarcar se clicar na primeira estrela já marcada
                        onDoubleClick={() => setRating(value === 1 && rating === 1 ? 0 : value)}
                    />
                );
            })}
        </div>
    );
};

// --- 3. COMPONENTE PRINCIPAL (FORMULÁRIO) ---

const FormAvaliation: React.FC = () => {
    // Endpoint da API (valor corrigido no código original)
    const API_ENDPOINT = 'https://api-viviane.onrender.com/avaliacao'; 

    // Estado do formulário, tipado com a interface FormData
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        dia: '',
        mes: '',
        ano: '',
        avaliacao: '',
        nota: 0,
    });
    
    // Estado de envio e mensagem, tipados
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageState | null>(null);

    // Tipagem: ChangeEvent que pode vir de um Input (HTMLInputElement) ou Textarea (HTMLTextAreaElement)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Tipagem: A nota é um número
    const handleRatingChange = (newRating: number) => {
        setFormData(prev => ({ ...prev, nota: newRating }));
    };

    // Tipagem: O evento de submit é um FormEvent
    const handleSubmit = async (e: FormEvent) => { 
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // 1. Validação simples de nota
        if (formData.nota === 0) {
            setMessage({ type: 'error', text: 'Por favor, selecione uma nota de 1 a 5 estrelas.' });
            setIsSubmitting(false);
            return;
        }

        // 2. Preparar dados para a API (garantindo que dia/mes tenham 2 dígitos)
        const dataToSend = {
            nome: formData.nome, 
            dia: formData.dia.toString().padStart(2, '0'), 
            mes: formData.mes.toString().padStart(2, '0'), 
            ano: formData.ano.toString(), 
            avaliacao: formData.avaliacao, 
            nota: formData.nota, 
        };
        
        console.log('Dados a enviar:', dataToSend);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let detail = `Status: ${response.status}. Detalhe: ${errorText}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    detail = `Status: ${response.status}. Mensagem API: ${errorJson.message || JSON.stringify(errorJson)}`;
                } catch (e) {
                    // Se não for JSON, usa o texto puro
                }
                throw new Error(`Falha no envio da avaliação. ${detail}`);
            }

            // Sucesso no envio
            setMessage({ type: 'success', text: 'Sua avaliação foi enviada com sucesso! Agradecemos o seu feedback.' });
            
            // 3. Resetar o formulário
            setFormData({
                nome: '',
                dia: '',
                mes: '',
                ano: '',
                avaliacao: '',
                nota: 0,
            });

        } catch (error) {
            console.error('Erro ao enviar avaliação:', error);
            // TypeScript garante que 'error' seja tratado, mas para segurança, usamos 'as Error'
            const errorMessage = (error as Error).message || 'Verifique a conexão de rede.'; 
            setMessage({ 
                type: 'error', 
                text: `Ocorreu um erro ao enviar. Mensagem: ${errorMessage}` 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        // Ação de Voltar - usa o histórico do navegador
        if (window.history.length > 1) {
            window.history.back();
        } else {
            console.log('Ação de Voltar: Não há histórico anterior para voltar.');
            setMessage({ type: 'info', text: 'Simulação de Voltar: Não há página anterior no histórico do navegador.' });
        }
    };

    // Estilos Tailwind
    const inputStyle = "w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder-gray-500";
    const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
    
    return (
        <div>
            <div className="min-h-screen bg-gray-950 p-4 sm:p-8 flex items-center justify-center font-sans">
                <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm p-6 sm:p-10 rounded-xl shadow-2xl border border-yellow-800/20">
                    
                    {/* Botão Voltar */}
                    <button
                    onClick={handleGoBack}
                    className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-6 text-sm sm:text-base"
                    aria-label="Voltar para a página anterior"
                    >
                    <ChevronLeft size={20} className="mr-1" />
                    Voltar para a página anterior
                    </button>

                    {/* Título Principal */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-300 to-yellow-600 text-transparent bg-clip-text font-Italiana font-bold">
                    Nos Avalie
                    </h1>

                    {/* Mensagens de Feedback */}
                    {message && (
                    <div className={`p-3 rounded-lg mb-4 ${
                        message.type === 'success' 
                        ? 'bg-green-600/20 text-green-300' 
                        : message.type === 'error'
                        ? 'bg-red-600/20 text-red-300'
                        : 'bg-blue-600/20 text-blue-300' // 'info'
                    }`}>
                        {message.text}
                    </div>
                    )}

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Campo Nome */}
                    <div>
                        <label htmlFor="nome" className={labelStyle}>Nome Completo</label>
                        <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={inputStyle}
                        required
                        placeholder="Digite seu nome"
                        />
                    </div>

                    {/* Campo Data Atual (Dia, Mês, Ano) */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                        <label htmlFor="dia" className={labelStyle}>Dia</label>
                        <input
                            type="number"
                            id="dia"
                            name="dia"
                            value={formData.dia}
                            onChange={handleInputChange}
                            className={inputStyle}
                            required
                            min="1"
                            max="31"
                            placeholder="DD"
                        />
                        </div>
                        <div>
                        <label htmlFor="mes" className={labelStyle}>Mês</label>
                        <input
                            type="number"
                            id="mes"
                            name="mes"
                            value={formData.mes}
                            onChange={handleInputChange}
                            className={inputStyle}
                            required
                            min="1"
                            max="12"
                            placeholder="MM"
                        />
                        </div>
                        <div>
                        <label htmlFor="ano" className={labelStyle}>Ano</label>
                        <input
                            type="number"
                            id="ano"
                            name="ano"
                            value={formData.ano}
                            onChange={handleInputChange}
                            className={inputStyle}
                            required
                            min="2020" 
                            max={new Date().getFullYear()}
                            placeholder="AAAA"
                        />
                        </div>
                    </div>
                    
                    {/* Campo Texto de Avaliação */}
                    <div>
                        <label htmlFor="avaliacao" className={labelStyle}>Texto da Avaliação</label>
                        <textarea
                        id="avaliacao"
                        name="avaliacao"
                        value={formData.avaliacao}
                        onChange={handleInputChange}
                        rows={5}
                        className={`${inputStyle} resize-none`}
                        required
                        placeholder="Compartilhe sua experiência e feedback..."
                        ></textarea>
                    </div>

                    {/* Campo Nota de 0 a 5 */}
                    <div>
                        <label className={labelStyle}>Nota de 0 a 5 <span className="text-red-400">*</span></label>
                        <RatingInput rating={formData.nota} setRating={handleRatingChange} />
                        <p className="mt-2 text-sm text-gray-500">
                        {formData.nota} {formData.nota === 1 ? 'estrela selecionada' : 'estrelas selecionadas'}
                        </p>
                    </div>

                    {/* Botão de Envio (Estilo Dourado/Contraste) */}
                    <button
                        type="submit"
                        disabled={isSubmitting || formData.nota === 0}
                        className={`w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 
                        ${isSubmitting || formData.nota === 0
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-lg shadow-yellow-500/30'
                        }`}
                    >
                        {isSubmitting ? 'Enviando Avaliação...' : 'Enviar Avaliação'}
                    </button>
                    </form>
                </div>
                </div>
                <Footer/>
        </div>
    );
};

export default FormAvaliation;
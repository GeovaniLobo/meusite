import React, { useState, useEffect } from 'react';
import { Wrench, Mail, Send, CheckCircle } from 'lucide-react';

export default function EmConstrucao() {
  const [tempoRestante, setTempoRestante] = useState({
    dias: 15,
    horas: 8,
    minutos: 45,
    segundos: 30
  });

  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante(prev => {
        if (prev.segundos > 0) {
          return { ...prev, segundos: prev.segundos - 1 };
        } else if (prev.minutos > 0) {
          return { ...prev, minutos: prev.minutos - 1, segundos: 59 };
        } else if (prev.horas > 0) {
          return { ...prev, horas: prev.horas - 1, minutos: 59, segundos: 59 };
        } else if (prev.dias > 0) {
          return { ...prev, dias: prev.dias - 1, horas: 23, minutos: 59, segundos: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEnviado(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Efeitos de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-87.5 h-87.5 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Cabeçalho */}
      <header className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wider">
          <span className="text-cyan-400">&lt;</span>
          <span>GeoLobo.dev</span>
          <span className="text-cyan-400">/&gt;</span>
        </div>
        <span className="text-xs font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 px-3 py-1 rounded-full">
          v1.0 em breve
        </span>
      </header>

      {/* Conteúdo Principal */}
      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center z-10">
        
        {/* Ícone Animado */}
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-cyan-950/20">
          <Wrench className="w-10 h-10 text-cyan-400 animate-bounce" />
        </div>

        {/* Títulos */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Algo incrível está <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">chegando.</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Estou estruturando cada linha de código com <span className="text-cyan-300 font-medium">React</span>, <span className="text-cyan-300 font-medium">Tailwind CSS</span> e <span className="text-cyan-300 font-medium">JavaScript</span> para trazer a melhor experiência em breve.
        </p>

        {/* Contador Regressivo */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 mb-12 w-full max-w-md">
          {[
            { label: 'Dias', valor: tempoRestante.dias },
            { label: 'Horas', valor: tempoRestante.horas },
            { label: 'Minutos', valor: tempoRestante.minutos },
            { label: 'Segundos', valor: tempoRestante.segundos }
          ].map((item, index) => (
            <div key={index} className="bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center shadow-lg">
              <span className="text-2xl md:text-4xl font-bold font-mono text-cyan-400">
                {String(item.valor).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Formulário de Notificação */}
        <div className="w-full max-w-md">
          {enviado ? (
            <div className="bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 p-4 rounded-xl flex items-center justify-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Obrigado! Avisarei assim que estiver no ar.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  placeholder="Seu melhor e-mail..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>Avise-me</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </main>

      {/* Rodapé */}
      <footer className="w-full max-w-6xl mx-auto p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 z-10 border-t border-slate-900">
        <p>© {new Date().getFullYear()} — Construído com dedicação.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/GeovaniLobo" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/geovanilobo/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>

    </div>
  );
}
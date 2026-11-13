// src/components/ProjectGrid.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [password, setPassword] = useState('');

  // Formulário de nova publicação
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  // Modal de detalhes
  const [selectedProject, setSelectedProject] = useState(null);

  const ADMIN_SECRET = 'geolobo2026';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setIsAdmin(true);
      setIsLoginOpen(false);
      setPassword('');
      alert('Login de Administrador realizado com sucesso! 🚀');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title || !image) return;

    try {
      const newProject = {
        title,
        image,
        description,
        project_url: projectUrl,
        likes: 1
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();

      if (error) throw error;

      if (data) {
        setProjects([data[0], ...projects]);
      }

      setTitle('');
      setImage('');
      setDescription('');
      setProjectUrl('');
      setIsPostOpen(false);
    } catch (error) {
      alert('Erro ao cadastrar projeto: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-100">
      
      {/* HEADER / PERFIL */}
      <div className="flex flex-col items-center text-center mb-8">
        {/* Foto de Perfil com Borda Gradiente */}
        <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 mb-4 shadow-xl">
          <div className="w-full h-full rounded-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img 
              src="https://i.imgur.com/xobLknJ.jpeg" 
              alt="Geovani Lobo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-xl font-bold tracking-tight">geolobo.dev</h1>
        
        {/* Status / Tags */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
          <span><strong className="text-white">{projects.length}</strong> posts</span>
          <span>•</span>
          <span className="bg-zinc-800/80 px-2.5 py-0.5 rounded-full text-zinc-300 font-medium">ADS Estácio</span>
          <span>•</span>
          <span>Belém 📍</span>
        </div>

        {/* Bio */}
        <p className="text-sm font-medium text-zinc-200 mt-3 max-w-md">
          Geovani Lobo | Dev Front-End Jr.
        </p>
        <p className="text-xs text-zinc-400 mt-1">
          Transformando ideias em código com React, Vite & Tailwind. 🚀
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {['JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase'].map((tech) => (
            <span key={tech} className="text-[10px] bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-zinc-300 font-mono">
              {tech}
            </span>
          ))}
        </div>

        {/* Botões de Ação do Topo */}
        <div className="flex gap-3 mt-5">
          <button 
            onClick={() => setIsContactOpen(true)}
            className="bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-5 py-2 rounded-lg transition text-white border border-zinc-700 shadow"
          >
            Contato
          </button>
          <a 
            href="https://github.com/GeovaniLobo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-5 py-2 rounded-lg transition text-white border border-zinc-700 shadow flex items-center justify-center"
          >
            Repositórios ↗
          </a>
        </div>
      </div>

      {/* Abas e Ações de Admin */}
      <div className="flex justify-between items-center border-t border-zinc-800 mb-6 pt-2">
        <div className="flex gap-12 text-xs font-semibold tracking-wider text-zinc-400">
          <button className="flex items-center gap-2 py-3 border-t-2 border-white text-white -mt-[1px]">
            <span>PROJETOS ({projects.length})</span>
          </button>
        </div>
        
        {isAdmin ? (
          <button 
            onClick={() => setIsPostOpen(true)}
            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow"
          >
            + Novo Projeto
          </button>
        ) : (
          <span className="text-[11px] text-zinc-600 italic">Área pública (Visitante)</span>
        )}
      </div>

      {/* Modal de Contato */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-sm w-full p-6 text-zinc-100 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold">Vamos conversar? 📬</h3>
            <p className="text-xs text-zinc-400">Estou em busca de oportunidades como Desenvolvedor Júnior. Entre em contato por:</p>
            
            <div className="space-y-2 pt-2">
              <a 
                href="https://wa.me/5591900000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold py-2.5 rounded-lg transition text-white"
              >
                💬 WhatsApp Profissional
              </a>
              <a 
                href="mailto:geovani@geolobo.dev" 
                className="block text-center bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold py-2.5 rounded-lg transition text-zinc-200 border border-zinc-700"
              >
                ✉️ Enviar E-mail
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-sky-700 hover:bg-sky-600 text-xs font-semibold py-2.5 rounded-lg transition text-white"
              >
                💼 LinkedIn
              </a>
            </div>

            <div className="text-right pt-2">
              <button 
                onClick={() => setIsContactOpen(false)}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-sm w-full p-6 text-zinc-100 shadow-2xl">
            <h3 className="text-lg font-semibold mb-2">Acesso Restrito 🔒</h3>
            <p className="text-xs text-zinc-400 mb-4">Digite a senha de administrador.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                required
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsLoginOpen(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-3 py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-sky-600 hover:bg-sky-500 text-xs font-semibold px-3 py-2 rounded-lg transition"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Nova Publicação */}
      {isPostOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 text-zinc-100 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Criar nova publicação</h3>
            
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Título do Projeto</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Portfólio Dev"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">URL da Imagem de Capa</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Link do Site / Projeto</label>
                <input 
                  type="url" 
                  value={projectUrl} 
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Descrição / Legenda</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tecnologias..."
                  rows="3"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsPostOpen(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-sky-600 hover:bg-sky-500 text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                  Publicar no Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-lg w-full p-6 text-zinc-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{selectedProject.title}</h3>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black border border-zinc-800">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
            </div>

            <p className="text-xs text-zinc-300">{selectedProject.description || "Sem descrição informada."}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-zinc-800">
              <a 
                href={selectedProject.image} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-center bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold py-2.5 rounded-lg transition text-zinc-200 border border-zinc-700"
              >
                🔍 Ver Imagem em Tela Cheia
              </a>
              
              {selectedProject.project_url ? (
                <a 
                  href={selectedProject.project_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-sky-600 hover:bg-sky-500 text-xs font-semibold py-2.5 rounded-lg transition text-white"
                >
                  🚀 Visitar Projeto / Site
                </a>
              ) : (
                <span className="flex-1 text-center bg-zinc-900 text-zinc-600 text-xs py-2.5 rounded-lg cursor-not-allowed border border-zinc-800">
                  Link indisponível
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grade de Projetos Perfeita (Aspect Square Padronizado) */}
      {loading ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-sm">Carregando projetos...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-zinc-600 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-sm font-medium">Nenhum projeto cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="relative group aspect-square bg-zinc-900 overflow-hidden cursor-pointer rounded-sm border border-zinc-900"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-2 text-center text-white">
                <span className="font-bold text-xs md:text-sm mb-1">{project.title}</span>
                <p className="text-[10px] md:text-xs text-zinc-300 line-clamp-2 px-2">{project.description}</p>
                <span className="mt-2 text-xs font-semibold">❤️ {project.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rodapé e Atalho Admin */}
      <div className="mt-16 text-center">
        <button 
          onClick={() => setIsLoginOpen(true)}
          className="text-[10px] text-zinc-600 hover:text-zinc-400 transition tracking-widest uppercase"
        >
          geolobo.dev © 2026 • Admin Access
        </button>
      </div>

    </div>
  );
}
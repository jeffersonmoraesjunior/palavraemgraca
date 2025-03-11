import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, informe um e-mail válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Por favor, informe o assunto';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, escreva sua mensagem';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Sua mensagem deve ter pelo menos 20 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro do campo que está sendo editado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulação de envio do formulário
      // Em um ambiente real, você faria uma chamada de API aqui
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpa o formulário após o envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitSuccess(true);
      
      // Esconde a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para gerar os itens do breadcrumb
  const getBreadcrumbItems = () => {
    return [
      { name: 'Início', path: '/', isLast: false },
      { name: 'Contato', path: '/contato', isLast: true }
    ];
  };

  return (
    <>
      <Helmet>
        <title>Entre em Contato | Palavra em Graça - Fale Conosco</title>
        <meta name="description" content="Entre em contato com a equipe do Palavra em Graça. Estamos aqui para ouvir suas dúvidas, sugestões, testemunhos e feedback sobre nosso aplicativo de versículos bíblicos personalizados." />
        <meta name="keywords" content="contato, fale conosco, suporte, palavra em graça, dúvidas, sugestões, testemunhos, feedback, atendimento cristão" />
        <link rel="canonical" href="https://palavraemgraca.com.br/contato" />
        <meta property="og:title" content="Entre em Contato | Palavra em Graça - Fale Conosco" />
        <meta property="og:description" content="Entre em contato com a equipe do Palavra em Graça. Estamos aqui para ouvir suas dúvidas, sugestões e feedback." />
        <meta property="og:url" content="https://palavraemgraca.com.br/contato" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://palavraemgraca.com.br/og-image-contact.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Entre em Contato | Palavra em Graça - Fale Conosco" />
        <meta name="twitter:description" content="Entre em contato com a equipe do Palavra em Graça. Estamos aqui para ouvir suas dúvidas, sugestões e feedback." />
        <meta name="twitter:image" content="https://palavraemgraca.com.br/twitter-image-contact.jpg" />
        
        {/* Schema.org markup para melhor SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Entre em Contato | Palavra em Graça",
            "description": "Entre em contato com a equipe do Palavra em Graça. Estamos aqui para ouvir suas dúvidas, sugestões e feedback.",
            "publisher": {
              "@type": "Organization",
              "name": "Palavra em Graça",
              "logo": "https://palavraemgraca.com.br/logo.svg"
            },
            "mainEntity": {
              "@type": "Organization",
              "name": "Palavra em Graça",
              "email": "contato@palavraemgraca.com.br",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contato@palavraemgraca.com.br",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                "https://facebook.com/amigodedeus",
                "https://instagram.com/amigodedeus",
                "https://youtube.com/amigodedeus"
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={getBreadcrumbItems()} />

        <h1 className="text-3xl font-bold mb-6 text-center">Entre em Contato</h1>
        
        {/* Introdução com palavras-chave relevantes para SEO */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <p className="text-lg">
            Estamos aqui para ouvir você! Seja para compartilhar um testemunho, tirar dúvidas sobre o Palavra em Graça, 
            ou sugerir melhorias para nosso aplicativo de versículos bíblicos personalizados.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <section className="mb-8" id="sobre-contato">
              <h2 className="text-2xl font-semibold mb-4">Fale Conosco</h2>
              <p className="mb-4">
                Estamos sempre abertos para ouvir suas dúvidas, sugestões, testemunhos ou feedback sobre o 
                Palavra em Graça. Sua opinião é muito importante para nós!
              </p>
              <p className="mb-4">
                Preencha o formulário ao lado e entraremos em contato o mais breve possível. Normalmente 
                respondemos em até 48 horas úteis.
              </p>
              <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg my-6">
                <h3 className="font-semibold mb-2">Como podemos ajudar?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Dúvidas sobre o funcionamento do aplicativo</li>
                  <li>Sugestões de melhorias e novos recursos</li>
                  <li>Compartilhamento de testemunhos</li>
                  <li>Reportar problemas técnicos</li>
                  <li>Parcerias e colaborações</li>
                </ul>
              </div>
            </section>
            
            <section className="mb-8" id="informacoes-contato">
              <h2 className="text-2xl font-semibold mb-4">Informações de Contato</h2>
              <div className="space-y-3">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contato@palavraemgraca.com.br</span>
                </p>
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Segunda a Sexta, 9h às 18h</span>
                </p>
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Suas informações estão protegidas pela nossa <Link to="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</Link></span>
                </p>
              </div>
            </section>
            
            <section id="redes-sociais">
              <h2 className="text-2xl font-semibold mb-4">Siga-nos</h2>
              <p className="mb-4">
                Acompanhe nosso conteúdo e novidades nas redes sociais:
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </section>
          </div>
          
          <div id="formulario-contato">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Envie sua mensagem</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                  <p className="font-medium">Mensagem enviada com sucesso!</p>
                  <p className="text-sm mt-1">Agradecemos seu contato. Responderemos o mais breve possível.</p>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${
                    errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Seu nome completo"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${
                    errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="seu.email@exemplo.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Assunto <span className="text-red-600">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${
                    errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvida">Dúvida</option>
                  <option value="Sugestão">Sugestão</option>
                  <option value="Problema técnico">Problema técnico</option>
                  <option value="Testemunho">Testemunho</option>
                  <option value="Outro">Outro</option>
                </select>
                {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensagem <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 ${
                    errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Escreva sua mensagem aqui..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                  isSubmitting
                    ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                }`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
              
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Campos marcados com <span className="text-red-600">*</span> são obrigatórios.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ para melhorar SEO e experiência do usuário */}
        <section className="mt-16" id="faq">
          <h2 className="text-2xl font-semibold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Quanto tempo leva para receber uma resposta?</h3>
              <p>Normalmente respondemos todas as mensagens em até 48 horas úteis. Em períodos de alto volume, pode levar um pouco mais, mas sempre responderemos o mais breve possível.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Como posso reportar um problema técnico?</h3>
              <p>Selecione "Problema técnico" no campo de assunto do formulário e descreva em detalhes o que está acontecendo. Se possível, inclua informações sobre seu dispositivo e navegador.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Posso sugerir novos recursos para o aplicativo?</h3>
              <p>Sim! Adoramos receber sugestões dos nossos usuários. Selecione "Sugestão" no campo de assunto e compartilhe suas ideias conosco.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Como posso compartilhar meu testemunho?</h3>
              <p>Selecione "Testemunho" no campo de assunto e conte-nos como o Palavra em Graça impactou sua vida. Com sua permissão, podemos compartilhar seu testemunho para inspirar outros usuários.</p>
            </div>
          </div>
        </section>

        {/* Links internos para melhorar a navegação e SEO */}
        <div className="mt-12 pt-6 border-t dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Navegue por esta página:</h3>
          <ul className="flex flex-wrap gap-3">
            <li><a href="#sobre-contato" className="text-blue-600 dark:text-blue-400 hover:underline">Fale Conosco</a></li>
            <li><a href="#informacoes-contato" className="text-blue-600 dark:text-blue-400 hover:underline">Informações de Contato</a></li>
            <li><a href="#redes-sociais" className="text-blue-600 dark:text-blue-400 hover:underline">Redes Sociais</a></li>
            <li><a href="#formulario-contato" className="text-blue-600 dark:text-blue-400 hover:underline">Formulário de Contato</a></li>
            <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">Perguntas Frequentes</a></li>
          </ul>
        </div>

        {/* Botão para voltar ao topo */}
        <div className="mt-12 flex justify-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            aria-label="Voltar ao topo da página"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar ao topo
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact; 
// Base de dados de perguntas do quiz
const perguntas = [
    {
      pergunta: "Quantos litros de água devemos beber por dia?",
      opcoes: ["1 litro", "2 litros", "4 litros"],
      correta: 1,
      explicacao: "O ideal é consumir cerca de 2 litros de água por dia para manter o corpo bem hidratado."
    },
    {
      pergunta: "Quantas vezes devemos escovar os dentes por dia?",
      opcoes: ["1 vez", "2 vezes", "3 vezes"],
      correta: 2,
      explicacao: "Devemos escovar os dentes pelo menos 3 vezes ao dia: após o café, almoço e jantar."
    },
    {
      pergunta: "Qual é o tempo mínimo recomendado para lavar as mãos?",
      opcoes: ["5 segundos", "20 segundos", "1 minuto"],
      correta: 1,
      explicacao: "O tempo mínimo para lavar as mãos efetivamente é de 20 segundos com água e sabão."
    },
    {
      pergunta: "Palmeiras Tem Mundial ?",
      opcoes: ["sim ?", "não", "Talvez"],
      correta: 1,
      explicacao: "Chelsea é pai do palmeiras." // O Gemini vai lidar com a resposta real ;)
    }
  ];
  
  let perguntaAtual = 0;
  
  // [REMOVIDO] A const 'conhecimentoIA' foi removida.
  // Usaremos a IA real agora.
  
  // Função para mostrar seções
  function showSection(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
  
    // Remover classe active de todos os botões
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  
    // Mostrar seção selecionada
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(`btn-${sectionId}`).classList.add('active');
  
    // Scroll para o topo quando mudar de seção
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Funções do Quiz (Sem alteração)
  function responder(resultado, resposta) {
    const el = document.getElementById('resposta');
    const proximaBtn = document.getElementById('proxima-btn');
    
    if (resultado === 'certo') {
      el.innerHTML = `
        <div style="background: rgba(76, 175, 80, 0.2); padding: 15px; border-radius: 10px; border-left: 4px solid #4CAF50;">
          <strong>✅ Correto!</strong><br>
          ${perguntas[perguntaAtual].explicacao}
        </div>
      `;
    } else {
      el.innerHTML = `
        <div style="background: rgba(255, 107, 107, 0.2); padding: 15px; border-radius: 10px; border-left: 4px solid #FF6B6B;">
          <strong>❌ Incorreto!</strong><br>
          A resposta correta é: <strong>${perguntas[perguntaAtual].opcoes[perguntas[perguntaAtual].correta]}</strong><br>
          ${perguntas[perguntaAtual].explicacao}
        </div>
      `;
    }
    
    // Desabilitar botões do quiz atual
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    proximaBtn.style.display = 'inline-block';
  }
  
  function proximaPergunta() {
    perguntaAtual = (perguntaAtual + 1) % perguntas.length;
    const pergunta = perguntas[perguntaAtual];
    
    document.getElementById('quiz-content').innerHTML = `
      <p><strong>Pergunta:</strong> ${pergunta.pergunta}</p>
      <div class="quiz-buttons">
        ${pergunta.opcoes.map((opcao, index) => 
          `<button class="quiz-btn" onclick="responder('${index === pergunta.correta ? 'certo' : 'errado'}', '${opcao}')">${opcao}</button>`
        ).join('')}
      </div>
    `;
    
    document.getElementById('resposta').innerHTML = '';
    document.getElementById('proxima-btn').style.display = 'none';
  
    // Re-habilitar botões do quiz
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.disabled = false);
  }
  
  // [REMOVIDO] A função 'encontrarResposta' foi removida.
  
  // Funções do Assistente IA
  // [MODIFICADO] Esta função agora é 'async' e usa 'fetch'
  async function enviarPergunta() {
    const input = document.getElementById('user-input');
    const mensagem = input.value.trim();
    
    if (!mensagem) {
      alert('Por favor, digite uma pergunta.');
      return;
    }
    
    const chatMessages = document.getElementById('chat-messages');
    
    // Adiciona mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `<strong>Você:</strong> ${mensagem}`;
    chatMessages.appendChild(userMsg);
    
    // Limpa input
    input.value = '';
    
    // Mostrar indicador de digitação
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator'; // Damos um ID para facilitar a remoção
    typingIndicator.className = 'message bot-message';
    typingIndicator.innerHTML = '<strong>Assistente:</strong> <em>Digitando...</em>';
    typingIndicator.style.opacity = '0.7';
    chatMessages.appendChild(typingIndicator);
    
    // Rolagem automática para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // ---- CHAMADA À IA REAL ----
    try {
      // 1. Chama o seu backend (que chama o Gemini)
      // Lembre-se que seu 'server.js' deve estar rodando!
      const response = await fetch('http://localhost:3000/perguntar-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pergunta: mensagem }), // Envia a pergunta no corpo
      });
  
      if (!response.ok) {
        throw new Error('Erro na rede ou no servidor.');
      }
  
      const data = await response.json(); // Pega a resposta do backend
      const respostaIA = data.resposta; // A resposta do Gemini
  
      // 2. Remove o "Digitando..."
      const typingEl = document.getElementById('typing-indicator');
      if (typingEl) {
        chatMessages.removeChild(typingEl);
      }
  
      // 3. Adiciona a resposta real da IA
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot-message'; // Removemos a 'message-categoria'
      
      // Usamos 'innerText' para segurança, mas 'innerHTML' funciona se a IA retornar HTML
      // Vamos usar innerHTML para manter a formatação (negrito, etc.) que o Gemini pode enviar
      botMsg.innerHTML = `<strong>Assistente de Saúde:</strong> ${respostaIA}`; 
      chatMessages.appendChild(botMsg);
  
    } catch (error) {
      console.error('Erro ao chamar IA:', error);
      
      // Remove o "Digitando..." em caso de erro
      const typingEl = document.getElementById('typing-indicator');
      if (typingEl) {
        chatMessages.removeChild(typingEl);
      }
  
      // Adiciona mensagem de erro
      const errorMsg = document.createElement('div');
      errorMsg.className = 'message bot-message';
      // Estilo de erro similar ao do quiz
      errorMsg.innerHTML = `
        <div style="background: rgba(255, 107, 107, 0.2); padding: 15px; border-radius: 10px; border-left: 4px solid #FF6B6B;">
          <strong>Assistente:</strong> Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.
        </div>
      `;
      chatMessages.appendChild(errorMsg);
    }
    // -------------------------------
  
    // Rolagem automática para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function limparChat() {
    const chatMessages = document.getElementById('chat-messages');
    const primeiraMensagem = chatMessages.firstElementChild;
    
    // Limpa todas as mensagens exceto a primeira (boas-vindas)
    while (chatMessages.children.length > 1) {
      chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Adiciona mensagem de confirmação
    const clearMsg = document.createElement('div');
    clearMsg.className = 'message bot-message';
    clearMsg.innerHTML = '<strong>Assistente:</strong> Chat limpo! Como posso ajudar você agora?';
    chatMessages.appendChild(clearMsg);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function perguntaExemplo(tipo) {
    const exemplos = {
      alimentacao: "Quantas frutas devo comer por dia?",
      exercicios: "Qual é o melhor exercício para iniciantes?",
      higiene: "Como lavar as mãos corretamente?",
      mental: "Como reduzir o estresse no dia a dia?",
      sono: "Quantas horas de sono preciso?"
    };
    
    const input = document.getElementById('user-input');
    if (input && exemplos[tipo]) {
      input.value = exemplos[tipo];
      // Foca no input
      input.focus();
    }
  }
  
  // Configurar eventos quando a página carregar
  document.addEventListener('DOMContentLoaded', function() {
    showSection('saude');
  
    // Configurar evento Enter no input do chat
    const userInput = document.getElementById('user-input');
    if (userInput) {
      userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          enviarPergunta();
          }
        });
      }
  
    // Lógica para o formulário de feedback (Sem alteração)
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Simula o envio do feedback
        feedbackMessage.innerHTML = '<div style="background: rgba(76, 175, 80, 0.2); padding: 15px; border-radius: 10px; border-left: 4px solid #4CAF50;"><strong>✅ Agradecemos seu feedback!</strong><br>Sua opinião é muito importante para melhorarmos nossos serviços.</div>';
        feedbackForm.reset(); // Limpa o formulário
        
        // Oculta a mensagem após 5 segundos
        setTimeout(() => {
          feedbackMessage.innerHTML = '';
        }, 5000);
        });
      }
  });
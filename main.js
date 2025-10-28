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
      explicacao: "Chelsea é pai do palmeiras."
    }
  ];

  let perguntaAtual = 0;

  // Base de conhecimento da IA sobre saúde
  const conhecimentoIA = {
    saude: {
      "check up": "Recomendo check-ups anuais incluindo: hemograma completo, colesterol, glicemia, pressão arterial e exames específicos conforme idade e histórico familiar.",
      "vacina": "Manter a carteira de vacinação em dia é essencial. Adultos precisam de reforços como dT (difteria/tétano) a cada 10 anos, influenza anual e outras conforme necessidade.",
      "pressão arterial": "A pressão arterial ideal é abaixo de 120/80 mmHg. Pratique exercícios, reduza o sal e mantenha peso saudável para controlar.",
      "consultas": "Faça consultas médicas regulares: clínico geral anual, dentista a cada 6 meses e outros especialistas conforme necessidade.",
      "prevenção": "A prevenção inclui: exames regulares, vacinação, alimentação balanceada, exercícios e evitar hábitos nocivos como fumar.",
      "doenças": "Para prevenir doenças: mantenha higiene, alimentação balanceada, pratique exercícios, durma bem e evite estresse excessivo."
    },
    alimentacao: {
      "dieta": "Uma dieta balanceada deve incluir: frutas, vegetais, proteínas magras, grãos integrais e gorduras saudáveis. Evite processados.",
      "água": "Beba 2-3 litros de água por dia. A hidratação adequada melhora a digestão, pele e função renal.",
      "vitamina": "Vitaminas essenciais: C (frutas cítricas), D (sol/peixes), B (grãos). Consuma alimentos variados para obter todas.",
      "alimentação saudável": "Priorize alimentos naturais: frutas, legumes, carnes magras, ovos, castanhas. Evite industrializados com excesso de sal, açúcar e gordura.",
      "frutas": "Consuma 3-5 porções de frutas por dia. São ricas em vitaminas, fibras e antioxidantes naturais.",
      "proteína": "Inclua proteínas magras: frango, peixe, ovos, leguminosas. Essenciais para músculos e células.",
      "carboidrato": "Prefira carboidratos complexos: arroz integral, batata doce, aveia. Fornecem energia constante."
    },
    exercicios: {
      "exercício": "Recomendo 150 minutos semanais de atividade moderada ou 75 minutos de atividade intensa, mais fortalecimento 2x/semana.",
      "caminhada": "Caminhada é excelente! Comece com 30 minutos dia e aumente gradualmente. Melhora cardiovascular e fortalece músculos.",
      "alongamento": "Alongue-se diariamente, especialmente após exercícios. Mantém flexibilidade e previne lesões.",
      "atividade física": "Encontre atividades que goste: dança, natação, ciclismo, esportes. O importante é se mover regularmente.",
      "musculação": "Fortalece ossos e músculos. Comece com pesos leves e aumente progressivamente com orientação.",
      "corrida": "Corrida melhora capacidade cardiorrespiratória. Comece devagar e aumente distância gradualmente.",
      "yoga": "Yoga combina flexibilidade, força e relaxamento mental. Ótimo para corpo e mente."
    },
    higiene: {
      "lavar as mãos": "Lave as mãos com água e sabão por 20 segundos, especialmente antes de comer e após usar banheiro.",
      "banho": "Tome banho diariamente para remover impurezas e manter a pele saudável.",
      "escovar dentes": "Escove os dentes 3x ao dia e use fio dental. Visite o dentista a cada 6 meses.",
      "higiene pessoal": "Mantenha unhas cortadas, use roupas limpas e lave o rosto 2x ao dia para prevenir acne.",
      "cabelo": "Lave os cabelos conforme necessidade do seu tipo. Use produtos adequados e proteja do sol.",
      "limpeza": "Mantenha casa limpa e arejada. Limpe superfícies regularmente para evitar germes."
    },
    mental: {
      "estresse": "Para reduzir estresse: meditação, exercícios, hobbies, sono adequado e conversar com amigos/profissionais.",
      "ansiedade": "Técnicas de respiração, mindfulness e atividade física ajudam. Se persistir, procure ajuda profissional.",
      "sono": "Dormir 7-9 horas por noite é ideal. Evite telas antes de dormir e mantenha horário regular.",
      "depressão": "Busque apoio: converse com amigos, familiares ou profissional. Atividade física e rotina ajudam no tratamento.",
      "bem estar": "Pratique gratidão, mantenha relacionamentos saudáveis, tenha hobbies e reserve tempo para relaxar.",
      "meditação": "Medite 10-15 minutos por dia. Reduz estresse, melhora concentração e promove paz interior."
    },
    geral: {
      "saudável": "Para uma vida saudável: alimente-se bem, exercite-se, durma adequadamente, gerencie estresse e faça check-ups.",
      "dicas": "Beba água, coma vegetais, mova-se mais, durma bem, gerencie estresse e cultive relacionamentos positivos.",
      "qualidade de vida": "Invista em: saúde física, mental, relacionamentos, propósito de vida e lazer.",
      "prevenir doenças": "Não fume, modere álcool, alimente-se bem, exercite-se, controle peso e faça exames preventivos.",
      "imunidade": "Para imunidade: alimentação balanceada, sono qualidade, exercícios, redução de estresse e hidratação."
    }
  };

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

  // Funções do Quiz
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

  // Funções do Assistente IA
  function encontrarResposta(pergunta) {
    const perguntaLower = pergunta.toLowerCase();
    
    // Procura por palavras-chave em cada categoria
    for (const [categoria, topicos] of Object.entries(conhecimentoIA)) {
      for (const [palavraChave, resposta] of Object.entries(topicos)) {
        if (perguntaLower.includes(palavraChave)) {
          return { resposta, categoria };
        }
      }
    }
    
    // Resposta padrão se não encontrar correspondência
    return { 
      resposta: "Obrigado pela sua pergunta sobre saúde! Para uma orientação mais precisa e personalizada, recomendo consultar um profissional de saúde. Posso ajudar com informações gerais sobre: alimentação saudável, exercícios físicos, cuidados com higiene, saúde mental e bem-estar preventivo. Pode reformular sua pergunta ou ser mais específico?",
      categoria: "geral"
    };
  }

  function enviarPergunta() {
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
    typingIndicator.className = 'message bot-message';
    typingIndicator.innerHTML = '<strong>Assistente:</strong> <em>Digitando...</em>';
    typingIndicator.style.opacity = '0.7';
    chatMessages.appendChild(typingIndicator);
    
    // Rolagem automática para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simula processamento da IA (remove o "digitando" e mostra resposta)
    setTimeout(() => {
      chatMessages.removeChild(typingIndicator);
      
      const { resposta, categoria } = encontrarResposta(mensagem);
      const botMsg = document.createElement('div');
      botMsg.className = `message bot-message message-${categoria}`;
      
      botMsg.innerHTML = `<strong>Assistente de Saúde:</strong> ${resposta}`;
      chatMessages.appendChild(botMsg);
      
      // Rolagem automática para a última mensagem
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
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

    // Lógica para o formulário de feedback
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
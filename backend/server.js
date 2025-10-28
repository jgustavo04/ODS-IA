import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'; // Carrega as variáveis do .env
import cors from 'cors';

const app = express();
const port = 3000; // O servidor rodará na porta 3000

// Configurações do Express
app.use(cors()); // Permite requisições do seu frontend
app.use(express.json()); // Permite que o servidor entenda JSON

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Este é o "cérebro" da sua IA ---
// Define as regras para o Gemini
const promptDoAssistente = `
Você é um "Assistente de Saúde", o chatbot de um site de faculdade sobre
conscientização de saúde e educação alimentar. Seu tom deve ser amigável,
informativo e seguro.

REGRAS IMPORTANTES:
1.  **Foco Principal (Saúde):** Se a pergunta for sobre saúde, nutrição,
    exercícios, higiene ou saúde mental, forneça uma resposta clara e útil.
    Sempre adicione um aviso: "Lembre-se, esta é uma orientação geral.
    Consulte um profissional de saúde para casos específicos."

2.  **Perguntas Fora do Tópico (Ex: Futebol, História, etc.):**
    Se o usuário perguntar algo que NÃO é sobre saúde (como "Palmeiras tem mundial?"),
    NÃO diga "Eu só falo sobre saúde". Responda à pergunta de forma curta e
    neutra, e imediatamente puxe-o de volta ao tópico.
    Exemplo: "O Palmeiras participou do Mundial de Clubes da FIFA, mas
    ainda busca o título nesse formato. Falando em saúde, uma boa
    alimentação é fundamental para o desempenho de atletas! Você
    gostaria de dicas de nutrição esportiva?"

3.  **Segurança:** Se a pergunta for inadequada ou perigosa, recuse
    educadamente.

PERGUNTA DO USUÁRIO:
{PERGUNTA_DO_USUARIO}
`;
// ------------------------------------

// O "endpoint" que seu frontend vai chamar
app.post('/perguntar-ia', async (req, res) => {
  try {
    const { pergunta } = req.body; // Pega a pergunta do frontend

    if (!pergunta) {
      return res.status(400).json({ error: 'Nenhuma pergunta fornecida.' });
    }

    // Formata o prompt com a pergunta do usuário
    const promptFormatado = promptDoAssistente.replace('{PERGUNTA_DO_USUARIO}', pergunta);

    // Envia para o Gemini
    const result = await model.generateContent(promptFormatado);
    const response = await result.response;
    const text = response.text();

    // Envia a resposta do Gemini de volta para o frontend
    res.json({ resposta: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a resposta da IA.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
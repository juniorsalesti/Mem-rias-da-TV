/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Bloqueio explícito de APIs de cadastro público de administradores ou usuários (Single Admin System)
  app.post(["/register", "/signup", "/users/create", "/new-user", "/api/register", "/api/signup", "/api/users/create", "/api/new-user"], (req, res) => {
    return res.status(403).json({ error: "Acesso não permitido. O cadastro de novos usuários está permanentemente desabilitado." });
  });

  // API Route: Generate Article & Metadata with Gemini
  app.post("/api/ai/generate", async (req, res) => {
    const { keyword, category, focus } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: "O termo chave (keyword) é obrigatório." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Graceful fallback if GEMINI_API_KEY is not defined or is placeholder
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_KEY")) {
      console.warn("GEMINI_API_KEY is missing or contains placeholder. Providing static rich simulation.");
      
      // Seed a realistic simulated response matching the user keyword in Portuguese
      let generatedTitle = `Segredos e Bastidores de: ${keyword}`;
      let generatedExcerpt = `Descobrimos detalhes surpreendentes e memórias esquecidas sobre ${keyword} que marcaram a história das telas brasileiras.`;
      let generatedCategory = category || "Curiosidades";
      let generatedTags = [keyword, "Nostalgia", "Televisão", "Cultura Pop"];

      let generatedContent = `### O Fenômeno de ${keyword} na Televisão Brasileira

A televisão brasileira é movida por ícones e momentos mágicos que se instalam em nosso imaginário. O tema **${keyword}** representa exatamente essa conexão especial com o telespectador. Durante anos, reuniu famílias nas tardes e noites, despertando emoções que hoje se tornaram lembranças queridas da nossa infância e juventude.

### Desafios de Bastidores e Curiosidades

Poucos sabem, mas a produção por trás de eventos como esses exigia um esforço extraordinário. Produtores corriam contra o relógio para construir cenários dinâmicos, coordenar convidados ilustres de última hora e manter o ritmo vivo de transmissão. Diretores de palco veteranos confirmam que situações engraçadas de improviso aconteciam nos bastidores quase todas as semanas, regadas por egos de camarim e imprevistos de satélites analógicos.

> "Naquela época, a televisão era feita com muito improviso e amor. Se o microfone falhasse, o apresentador continuava falando com o coração", relembra um produtor renomado.

### O Legado Duradouro no Coração do Povo

Hoje, reviver esses episódios nos ajuda a entender como a cultura pop nacional se estabeleceu. Fóruns de discussão online e portais especializados discutem incansavelmente as razões que tornaram atrações desse teor tão inesquecíveis. Seja pelo carisma dos apresentadores, pela simplicidade humorada dos roteiros ou pela trilha sonora inesquecível, seu lugar na história dourada está completamente garantido.

Esperamos que novos projetos possam homenagear e reatar essa era de ouro em que as telas uniam o Brasil como um só auditório.`;

      return res.json({
        isSimulated: true,
        article: {
          title: generatedTitle,
          excerpt: generatedExcerpt,
          content: generatedContent,
          category: generatedCategory,
          tags: generatedTags,
          seoTitle: `${generatedTitle} | Memórias da TV`,
          seoDescription: generatedExcerpt.substring(0, 150),
          readTime: `${Math.ceil(generatedContent.split(/\s+/).length / 200)} min`
        }
      });
    }

    try {
      // Correct modern SDK model initialization & naming conventions
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Aja como um redator de entretenimento especialista em televisão brasileira antiga (SBT, Globo, Record, Manchete, Band, Silvio Santos). É para o portal "Memórias da TV".
Escreva um artigo rico, nostálgico, bem formatado e cativante sobre "${keyword}" ${category ? `na categoria "${category}"` : ""}. ${focus ? `Com foco especial em: ${focus}.` : ""}

Você deve retornar obrigatoriamente um objeto JSON com estes campos exatos em português brasileiro:
1. "title": Título cativante e otimizado para clique e SEO.
2. "excerpt": Breve resumo do artigo (líria rápida de 2 linhas para o card).
3. "content": Artigo completo formatado em Markdown, com subtítulos (###), parágrafos e pelo menos uma citação marcante do passado. Mínimo de 350 palavras.
4. "category": A categoria ideal recomendada para o post (Ex: "Silvio Santos", "SBT", "Nostalgia", "Anos 90", "Por Onde Anda?", "Curiosidades", "Celebridades").
5. "tags": Array de 3 a 5 strings representantes das tags mais úteis.
6. "seoTitle": Título de SEO recomendado (curto, marcante com ' | Memórias da TV' no final).
7. "seoDescription": Meta descrição otimizada para o Google Discover (máximo 155 caracteres).
8. "readTime": Tempo estimado de leitura (Ex: "5 min").`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "";
      const resultData = JSON.parse(responseText.trim());

      res.json({
        isSimulated: false,
        article: resultData,
      });
    } catch (apiError: any) {
      console.error("Gemini API execution failed:", apiError);
      res.status(500).json({
        error: "Falha ao gerar o artigo com Inteligência Artificial.",
        details: apiError.message,
      });
    }
  });

  // Setup Vite as middleware in development Mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode direct static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

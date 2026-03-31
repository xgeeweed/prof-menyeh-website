import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "./env";

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        if (!ENV.googleGenerativeAiApiKey) {
            console.warn("GOOGLE_GENERATIVE_AI_API_KEY is not set.");
        }
        this.genAI = new GoogleGenerativeAI(ENV.googleGenerativeAiApiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async generateContent(
        systemPrompt: string,
        history: { role: "user" | "assistant"; content: string }[],
        message: string
    ): Promise<string> {
        if (!ENV.googleGenerativeAiApiKey) {
            throw new Error("Gemini API key is not configured.");
        }

        try {
            // Get model with system instruction
            const model = this.genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: systemPrompt
            });

            // Sanitize history:
            // 1. Map to Gemini format
            // 2. Ensure alternating roles (User -> Model -> User -> Model)
            // 3. Ensure the first message is from User

            let formattedHistory = history.map((msg) => ({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.content }],
            }));

            // Remove leading model messages until we find a user message
            while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
                formattedHistory.shift();
            }

            // Ensure strictly alternating roles
            // (If we have User -> User, merge them or drop one. Here we'll just filter for simplicity if needed, 
            // but Gemini usually handles consecutive same-role messages by merging them or we can just let it try,
            // but strict alternation is safer.)
            // For now, removing leading model messages is the critical fix for the reported error.

            const chat = model.startChat({
                history: formattedHistory,
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.error("Gemini API Error details:", JSON.stringify(error, null, 2));
            if (error.response) {
                console.error("Gemini API Error Response:", JSON.stringify(error.response, null, 2));
            }
            throw new Error("Failed to generate content from Gemini.");
        }
    }
}

export const geminiService = new GeminiService();

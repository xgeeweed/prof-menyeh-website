import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { geminiService } from "./_core/gemini";
import { SYSTEM_PROMPT } from "./knowledge-base";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    message: publicProcedure
      .input(
        z.object({
          message: z.string().min(1).max(1000),
          conversationHistory: z
            .array(
              z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
              })
            )
            .optional()
            .default([]),
        })
      )
      .mutation(async ({ input }) => {
        const { message, conversationHistory } = input;

        // Using Gemini Service
        try {
          const response = await geminiService.generateContent(
            SYSTEM_PROMPT,
            conversationHistory,
            message
          );

          return {
            message: response,
          };
        } catch (error) {
          console.error("Chat Error:", error);
          return {
            message: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please check the API configuration.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

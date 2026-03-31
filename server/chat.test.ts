import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as llm from "./_core/llm";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.message", () => {
  it("should return a response from the chatbot", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Mock LLM response
    vi.mocked(llm.invokeLLM).mockResolvedValue({
      choices: [
        {
          message: {
            content: "Professor Aboagye Menyeh is a distinguished Professor of Geophysics at KNUST.",
            role: "assistant",
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
      created: Date.now(),
      id: "test-id",
      model: "test-model",
      object: "chat.completion",
    });

    const result = await caller.chat.message({
      message: "Who is Professor Menyeh?",
      conversationHistory: [],
    });

    expect(result.message).toBe("Professor Aboagye Menyeh is a distinguished Professor of Geophysics at KNUST.");
    expect(llm.invokeLLM).toHaveBeenCalledWith({
      messages: expect.arrayContaining([
        expect.objectContaining({ role: "system" }),
        expect.objectContaining({ role: "user", content: "Who is Professor Menyeh?" }),
      ]),
    });
  });

  it("should include conversation history in the request", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    vi.mocked(llm.invokeLLM).mockResolvedValue({
      choices: [
        {
          message: {
            content: "He earned his Ph.D. in Geophysics from the University of Newcastle upon Tyne in 1995.",
            role: "assistant",
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
      created: Date.now(),
      id: "test-id",
      model: "test-model",
      object: "chat.completion",
    });

    const result = await caller.chat.message({
      message: "What is his educational background?",
      conversationHistory: [
        { role: "user", content: "Who is Professor Menyeh?" },
        { role: "assistant", content: "Professor Aboagye Menyeh is a distinguished Professor of Geophysics at KNUST." },
      ],
    });

    expect(result.message).toContain("Ph.D.");
    expect(llm.invokeLLM).toHaveBeenCalledWith({
      messages: expect.arrayContaining([
        expect.objectContaining({ role: "system" }),
        expect.objectContaining({ role: "user", content: "Who is Professor Menyeh?" }),
        expect.objectContaining({ role: "assistant", content: "Professor Aboagye Menyeh is a distinguished Professor of Geophysics at KNUST." }),
        expect.objectContaining({ role: "user", content: "What is his educational background?" }),
      ]),
    });
  });

  it("should handle errors gracefully", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Mock LLM to return undefined content
    vi.mocked(llm.invokeLLM).mockResolvedValue({
      choices: [
        {
          message: {
            content: undefined as any,
            role: "assistant",
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
      created: Date.now(),
      id: "test-id",
      model: "test-model",
      object: "chat.completion",
    });

    const result = await caller.chat.message({
      message: "Test message",
      conversationHistory: [],
    });

    expect(result.message).toBe("I apologize, but I couldn't generate a response. Please try again.");
  });

  it("should limit conversation history to last 10 messages", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Clear previous mock calls
    vi.clearAllMocks();

    vi.mocked(llm.invokeLLM).mockResolvedValue({
      choices: [
        {
          message: {
            content: "Response",
            role: "assistant",
          },
          finish_reason: "stop",
          index: 0,
        },
      ],
      created: Date.now(),
      id: "test-id",
      model: "test-model",
      object: "chat.completion",
    });

    // Create 15 messages in history
    const longHistory = Array.from({ length: 15 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      content: `Message ${i + 1}`,
    }));

    await caller.chat.message({
      message: "New message",
      conversationHistory: longHistory,
    });

    const callArgs = vi.mocked(llm.invokeLLM).mock.calls[0][0];
    // Should have: 1 system + 10 history + 1 new = 12 messages
    expect(callArgs.messages.length).toBe(12);
    // First should be system message
    expect(callArgs.messages[0].role).toBe("system");
    // Should include only last 10 from history
    expect(callArgs.messages[1].content).toBe("Message 6");
  });
});

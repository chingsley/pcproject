import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';


export const simulatedAIChatProvider: ChatApiProvider = {
  async generateChatResponse(...args: any[]): Promise<ApiChatResponse> {
    return new Promise<ApiChatResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          chatTitle: "AI's Passive Use Impact",
          msgResponse:
            "The passive use of AI, such as relying on AI-driven tools for tasks like navigation, translation, or decision-making, can have both positive and negative effects on human cognitive capacity. On the positive side, it can free up mental resources by automating routine tasks, allowing individuals to focus on more complex or creative activities. However, over-reliance on AI may lead to cognitive atrophy in specific areas, such as memory or problem-solving skills, as these abilities are less frequently exercised. Additionally, it can reduce opportunities for critical thinking and learning from mistakes. Balancing AI usage with active engagement in cognitive tasks is key to maintaining and enhancing mental abilities.",
          promptPoint: 0,
          messageId: 1,
          question: "how does passive use of AI affect humans cognitive capacity",
          answer:
            "The passive use of AI, such as relying on AI-driven tools for tasks like navigation, translation, or decision-making, can have both positive and negative effects on human cognitive capacity. On the positive side, it can free up mental resources by automating routine tasks, allowing individuals to focus on more complex or creative activities. However, over-reliance on AI may lead to cognitive atrophy in specific areas, such as memory or problem-solving skills, as these abilities are less frequently exercised. Additionally, it can reduce opportunities for critical thinking and learning from mistakes. Balancing AI usage with active engagement in cognitive tasks is key to maintaining and enhancing mental abilities.",
          timestamp: "2026-03-16T06:19:43.105Z",
          modelId: "command-r-plus",
        });
      }, 10000); // simulate ~10s API latency
    });
  },
};

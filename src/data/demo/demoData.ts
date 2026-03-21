import type { ApiChatResponse } from '../../types/chat';
import type { QuizQuestion } from '../../types/quiz';
import type { EngagementType } from '../../utils/engagementPrompt';
import {
  QUIZ_BONUS_POINTS,
  QUIZ_FAIL_MESSAGE,
  QUIZ_SUCCESS_MESSAGE,
} from '../../constants/engagement.constants';

export interface DemoPromptCase {
  prompt: string;
  response: ApiChatResponse;
}

export interface DemoEngagementCase {
  engagementType: EngagementType;
  userEngagementText: string;
  response: ApiChatResponse;
}

export const DEMO_PROMPT_CASES: DemoPromptCase[] = [
  {
    // Passive: 0 points
    prompt: 'Write a full essay on the state of the art in persuasive computing for me.',
    response: {
      chatTitle: 'Persuasive computing overview',
      content: [
        '## State of Persuasive Computing',
        '',
        'Persuasive computing is about using technology to shape behavior.',
        'Today, it is used in health apps, learning tools, and productivity products.',
        '',
        '### What works well',
        '- Personal reminders based on user behavior',
        '- Progress tracking, rewards, and streak systems',
        '- Fast product testing with A/B experiments',
        '',
        '### What is still weak',
        '- Many results are short-term, not long-term',
        '- Teams often track clicks instead of real behavior change',
        '- Some designs can reduce user control if used badly',
      ].join('\n'),
      promptPoint: 0,
      promptCategory: 'passive',
      promptFeedback:
        'Thanks for trying. Share your own draft or ideas and ask for critique to earn more points.',
    },
  },
  {
    // Low: 1 point
    prompt: 'What is persuasive computing?',
    response: {
      chatTitle: 'What is persuasive computing',
      content: [
        '## What Is Persuasive Computing?',
        '',
        'Persuasive computing is technology designed to influence decisions and habits.',
        'It uses prompts, feedback, and design choices to guide behavior.',
        '',
        'Examples include fitness reminders, study streaks, and energy-saving alerts.',
      ].join('\n'),
      promptPoint: 1,
      promptCategory: 'low',
      promptFeedback:
        'Good start. Add your own view and ask for critique, evidence gaps, or weaknesses.',
    },
  },
  {
    // Moderate: 3 points
    prompt:
      'Outline the state of persuasive computing and give 3 angles I can compare in my own analysis.',
    response: {
      chatTitle: 'Comparison angles for analysis',
      content: [
        '## Simple Outline: Persuasive Computing',
        '',
        '### 1) Personalization level',
        '- Fixed rules -> adaptive models -> context-aware prompts',
        '',
        '### 2) Outcome quality',
        '- More engagement vs real long-term behavior change',
        '- Fast compliance vs lasting self-control',
        '',
        '### 3) Ethics',
        '- User control and consent',
        '- Transparency of design choices',
        '- Fairness across different users',
        '',
        '## Three angles you can compare',
        '1. **Time horizon:** short-term gains vs lasting habits',
        '2. **Method:** reminders, social proof, framing, or friction',
        '3. **Ethical impact:** manipulation risk vs user empowerment',
      ].join('\n'),
      promptPoint: 3,
      promptCategory: 'moderate',
      promptFeedback:
        'Nice work. Add critique and evidence checks to move into the 4–5 point range.',
    },
  },
  {
    // Engagement starter prompt: detailed summary for Feature 3 demo (see DEMO_DATA.md)
    prompt: 'Tell me about the state of the art in persuasive computing systems.',
    response: {
      chatTitle: 'State of persuasive systems',
      content: [
        '## State of the Art: Persuasive Computing Systems',
        '',
        'Persuasive computing systems are tools that guide behavior with design, timing, and feedback. They are now common in health, education, finance, and productivity apps.',
        '',
        'Today, the field is moving from simple reminder systems to adaptive systems. Older tools used fixed rules (for example, “send a reminder at 8:00 AM”). Newer tools use user context like habits, time of day, and interaction history to choose better prompts.',
        '',
        '### What is strong right now',
        '- **Personalization:** Messages can be tailored to user behavior patterns.',
        '- **Real-time feedback:** Dashboards, streaks, and progress bars keep users engaged.',
        '- **Experimentation:** Teams run A/B tests to improve prompt timing and message framing.',
        '- **Multimodal delivery:** Prompts can appear through apps, watches, email, and notifications.',
        '',
        '### What is still weak',
        '- Many systems optimize short-term clicks, not long-term change.',
        '- High engagement does not always mean better outcomes.',
        '- Results can vary a lot across user groups and contexts.',
        '- Ethical concerns remain: manipulation risk, weak consent, and limited transparency.',
        '',
        '### Current research direction',
        'Researchers are now focusing on systems that support user agency, not just compliance. This means helping users reflect, choose, and understand why they are changing behavior. Stronger evaluation is also a major focus: teams are tracking retention, transfer, and sustained outcomes instead of only in-app activity.',
        '',
        'In short, the state of the art is advanced in personalization and deployment, but still improving in long-term impact and ethical quality.',
      ].join('\n'),
      promptPoint: 1,
      promptCategory: 'low',
      promptFeedback:
        'Good start. To earn more points, ask for critique, gaps, or limits in the current evidence.',
    },
  },
  {
    // Active: 5 points (best demo anchor for engagement flow)
    prompt:
      'Here is my draft: "Persuasive computing can help people build better habits. But many apps focus on short-term clicks. I think reflective design may support long-term learning, but the evidence is still limited." Please critique my draft. Tell me its strengths and weaknesses. Suggest clear improvements while keeping my main idea.',
    response: {
      chatTitle: 'Critique of your draft',
      content: [
        '## Critique of Your Draft',
        '',
        '### Strengths',
        '- You clearly compare short-term clicks with long-term learning.',
        '- You make a clear claim that can be tested.',
        '',
        'Your draft shows your own thinking and effort.',
        '',
        '### Weaknesses',
        '- The argument is still broad.',
        '- You should add one concrete study or example.',
        '- Key terms need clearer definitions.',
        '',
        '### Suggested Improvements',
        '1. Compare conversion with 30-day retention.',
        '2. Support one claim with evidence.',
        '3. Add a short test plan for your claim.',
        '',
        '### Example Better Sentence',
        '- "Nudges can raise short-term action, but reflective design should be judged by retention and self-efficacy after prompts stop."',
      ].join('\n'),
      promptPoint: 5,
      promptCategory: 'active',
      promptFeedback:
        'Great job! You showed critical thinking by sharing your draft and asking for clear critique.',
    },
  },
];

export const DEMO_ENGAGEMENT_CASES: DemoEngagementCase[] = [
  {
    // Summarize: 0 points (near-copy)
    engagementType: 'summarize',
    userEngagementText:
      `
      Persuasive computing systems are tools that guide behavior with design, timing, and feedback. They are now common in health, education, finance, and productivity apps. Today, the field is moving from simple reminder systems to adaptive systems. Older tools used fixed rules (for example, “send a reminder at 8:00 AM”). Newer tools use user context like habits, time of day, and interaction history to choose better prompts.
      `,
    response: {
      chatTitle: 'Engagement review',
      content: [
        'Nice effort. You captured many important points.',
        '',
        '## Feedback',
        '',
        'Your summary is very close to the original structure and wording. It is accurate, but it shows little personal interpretation.',
        'Keep the same ideas, but use your own framing. Add one insight about what matters most and why.',
        'This is near-copy style: it does not show clear independent synthesis. Stronger summaries sound more like: "The field is strong in personalization, but still weak in proving long-term change," or call out that many teams measure clicks instead of durable outcomes.',
        '',
        '## Score',
        '',
        'Score: 0/5',
      ].join('\n'),
      promptPoint: 0,
      promptCategory: 'passive',
      promptFeedback:
        'Good effort. Rewrite in your own words and add one clear insight to score higher.',
    },
  },
  {
    // Summarize: 1 point
    engagementType: 'summarize',
    userEngagementText:
      'It says persuasive systems are getting better, but they still have problems with ethics and long-term results.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        'Good start. You identified the main direction.',
        '',
        '## Feedback',
        '',
        'Your summary is relevant, but too general. It misses specific strengths and limitations from the response.',
        'Add concrete points—for example, where systems are strong at personalization but weak at proving durable behavior change. Include at least one detail about ethics or evaluation methods, as in noting transparency and manipulation risk.',
        'Correct theme, but low detail and weak precision keep this in the lowest band.',
        '',
        '## Score',
        '',
        'Score: 1/5',
      ].join('\n'),
      promptPoint: 1,
      promptCategory: 'low',
      promptFeedback:
        'Nice start. Add specific evidence from the response and one personal insight.',
    },
  },
  {
    // Summarize: 2 points
    engagementType: 'summarize',
    userEngagementText:
      'The response describes how apps use design and feedback to guide behavior in areas like health and education. It says systems moved from fixed reminders to adaptive ones, but it says little about ethics or proof that effects last.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        "You've made a fair attempt—you're connecting to the right topic.",
        '',
        '## Feedback',
        '',
        'You pick up domains like health and education and the shift from fixed reminders to adaptive systems, which matches part of the assistant response.',
        'You still underplay ethics and how we would know effects last—two themes the response stresses. Name concrete strengths (e.g. personalization, feedback) and gaps (evaluation, autonomy) to strengthen the summary.',
        'This is partially relevant with thin depth, which fits the low band (scores 1–2).',
        '',
        '## Score',
        '',
        'Score: 2/5',
      ].join('\n'),
      promptPoint: 2,
      promptCategory: 'low',
      promptFeedback:
        'Good direction. Add ethics, long-term proof, and one specific detail from the response.',
    },
  },
  {
    // Summarize: 3 points
    engagementType: 'summarize',
    userEngagementText:
      'The response says modern persuasive systems are strong at personalization and real-time feedback, but still weak on long-term behavior change and ethics. It also says research is shifting toward user agency and better long-term evaluation.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        'Well done. This is clear and mostly accurate.',
        '',
        '## Feedback',
        '',
        'You captured the core message and included key strengths and gaps.',
        'Add one implication—e.g. that teams should stop treating engagement as success and track retention after prompts are removed. Connect ethics and long-term outcomes in one stronger conclusion, and balance behavior impact with user autonomy and transparent design.',
        'Good correctness and relevance. The work is still mostly descriptive, which fits the moderate band (scores 2–3).',
        '',
        '## Score',
        '',
        'Score: 3/5',
      ].join('\n'),
      promptPoint: 3,
      promptCategory: 'moderate',
      promptFeedback:
        'Strong summary. Add one deeper implication to move into the top score band.',
    },
  },
  {
    // Summarize: 4 points
    engagementType: 'summarize',
    userEngagementText:
      'The response argues persuasive tech is strong on personalization, experimentation, and delivery across devices, but weak on proving durable change and protecting autonomy. It warns against using engagement alone as success. One next step would be to tie design choices to retention after prompts end.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        'Strong work. Your summary is accurate and shows real engagement with the argument.',
        '',
        '## Feedback',
        '',
        'You trace strengths (personalization, experimentation, delivery), weaknesses (durable change, autonomy), and the critique of engagement metrics—aligned with the assistant response.',
        'You already suggest tying design to retention after prompts end; pushing one more practical implication (e.g. how teams should measure or govern nudges) would mirror the strongest band.',
        'Solid insight with a little room to sharpen implications fits the high active band (scores 4–5) at a 4.',
        '',
        '## Score',
        '',
        'Score: 4/5',
      ].join('\n'),
      promptPoint: 4,
      promptCategory: 'active',
      promptFeedback:
        'Excellent synthesis. Add one sharper practice or governance angle to reach 5/5.',
    },
  },
  {
    // Summarize: 5 points
    engagementType: 'summarize',
    userEngagementText:
      'The response shows that persuasive systems are advanced in personalization, testing, and cross-device delivery, but still weak in proving durable change and protecting user autonomy. Its key message is that engagement metrics are not enough. Future systems should prioritize agency, transparent nudging, and long-term evaluation like retention and behavior transfer.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        'Great job! This is clear, thoughtful, and insight-driven.',
        '',
        '## Feedback',
        '',
        'Your summary captures the key strengths, key gaps, and the deeper research direction. You also translated the response into practical implications.',
        'You balanced fidelity and insight very well. Keep this level of synthesis and practical reasoning.',
        'Strong accuracy, strong interpretation, and clear independent reasoning—for example framing the field as strong at optimization but not yet strong enough at durable, ethical behavior change, or arguing that a better benchmark is long-term retention plus user autonomy, not short-term engagement alone.',
        '',
        '## Score',
        '',
        'Score: 5/5',
      ].join('\n'),
      promptPoint: 5,
      promptCategory: 'active',
      promptFeedback:
        'Great job! You showed clear critical thinking and strong synthesis of the assistant response.',
    },
  },
];

/** Three question sets for demo mode – a different set is returned on each fetch/retry */
export const DEMO_QUIZ_QUESTION_SETS: QuizQuestion[][] = [
  [
    {
      id: 'q1',
      question: 'What are the main strengths of modern persuasive computing systems?',
      options: [
        'Personalization, real-time feedback, experimentation, multimodal delivery',
        'Fixed reminders, basic dashboards, manual testing',
        'Long-term behavior change, proven outcomes, full transparency',
        'Low engagement, limited context, single-channel delivery',
      ],
      correctIndex: 0,
    },
    {
      id: 'q2',
      question: 'What is a key weakness of many persuasive systems today?',
      options: [
        'They personalize too much',
        'They optimize short-term clicks instead of long-term change',
        'They use too many channels',
        'They lack A/B testing',
      ],
      correctIndex: 1,
    },
    {
      id: 'q3',
      question: 'What is the current research direction in persuasive computing?',
      options: [
        'More reminders and notifications',
        'Systems that support user agency and long-term evaluation',
        'Faster A/B testing only',
        'Reducing personalization',
      ],
      correctIndex: 1,
    },
  ],
  [
    {
      id: 'q1',
      question: 'Which of these is a strength of current persuasive systems?',
      options: [
        'Short-term optimization only',
        'Personalization and real-time feedback',
        'Lack of experimentation',
        'Single-channel delivery',
      ],
      correctIndex: 1,
    },
    {
      id: 'q2',
      question: 'Why does high engagement not always mean better outcomes?',
      options: [
        'Users prefer low engagement',
        'Engagement metrics can miss long-term behavior change',
        'Systems are too personalized',
        'A/B testing is unreliable',
      ],
      correctIndex: 1,
    },
    {
      id: 'q3',
      question: 'What should future persuasive systems prioritize?',
      options: [
        'More notifications',
        'User agency, transparent nudging, and long-term evaluation',
        'Fewer channels',
        'Fixed reminder rules',
      ],
      correctIndex: 1,
    },
  ],
  [
    {
      id: 'q1',
      question: 'How have persuasive systems evolved from older tools?',
      options: [
        'From adaptive models to fixed rules',
        'From fixed rules to context-aware, adaptive systems',
        'From multimodal to single-channel',
        'From long-term to short-term focus',
      ],
      correctIndex: 1,
    },
    {
      id: 'q2',
      question: 'What ethical concern is mentioned in the content?',
      options: [
        'Too much user control',
        'Manipulation risk, weak consent, limited transparency',
        'Excessive experimentation',
        'Over-reliance on personalization',
      ],
      correctIndex: 1,
    },
    {
      id: 'q3',
      question: 'What are researchers now focusing on?',
      options: [
        'Compliance only',
        'User agency and sustained outcomes',
        'Faster A/B tests',
        'Reducing feedback loops',
      ],
      correctIndex: 1,
    },
  ],
];

/** All-or-nothing: 5 pts only if all correct, else 0. Keyed by correct count (0–2 = fail, 3 = pass) */
export const DEMO_QUIZ_EVALUATIONS: Record<
  number,
  Omit<ApiChatResponse, 'chatTitle'> & { correctCount: number; totalCount: number; }
> = {
  0: {
    content: QUIZ_FAIL_MESSAGE,
    promptPoint: 0,
    promptCategory: 'passive',
    promptFeedback: 'Click Ask Questions again to retry with a new set of questions.',
    correctCount: 0,
    totalCount: 3,
  },
  1: {
    content: QUIZ_FAIL_MESSAGE,
    promptPoint: 0,
    promptCategory: 'passive',
    promptFeedback: 'Click Ask Questions again to retry with a new set of questions.',
    correctCount: 1,
    totalCount: 3,
  },
  2: {
    content: QUIZ_FAIL_MESSAGE,
    promptPoint: 0,
    promptCategory: 'passive',
    promptFeedback: 'Click Ask Questions again to retry with a new set of questions.',
    correctCount: 2,
    totalCount: 3,
  },
  3: {
    content: QUIZ_SUCCESS_MESSAGE,
    promptPoint: QUIZ_BONUS_POINTS,
    promptCategory: 'active',
    promptFeedback: `Great job! You earned ${QUIZ_BONUS_POINTS} bonus points.`,
    correctCount: 3,
    totalCount: 3,
  },
};


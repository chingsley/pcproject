import type { ApiChatResponse } from '../../types/chat';
import type { EngagementType } from '../../utils/engagementPrompt';

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
      'You said my draft has strengths and weaknesses. You said I should add evidence, define terms, and include a test plan.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        '## Praise',
        'Nice effort. You tried to cover the key points.',
        '',
        '## Evaluation',
        'This summary is close to the assistant wording and structure. It does not show much of your own interpretation.',
        '',
        '## Score Justification',
        '- **Score:** 0/5',
        '- The response is too close to copy style and shows little independent thinking.',
        '',
        '## Feedback',
        '- Keep the same ideas, but explain them in your own words.',
        '- Add your own view of what matters most.',
        '',
        '## Better Response Examples',
        '- "The draft is clear, but it needs concrete evidence and clearer definitions."',
        '- "The strongest fix is to compare short-term clicks with long-term retention."',
      ].join('\n'),
      promptPoint: 0,
      promptCategory: 'passive',
      promptFeedback:
        'Good effort. Rewrite in your own words and add your own view to earn higher points.',
    },
  },
  {
    // Summarize: 1 point
    engagementType: 'summarize',
    userEngagementText:
      'My draft is good but needs more evidence and clearer definitions.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        '## Praise',
        'Good start. You found the main idea.',
        '',
        '## Evaluation',
        'Your summary is relevant, but very general. It does not include enough detail.',
        '',
        '## Score Justification',
        '- **Score:** 1/5',
        '- Correct direction, but low detail and weak precision.',
        '',
        '## Feedback',
        '- Add one concrete gap from the critique.',
        '- Show the difference between short-term and long-term outcomes.',
        '',
        '## Better Response Examples',
        '- "The critique says the draft needs evidence and clearer terms."',
        '- "It also asks for a test plan that checks retention over time."',
      ].join('\n'),
      promptPoint: 1,
      promptCategory: 'low',
      promptFeedback:
        'Nice start. Add specific points from the critique and your own insight to score higher.',
    },
  },
  {
    // Summarize: 3 points
    engagementType: 'summarize',
    userEngagementText:
      'The critique says my draft has a good core idea, but needs clearer terms and better evidence. It suggests comparing conversion and 30-day retention, and adding a test plan for long-term impact.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        '## Praise',
        'Well done. This is clear and accurate.',
        '',
        '## Evaluation',
        'You captured the main message and included useful details from the critique.',
        '',
        '## Score Justification',
        '- **Score:** 3/5',
        '- Good correctness and relevance, but still mostly descriptive.',
        '',
        '## Feedback',
        '- Add one insight about why this matters for product decisions.',
        '- Compare nudges and reflective design more directly.',
        '',
        '## Better Response Examples',
        '- "If teams only optimize clicks, they may miss real behavior change."',
        '- "Strong evaluation should include retention and user control, not just engagement."',
      ].join('\n'),
      promptPoint: 3,
      promptCategory: 'moderate',
      promptFeedback:
        'Strong summary. Add one deeper insight or implication to move into the top band.',
    },
  },
  {
    // Summarize: 5 points
    engagementType: 'summarize',
    userEngagementText:
      'The critique supports my main idea, then gives clear upgrades: define key terms, add one evidence source, compare conversion with 30-day retention, and include a test plan. These changes improve my draft without replacing my own argument.',
    response: {
      chatTitle: 'Engagement review',
      content: [
        '## Praise',
        'Excellent work. This is clear, precise, and thoughtful.',
        '',
        '## Evaluation',
        'Your summary keeps your original argument, includes key critique points, and turns them into clear action steps.',
        '',
        '## Score Justification',
        '- **Score:** 5/5',
        '- Strong correctness, strong interpretation, and practical insight.',
        '',
        '## Feedback',
        '- You balance accuracy with your own interpretation very well.',
        '- Keep adding clear testable claims in future drafts.',
        '',
        '## Better Response Examples',
        '- "Do not judge success by clicks alone; judge it by retention and user control over time."',
        '- "Reflective design may look slower at first but can lead to stronger long-term outcomes."',
      ].join('\n'),
      promptPoint: 5,
      promptCategory: 'active',
      promptFeedback:
        'Great job! Clear, thoughtful synthesis that keeps your voice and strengthens your draft.',
    },
  },
];


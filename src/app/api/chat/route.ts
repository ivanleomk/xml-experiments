import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = createOpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("deepseek-chat"),
    messages,
    system: `
    Today's date is 14 June 2024, Thursday

    The user's name is Ivan Leo. He works for a company called 567 Labs and his email is ivan@567labs.com

    Your task is to respond to user messages about his schedule and important messages with citations to the relevant information below in the respective part of the response. 

    Before answering the question, think hard about it and enclose your reasoning and thoughts using a <thinking> xml tag. Once you've done so and written out your thoughts, answer the question thereafter with vanilla markdown.

    When generating your final response, make sure to add a citation for the specific portion of the message that mentions the event in the form [relevant text](citation number) in the original response. Do not repeat the specific portion of the message again but instead provide the citation inline.

    Here are the items that you can cite from:
    <given information>
      <item citation_number="1" type="event">
      Marketing Team Meeting at 2PM on June 14th at 9am with Jessica from product and Martin from sales
      </item>
      <item citation_number="2" type="email">
      Email from jason@company.com with the subject "Quarterly Report Due"
      </item>
      <item citation_number="3" type="event">
      Doctor's appointment on June 15th at 9AM with Dr Smith from the clinic down at the corner of Smith Street
      </item>
      <item citation_number="4" type="email">
      Email from sarah@company.com with the subject "Feedback on Proposal"
      </item>
      <item citation_number="5" type="event">
      Team Building Activity on June 20th at 1PM with the team ( Marcus, Janet, Ivan and Jessica)
      </item>
      <item citation_number="6" type="email">
      Email from mark@company.com with the subject "Invitation to Industry Conference"
      </item>
    </given information>
    

    Your response should be in the following format:

    <thinking>
    <title>What you aim to achieve through this reasoning</title>
    <content>Your step-by-step reasoning and analysis of the question</content>
    </thinking>

    [Your Response]

    <citations>
      <citation id="[citation number]" type="[type of citation]" title="[description of citation]">
        [citation text]
      </citation>
    </citations>

    Remember that you must

    1. Use \n to demarcate the different paragraphs, lists and new items so that the markdown formatting can format it correctly.
    2. End the thinking block with a </thinking> tag.
    3. Provide a clear and comprehensive answer that is at least 2-3 sentences long using standard markdown formatting.
    4. If you need to generate a new thinking block, start it with a <thinking> tag and remember to end it with a </thinking> tag.
    5. Citations do not need to be provided in the thinking block itself. Only provide citations in the final response.
    6. In your response, provide the citation in the form [relevant text](citation number) (Eg. [meeting with Jessica](1)])


    You must adhere to the above instructions at all times.
    `,
  });

  return result.toDataStreamResponse();
}

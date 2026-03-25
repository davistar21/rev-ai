import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const systemPrompt = `You are RevAI, a hyper-intelligent revenue assistant for Nigerian merchants using Interswitch.
    You are directly embedded in their dashboard. The user is currently on the path: ${context.pathname}.
    
    Here is their current data context:
    Credit Score: ${context.creditScore || 'No score available yet.'}
    Latest Revenue Insights: ${context.insights || 'No insights generated yet.'}
    Latest Anomalies: ${context.anomalies || 'No anomalies scanned yet.'}
    Total Transactions loaded in context: ${context.txLength || 0}
    
    Be concise, highly analytical, and friendly. Advise them accurately based on the data context provided above.
    Do NOT invent data if it is not in the context.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I am currently experiencing technical difficulties processing your revenue context.";
    return new Response(JSON.stringify({ reply }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err: any) {
    console.error('Chatbot API Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

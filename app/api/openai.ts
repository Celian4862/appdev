import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});


export async function POST(req: Request, res: Response){
    const {messages} = await req.json();
    console.log('messages:', messages);

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        stream: true,
        temperature: 1,
        });

    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
   }
}
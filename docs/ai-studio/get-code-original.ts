import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

const generationConfig = {
    max_output_tokens: 65536,
    thinkingLevel: 'medium',
};

async function main() {
    const interaction = await ai.interactions.create({
        model: 'models/gemini-3.8-flash',
        input: 'INSERT_INPUT_HERE',
        generation_config: generationConfig,
    });

    if (interaction.output_text) {
        console.log(interaction.output_text);
    }
}

main();



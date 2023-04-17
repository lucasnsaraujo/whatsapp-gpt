import dotenv from 'dotenv'
dotenv.config();

import { Configuration, OpenAIApi } from 'openai'

const API_KEY = process.env.OPEN_AI_SECRET_KEY;

const configuration = new Configuration({
    apiKey: API_KEY
})

const openai = new OpenAIApi(configuration)

export async function generateImage(prompt = '', options = {
    size: '1024x1024'
}) {
    const response = await openai.createImage({
        prompt,
        size: options.size,
    }).catch(error => null)
    return response ? response?.data?.data?.[0]?.url : response
}

export async function askChatGPT(prompt = '', options = {
    model: 'gpt-3.5-turbo'
}) {
    const response = await openai.createChatCompletion({
        model: options.model,
        messages: [
            { role: 'user', content: prompt}
        ],
    })
    const answer = response.data.choices[0].message.content;
    return answer
}

export async function generateTextCompletion(prompt, options) {}
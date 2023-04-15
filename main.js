// setting environment variables such as api keys
import dotenv from 'dotenv'
dotenv.config();

import { askChatGPT, generateImage } from './services/open-ai.js'
import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client();

client.on('qr', (qr) => {
    // rendering qr code on terminal
    qrcode.generate(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// asking chat gpt
client.on('message', async (msg) => {
    const firstParameter = msg.body.split(' ')?.[0]
    const requestType = {
        ask_gpt: firstParameter === '/gpt',
        ask_gpt_4: firstParameter === '/gpt4',
        generate_image: firstParameter === '/img'
    }
    if (requestType.ask_gpt) {
        const reply = await askChatGPT(msg.body);
        msg.reply(reply);
    } else if (requestType.ask_gpt_4) {
        const reply = await askChatGPT(msg.body, {model: 'gpt-4'})
        msg.reply(reply)
    } else if (requestType.generate_image) {
        const reply = await generateImage(msg.body);
        msg.reply(reply)
    }
    
});

client.initialize();
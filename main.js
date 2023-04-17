// setting environment variables such as api keys
import dotenv from 'dotenv'
dotenv.config();

import { askChatGPT, generateImage } from './services/open-ai.js'
import whatsappJs from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, MessageMedia } = whatsappJs;

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    // rendering qr code on terminal
    console.log(`> QR Code generated: ${qr}`)
    qrcode.generate(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const MENU_MESSAGE = `
    /gpt - Ask ChatGPT
    /gpt4 - Ask ChatGPT v4
    /img - Generate image
`

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
        console.log('> (ask-gpt-4) action received')
        const reply = await askChatGPT(msg.body, {model: 'gpt-4'})
        console.log(reply && `> Reply received. Sending now...`)
        msg.reply(reply)
    } else if (requestType.generate_image) {
        const imageUrl = await generateImage(msg.body);
        if (imageUrl === null) {
            msg.reply('Ocorreu um erro ao gerar a imagem. Tente novamente com outro prompt.')
            return;
        }
        console.log('image url = ', imageUrl)
        const media = await MessageMedia.fromUrl(imageUrl)
        msg.reply(media)
    } else if (msg.body.includes('menu')) {
        msg.reply(MENU_MESSAGE)
    }
    
});

client.initialize();
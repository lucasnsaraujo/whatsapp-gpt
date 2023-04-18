🤖 Node.js WhatsApp Bot with OpenAI GPT API 🤖

This project utilizes the OpenAI npm package to access the GPT API and generate text responses for a WhatsApp bot built using the WhatsApp-Web.js library. The Axios library is also used for making HTTP requests.

🚀 Getting Started
1. Clone the repository:
   ```git clone https://github.com/your-username/your-repo.git```

2. Install dependencies:
   ```yarn```

3. Create a `.env` file in the root directory with the following variables:
   ```OPENAI_API_SECRET_KEY=your_openai_api_key_here```

4. Run the project:
   ```node ./main.js```

🤖 Using the Bot
To use the bot, send a message to your WhatsApp account from another phone number with the one of the prefixes below.
- /gpt - Asks gpt-3.5-turbo
- /gpt4 - Asks gpt-4

💻 Technologies Used
- Node.js
- WhatsApp-Web.js
- OpenAI
- Axios

📝 License
This project is licensed under the MIT License.

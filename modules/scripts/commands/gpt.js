const axios = require('axios');

module.exports.config = {
  name: "gpt",
  author: "Yan Maglinte & Jhon Xyryll Samoy",
  version: "1.0",
  category: "Utility",
  description: "Chat with GPT models.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5, // Cooldown time in seconds
};

const apiEndpoints = {
  gpt3: "https://kaiz-apis.gleeze.com/api/gpt-3.5?q=",
  gpt4: "https://kaiz-apis.gleeze.com/api/gpt-4o?ask=",
  gpt4o: "https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=",
  gpt4mini: "https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask="
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let [model, ...query] = args;
    query = query.join(" ");

    if (!model || !apiEndpoints[model]) {
      return api.sendMessage("Invalid model! Available models: gpt3, gpt4, gpt4o, gpt4mini.", event.sender.id);
    }

    if (!query) {
      return api.sendMessage("Please provide a question.", event.sender.id);
    }

    try {
      const response = await axios.get(apiEndpoints[model] + encodeURIComponent(query));
      
      if (response.data && response.data.reply) {
        api.sendMessage(response.data.reply, event.sender.id);
      } else {
        api.sendMessage("No response from the AI. Try again later.", event.sender.id);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching the response. Please try again later.", event.sender.id);
    }
  }
};

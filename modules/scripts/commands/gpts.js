const axios = require('axios');

module.exports.config = {
  name: "gpts",
  author: "Aljur & Jhon Xyryll Samoy",
  version: "1.0",
  category: "Utility",
  description: "Chat with different GPT models.",
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

async function fetchAIResponse(model, query, event) {
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

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let command = args.shift();
    let query = args.join(" ");

    if (!query) {
      return api.sendMessage("Please provide a question.", event.sender.id);
    }

    switch (command) {
      case "gpt3":
        fetchAIResponse("gpt3", query, event);
        break;
      case "gpt4":
        fetchAIResponse("gpt4", query, event);
        break;
      case "gpt4o":
        fetchAIResponse("gpt4o", query, event);
        break;
      case "gpt4mini":
        fetchAIResponse("gpt4mini", query, event);
        break;
      default:
        api.sendMessage("Invalid command! Available commands: gpt3, gpt4, gpt4o, gpt4mini.", event.sender.id);
    }
  }
};

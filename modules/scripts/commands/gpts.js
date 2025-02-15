const axios = require('axios');

module.exports.config = {
  name: "ai",
  author: "Yan Maglinte & Jhon Xyryll Samoy",
  version: "1.0",
  category: "AI",
  description: "Chat with GPT models.",
  adminOnly: false,
  usePrefix: false,
  cooldown: 3,
};

const apiEndpoints = {
  gpt3: "https://kaiz-apis.gleeze.com/api/gpt-3.5?q=",
  gpt4: "https://kaiz-apis.gleeze.com/api/gpt-4o?ask=",
  gpt4o: "https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=",
  gpt4mini: "https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask="
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let model = args.shift();
    let prompt = args.join(" ");

    if (!apiEndpoints[model]) {
      return api.sendMessage("Invalid model! Use: gpt3, gpt4, gpt4o, gpt4mini.", event.sender.id);
    }

    try {
      let response = await axios.get(apiEndpoints[model] + encodeURIComponent(prompt));
      api.sendMessage(response.data.reply, event.sender.id);
    } catch (error) {
      console.log(error);
      api.sendMessage("Error fetching response. Try again later.", event.sender.id);
    }
  } else if (event.type === "message_reply") {
    let model = "gpt4"; // Default model for replies
    let prompt = `Message: "${args.join(" ")}"
\nReplying to: ${event.message.reply_to.text}`;

    try {
      let response = await axios.get(apiEndpoints[model] + encodeURIComponent(prompt));
      api.sendMessage(response.data.reply, event.sender.id);
    } catch (error) {
      console.log(error);
      api.sendMessage("Error fetching response. Try again later.", event.sender.id);
    }
  }
};

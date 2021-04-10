import * as dotenv from "dotenv";
import tmi from "tmi.js";

dotenv.config();

const channel = process.env.CHANNEL_NAME;

const opts: tmi.Options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [`${channel}`],
};

const client = new tmi.client(opts);

client.on(
  "message",
  (channel: string, tag: tmi.ChatUserstate, message: string, self: boolean) => {
    if (self) return;

    console.log(`${channel} - ${tag["display-name"]}: ${message}`);
  }
);
client.on("connected", () => {
  console.log("Conectado");
});

client.connect();

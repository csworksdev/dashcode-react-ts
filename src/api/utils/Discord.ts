import { DISCORD_WEBHOOK_URL } from "@/constant/data";
import axios from "axios";

// Watch out here !..
export const reportToDiscordBotWebhook = (payload: any) => {
    return axios.post(DISCORD_WEBHOOK_URL, payload);
};
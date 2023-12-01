import { getUserIp } from "@/api/utils/Ip";
import DiscordService from "@/services/DiscordService";

export const reportToDiscord = (title: string, data: any) => {
    getUserIp().then(function (res: any) {
        sendMessage(title, data, res.data.ip)
    }).catch(function (error) {
        sendMessage(title, data)
    })
};

const sendMessage = (title: string, data: any, ip?: string) => {
    const { Send } = DiscordService();
    data.ip = ip || '-'
    data.agent = navigator?.userAgent || '-'
    data.language = navigator?.language || '-'
    data.location = window?.location?.href || '-'
    
    const description = Object.entries(data).map((d) => `${d[0]} : ${d[1]}`).join("\n");
    Send(title, description);
}
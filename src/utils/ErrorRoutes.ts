import {NextFunction, Request, Response} from "express";
import axios from "axios";

export default class ErrorRoutes {
    public static error404(req:Request, res:Response):void {
        res.status(404).json({
            error: "Not Found",
            message: `El recurso '${req.url}' no existe. Por favor visita el readme para más información: https://github.com/EnzoDiazDev/xfazt-bot-backend`
        });

        return;
    }

    public static async error500(error:Error, req:Request, res:Response, next:NextFunction):Promise<void> {
        const webhook_url = `https://discord.com/api/webhooks/${process.env.NOTIFY_WEBHOOK}`;
        const responsable = process.env.NODE_ENV === "development" ? "<@406226275020177409>" : "<@&774766724628742174>";
        const now = new Date()
            .toUTCString()
            .replace("GMT", "UTC");
        const action = `${req.method.toUpperCase()} \`${req.url}\``;

        const alert_message = `${responsable} ha ocurrido un error en la API:\n\`\`\`\n${error.stack}\n\`\`\`\nAcción: ${action}\n*${now}*`;

        await axios.post(webhook_url, {
            username: "Error",
            avatar_url: "https://i.imgur.com/DWQaGUM.png",
            content: alert_message
        });

        res.status(500).json({
            error: "Internal Server Error",
            message: "Ha ocurrido un error inesperado en el servidor, el equipo ya está siendo notificado."
        });

        return;
    }
}

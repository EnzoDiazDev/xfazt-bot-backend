import {decorators} from "@lottielabs/lepp";
import {NextFunction, Request, Response} from "express";

const {Controller, Get} = decorators;

@Controller("/api")
export default class API {
    @Get("/")
    public index(req:Request, res:Response, next:NextFunction):void {
        try {
            res.status(200).json({message: "Faztbot api proto. Visita https://github.com/faztcommunity/xfazt-bot"});
        } catch (error) {
            next(error);
        }
    }
}

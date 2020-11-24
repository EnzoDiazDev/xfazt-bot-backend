import {decorators} from "@lottielabs/lepp";
import {NextFunction, Request, Response} from "express";
import authentication_tier from "../utils/authentication_tier";

const {Controller, Get, Use} = decorators;

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

    @Get("/priv")
    @Use(authentication_tier(9999))
    public priv(req:Request, res:Response, next:NextFunction):void {
        try {
            res.status(200).json({message: "OK!"});
        } catch (error) {
            next(error);
        }
    }
}

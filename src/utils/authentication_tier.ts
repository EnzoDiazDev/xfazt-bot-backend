import { NextFunction, Request, Response } from "express";
import JWT from "./JWT";

const jwt = new JWT(process.env.JWT_TOKEN as string);

export default function authentication_tier(tier = 0) {
    return (req:Request, res:Response, next:NextFunction):void => {
        if(!tier || tier === 0) {
            next();
            return;
        }

        if(!req.headers["authorization"]){
            res.status(401).json({
                error: "Forbbiden",
                message: "Debes proveer un token de acceso para acceder a esta ruta."
            });
            return;
        }

        const token = req.headers["authorization"];

        const data = jwt.verify(token) as "error"|"expired"|{tier:number};
        if(data === "error"){
            res.status(401).json({
                error: "Forbbiden",
                message: "El token provisto es inválido."
            });
            return;

        } else if(data === "expired"){
            res.status(401).json({
                error: "Forbbiden",
                message: "El token provisto ha expirado."
            });
            return;
        }

        if(data.tier >= tier){
            next();
            return;
        }

        if(data.tier < tier){
            res.status(401).json({
                error: "Forbbiden",
                message: `Necesitas un tier de autenticación igual o mayor a '${tier}' para hacer esta petición`
            });
            return;
        }

        res.status(500).json({error: "Unexpected Error", message: "Something strange has happened in the authentication process. Please try again later or contact the developer."});
        return;
    };
}

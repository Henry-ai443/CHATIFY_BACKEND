import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const archjetProtect = async (req, res, next) => {
    try {

        const decision = await aj.protect(req);
        if (decision.isDenied){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"RAte limit exceeded. Please try again later"})
            }
        }else if(decision.reason.isBot()){
            return res.status(400).json({message:"Bot access denied."})
        }else{
            return res.status(403).json({message:"Access denied by security policy."})
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"Spoofed bot detected",
                message:"Malicious bot activity detected.",
            });
        }

        next();
        
    } catch (error) {
        console.log("Archjet protection error", error)
        next();
    }
}
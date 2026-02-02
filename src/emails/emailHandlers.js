import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import { ENV } from "../lib/env.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    try {
        // In development/testing mode with Resend, use verified email for testing
        const recipientEmail = process.env.NODE_ENV === 'production' ? email : ENV.EMAIL_FROM;
        
        const {data, error} = await resendClient.emails.send({
            from:`${sender.name} <${sender.email}>`,
            to: recipientEmail,
            subject:"Welcome to chatify!",
            html: createWelcomeEmailTemplate(name, clientUrl)
        });

        if(error){
            console.error("Error sending welcome email:", error);
            throw new Error("Failed to send welcome email");
        }

        console.log("Welcome email sent successfully", data);
    } catch (error) {
        console.error("Email service error:", error.message);
        // Don't throw error in development - allow signup to continue
        if(process.env.NODE_ENV === 'production') {
            throw error;
        }
    }
}
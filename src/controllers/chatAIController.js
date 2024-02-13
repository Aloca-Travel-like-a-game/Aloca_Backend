import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getTravelKeywords, checkTravelRelated } from "../helper/travel.js";
import { configDotenv } from "dotenv";
configDotenv();

const runChat = async (req, res) => {
    try {
        const { message } = req.body;
        const travelKeywords = getTravelKeywords();
        if (checkTravelRelated(message, travelKeywords)) {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY_CHAT);
            const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 500,
            };
            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const chat = model.startChat({
                generationConfig,
                safetySettings
            });
            const result = await chat.sendMessage(message);
            const response = result.response.candidates;
            const hasContent = response.some(item => item.content)
            if(!hasContent){
                return res.status(400).json("An error occurred while sending the message, try again")
            }
            return res.status(200).json({ message: "Send message successfully", data: response })
        } else {
            res.status(400).json({ message: "Sorry, The application only supports travel-related topics and using Vietnamese" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ messages: "Internal Server Error" })
    }
}
export { runChat };

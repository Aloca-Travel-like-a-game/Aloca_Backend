import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getTravelKeywords, checkTravelRelated } from "../helper/travel.js";
import ChatAi from "../models/chatAiModel.js";
import Question from "../models/questionModel.js";
import Response from "../models/responseModel.js";

import { configDotenv } from "dotenv";
configDotenv();

const runChat = async (req, res) => {
    try {
        const { idChat, message } = req.body;
        const userId = req.userData._id;
        const travelKeywords = getTravelKeywords();
        if (checkTravelRelated(message, travelKeywords)) {
            let chatAi = await ChatAi.findOne({ userId, _id: idChat });
            let checkNewChat = false;
            let history = null;
            if (!chatAi) {
                const title = extractTitle(message);
                chatAi = new ChatAi({ userId, title })
                checkNewChat = true
                await chatAi.save();
            }
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
            if (checkNewChat == false) {
                const responses = await Response.find({ chatAiId: chatAi._id });
                const questions = await Question.find({ chatAiId: chatAi._id });
                if (responses.length != 0 && questions != 0) {
                    let mergedArray = [
                        ...responses.map((response) => ({ role: "model", parts: response.content, createdAt: response.createdAt })),
                        ...questions.map((question) => ({ role: "user", parts: question.content, createdAt: question.createdAt }))
                    ];
                    mergedArray.sort((a, b) => a.createdAt - b.createdAt);
                    let resultArray = mergedArray.map((res) => ({ role: res.role, parts: res.parts }));
                    history = resultArray
                }
            }
            const chat = model.startChat({
                history,
                generationConfig,
                safetySettings
            });

            const result = await chat.sendMessage(message);
            const response = result.response.candidates;
            const hasContent = response.some(item => item.content)
            if (!hasContent) {
                return res.status(400).json({ message: "An error occurred while sending the message, try again", chatAi })
            }
            const ChatResponse = response[0].content.parts[0].text;
            const question = new Question({ chatAiId: chatAi._id, content: message })
            await question.save();
            const responseAi = new Response({ chatAiId: chatAi._id, content: ChatResponse })
            await responseAi.save();
            return res.status(200).json({ message: "Send message successfully", data: { chatAi, ChatResponse } })
        } else {
            res.status(400).json({ message: "Sorry, The application only supports travel-related topics and using Vietnamese" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const extractTitle = (message) => {
    const words = message.split(" ");
    const titleWords = words.slice(0, 3);
    const title = titleWords.join(" ");
    return title;
}

const getDataChat = async (req, res) => {
    try {
        const userId = req.userData._id;

        const dataChat = await ChatAi.find({ userId });
        return res.status(200).json({ message: "Successfully", data: dataChat })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ messages: "Internal Server Error" })
    }
}

const getDataChatDetail = async (req, res) => {
    try {
        const chatId = req.params.id;

        const questions = await Question.find({ chatAiId: chatId });
        const responses = await Response.find({ chatAiId: chatId });

        return res.status(200).json({ message: "Successfully", questions, responses })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const deleteChat = async () => {
    try {
        
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export { runChat, getDataChat, getDataChatDetail };

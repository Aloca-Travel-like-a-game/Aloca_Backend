import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getImagesFromLocation } from "../helper/trip.js";

import { configDotenv } from "dotenv";
configDotenv();

const createTrip = async (req, res) => {
    try {
        const { location, startDate, endDate, numberOfPeople, budget, interest } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.API_KEY_CHAT);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
        const generationConfig = {
            temperature: 1.0,
            topK: 10,
            topP: 0.7,
            maxOutputTokens: 2048,
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
        // getImagesFromLocation(location)
        //     .then(location => {
        //         return location;
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         return res.status(402).json({ message: "Not found this location" })
        //     });

        const result = await chat.sendMessage(`
            - Địa điểm:Huế
            - Số lượng người: 4
            - Ngân sách: 1 tỷ vnd
            - Sở thích: Lịch sử
            Bạn có thể tạo ra (2 kế hoạch khác nhau và ngân sách mỗi kế hoạch là 1 triệu) từ ngày 22/2/2024-24/2/2024 và các giá tiền cần chi cho mỗi day? Vui lòng cho ra chuỗi JSON format, với từ khóa là
            plan1:{
                "transportCostTotal": total money of this plan,
                "foodCostTotal": total money of this plan,
                "day1": {
                    title:"biggest location",
                    "activities": [
                        challenge:[
                            some challenges that users can take pictures of 
                        ],
                    "transportCost": money,
                    "foodCost": money
                ]}}`);
        const response = result.response.candidates;
        const hasContent = response.some(item => item.content)
        if (!hasContent) {
            return res.status(400).json({ message: "An error occurred while creating the trip plan, try again" })
        }
        let TripResponse = response[0].content.parts[0].text;
        let jsonString;
        if (TripResponse.startsWith("```")) {
            jsonString = TripResponse.slice(3);
        }
        if (jsonString.endsWith("```")) {
            jsonString = jsonString.slice(0, -3);
        }
        if (jsonString.startsWith("json")) {
            jsonString = jsonString.slice(4);
        }
        let jsonObject = JSON.parse(jsonString);
        return res.status(200).json({ message: "Create the plan successfully", data: jsonObject })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}



export {
    createTrip
}
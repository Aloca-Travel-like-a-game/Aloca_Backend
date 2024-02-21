import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

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
        const result = await chat.sendMessage(`
            - Địa điểm: Đà Nẵng
            - Số lượng người: 3
            - Ngân sách: 1 triệu vnd
            - Sở thích: Ngoài trời
            Bạn có thể tạo ra (2 kế hoạch khác nhau) cho 3 ngày và các giá tiền cần chi cho mỗi day? Vui lòng cho ra chuỗi JSON format, với từ khóa là
            plan_nb:{
                "day_nb": {
                    "activities": [
                        title:"biggest location",
                        challenge:[
                            some challenge involved here
                        ],
                    "budget": money
                ]}}`);
        const response = result.response.candidates;
        const hasContent = response.some(item => item.content)
        if (!hasContent) {
            return res.status(400).json({ message: "An error occurred while creating the trip plan, try again" })
        }
        const TripResponse = response[0].content.parts[0].text;
        console.log(TripResponse);
        if (TripResponse.includes("```json")) {
            return res.status(200).json({ message: "Create the plan successfully", data: TripResponse })
        } else {
            return res.status(400).json({ message: "An error occurred while creating the trip plan, please try again" });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

export {
    createTrip
}
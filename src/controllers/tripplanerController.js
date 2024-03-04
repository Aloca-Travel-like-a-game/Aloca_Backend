import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { getImagesFromLocation } from "../helper/trip.js";

import { configDotenv } from "dotenv";
configDotenv();

const createTrip = async (req, res) => {
    try {
        const { location, numberOfPeople, budget, interest, userLocation, numberOfDay } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.API_KEY_CHAT);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
        const generationConfig = {
            temperature: 1.0,
            topK: 10,
            topP: 0.7,
            maxOutputTokens: 9048,
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
        - Địa điểm:${location}
        - Số lượng người: ${numberOfPeople}
        - Ngân sách: ${budget} vnd
        - Sở thích: ${interest}
        Bạn có thể tạo ra 2 plan khác nhau (The amount for each plan required should be close to ${budget} vnd) gồm ${numberOfDay} ngày và các giá tiền cần chi cho mỗi day(Tôi sống ở ${userLocation})? Vui lòng cho ra tất cả trong chuỗi JSON format, với từ khóa là
        plannb:{
        "daynb": {
        title:"biggest location",
        "activities": [
        challenges:[
            {"challenge_summary": string, "google_maps_address": string, "level_of_difficult":string}
        ],
        "transportCost": money,
        "foodCost": money
        ]}}
        THERE IS NO TEXT IN THE REPLY, ONLY JSON`);
        const response = result.response.candidates;
        const hasContent = response.some(item => item.content)
        if (!hasContent) {
            return res.status(200).json({ message: "An error occurred while creating the trip plan, try again" })
        }
        let TripResponse = response[0].content.parts[0].text;
        console.log(TripResponse);
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

const saveTripPlanner = async (req, res) => {
    try {
        const { jsonTrip, location, startDay, endDay } = req.body;
        let totalPric
        Object.keys(jsonTrip).map(plan => {
            const planData = jsonTrip[plan];
            Object.keys(planData).map(day => {
                const dataDay = planData[day];
                // console.log(dataDay);
            })
            
            // const saveTripplan = await Tripplan
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

export {
    createTrip,
    saveTripPlanner
}
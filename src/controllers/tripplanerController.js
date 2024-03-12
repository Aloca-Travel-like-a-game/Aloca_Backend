import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { configDotenv } from "dotenv";
import { getDayOfWeek } from "../helper/travel.js";
import { getImagesFromLocation } from "../helper/trip.js";
import TripDay from "../models/tripDayModel.js";
import Tripplan from "../models/tripplannerModel.js";
import Challenge from "../models/challengeController.js";
import UserChallengProgress from "../models/userChallengeProgressModel.js";
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
            maxOutputTokens: 9548,
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
        Bạn BẮT BUỘC phải tạo ra ít nhất 2 plan khác nhau (The amount for each plan required should be close to ${budget} vnd) gồm ${numberOfDay} ngày và các giá tiền cần chi cho mỗi day(Tôi sống ở ${userLocation})? Vui lòng cho ra tất cả trong chuỗi JSON format, với từ khóa là
        plannb:{
        "daynb": {
        title:"biggest location",
        "google_maps_address": string ADDRESS,
        "activities": [
        challenges:[
            {"challenge_summary": string, "google_maps_address": ADDRESS(string), "level_of_difficult":string}
        ],
        "transportCost": money,
        "foodCost": money
        ]}}
        THERE IS NO TEXT IN THE REPLY, ONLY JSON AND USING VIETNAMESE AND COMBINE TWO PLAN JSON STRINGS INTO A SINGLE JSON STRING`);
        const response = result.response.candidates;
        const hasContent = response.some(item => item.content)
        if (!hasContent) {
            return res.status(200).json({ message: "An error occurred while creating the trip plan, try again" })
        }
        let TripResponse = response[0].content.parts[0].text;
        console.log(TripResponse);
        let jsonData;
        const startIndex = TripResponse.indexOf('{');
        const endIndex = TripResponse.lastIndexOf('}') + 1;
        if (startIndex !== -1 && endIndex !== -1) {
            const jsonSubstring = TripResponse.substring(startIndex, endIndex);
            jsonData = JSON.parse(jsonSubstring);
            console.log(jsonData);
        } else {
            console.log("No valid JSON found in the return data.");
        }
        return res.status(200).json({ message: "Create the plan successfully", data: jsonData })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

const saveTripPlanner = async (req, res) => {
    try {
        const { jsonTrip, location, startDate, endDate, nameTrip } = req.body;
        const userId = req.userData_id;
        let transportCostTotal = 0;
        let foodCostTotal = 0;
        // const imageTripPlaceUrl = await getImagesFromLocation(location);
        const tripPlan = new Tripplan({ userId, startDate, endDate, location, nameTrip }) // imageUrl
        // await tripPlan.save();
        for (const [planKey, planData] of Object.entries(jsonTrip)) {
            for (const [dayKey, dayData] of Object.entries(planData)) {
                const dayNumber = parseInt(dayKey.replace('day', ''));
                const dayDate = new Date(startDate);
                dayDate.setDate(dayDate.getDate() + dayNumber - 1);
                const dayOfWeek = getDayOfWeek(dayDate.getDay());
                const { title, transportCost, foodCost } = dayData;
                transportCostTotal += transportCost;
                foodCostTotal += foodCost;
                const tripday = new TripDay({ tripId: tripPlan._id, day: dayNumber, title, dayOfWeek, date: dayDate, transportCost, foodCost, });
                // await tripday.save();
                const activities = dayData.activities || [];
                for (const challengeData of activities) {
                    let { challenge_summary, google_maps_address, level_of_difficult } = challengeData;
                    if (level_of_difficult == "Eazy" || level_of_difficult == "Dễ") {
                        level_of_difficult = 10;
                    }
                    else if (level_of_difficult == "Normal" || level_of_difficult == "Trung bình") {
                        level_of_difficult = 20;

                    }
                    else if (level_of_difficult == "Hard" || level_of_difficult == "Khó") {
                        level_of_difficult = 30;
                    }
                    const challenge = new Challenge({ tripDayId: tripday._id, challengeSummary: challenge_summary, location: google_maps_address, points: level_of_difficult })
                    // await challenge.save();
                    const userChallengeProgress = new UserChallengProgress({ userId: userId, chaId: challenge._id })
                    // await userChallengeProgress.save();
                }
            }
        }
        tripPlan.transportCostTotal = transportCostTotal;
        tripPlan.foodCostTotal = foodCostTotal;
        // await tripPlan.save();
        return res.status(200).json({ message: "Trip plan saved successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
}

const getTrip = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error")
    }
}

const getDetailTrip = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error")
    }
}

export {
    createTrip,
    saveTripPlanner
}
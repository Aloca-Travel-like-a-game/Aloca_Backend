import Challenge from "../models/challengeModel.js";
import geolib from "geolib";
import NodeGeocoder from 'node-geocoder';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { storage } from "../firebase/firebaseConfig.js";
import fs from "fs";
import { URL } from "url";
import path from "path";
const geocoder = NodeGeocoder({
    provider: 'openstreetmap'
});

const checkChallengeProgress = async (req, res) => {
    try {
        const { lat, lng, chaId } = req.body;
        const challenge = await Challenge.findById(chaId);
        const locationChallenge = challenge.location;
        // const resLocationChanllenge = await geocoder.geocode(locationChallenge);
        // if (resLocationChanllenge && resLocationChanllenge.length > 0) {
        //     const langtitude = resLocationChanllenge[0].latitude;
        //     const longitude = resLocationChanllenge[0].longitude;
        //     console.log(langtitude);
        //     console.log(longitude);
        //     const distance = geolib.getDistance(
        //         { latitude: lat, longitude: lng },
        //         { latitude: langtitude, longitude: longitude }
        //     )}
        // const challengeLatitude = challenge.latitude;
        // const challengeLongitude = challenge.longitude;
        // const distance = geolib.getDistance(
        //     { latitude: lat, longitude: lng },
        //     { latitude: challengeLatitude, longitude: challengeLongitude }
        // )
        // if (distance > 80) {
        //     return res.status(400).json({ message: "Please complete the mission at the location provided", distance })
        // }
        // if (!imageURI) {
        //     return res.status(400).json({ message: "No image updoaded" })
        // }
        return res.status(200).json({ message: "Complete the challenge", distance })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { checkChallengeProgress }
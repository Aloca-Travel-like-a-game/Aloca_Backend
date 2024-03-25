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
        const { lat, lng, chaId, imageURI } = req.body;
        console.log("imageURI", imageURI);
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
        const challengeLatitude = challenge.latitude;
        const challengeLongitude = challenge.longitude;
        const distance = geolib.getDistance(
            { latitude: lat, longitude: lng },
            { latitude: challengeLatitude, longitude: challengeLongitude }
        )
        if (distance > 80) {
            return res.status(400).json({ message: "Please complete the mission at the location provided", distance })
        }
        if (!imageURI) {
            return res.status(400).json({ message: "No image updoaded" })
        }

        const storageRef = ref(imageURI, `images/${chaId}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, imageBuffer)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("Upload progres", progress);
            },
            (err) => {
                console.log("err", err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log("Image uploaded successfully. Download URL:", downloadURL);
                    })
                    .catch((downloadURLError) => {
                        console.error("Error getting download URL:", downloadURLError);
                    });
            }
        )
        return res.status(200).json({ message: "Complete the challenge", distance })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { checkChallengeProgress }
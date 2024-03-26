import Challenge from "../models/challengeModel.js";
import geolib from "geolib";
import NodeGeocoder from 'node-geocoder';
const geocoder = NodeGeocoder({
    provider: 'openstreetmap'
});

const checkChallengeProgress = async (req, res) => {
    try {
        const { lat, lng, chaId } = req.body;
        const challenge = await Challenge.findById(chaId);
        const locationChallenge = challenge.location;
        const resLocationChanllenge = await geocoder.geocode(locationChallenge);
        if (resLocationChanllenge && resLocationChanllenge.length > 0) {
            const langtitude = resLocationChanllenge[0].latitude;
            const longitude = resLocationChanllenge[0].longitude;
            const distance = geolib.getDistance(
                { latitude: lat, longitude: lng },
                { latitude: langtitude, longitude: longitude }
            )
            if (distance > 80) {
                return res.status(200).json({ message: "Please complete the mission at the location providedd", distance })
            }
        }
        else {
            const challengeLatitude = challenge.latitude;
            const challengeLongitude = challenge.longitude;
            const distance = geolib.getDistance(
                { latitude: lat, longitude: lng },
                { latitude: challengeLatitude, longitude: challengeLongitude }
            )
            if (distance > 80) {
                return res.status(200).json({ message: "Please complete the mission at the location provided", distance })
            }
        }
        return res.status(200).json({ message: "Complete the challenge", distance })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { checkChallengeProgress }
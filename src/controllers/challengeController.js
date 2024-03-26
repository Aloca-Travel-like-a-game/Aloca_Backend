import Challenge from "../models/challengeModel.js";
import geolib from "geolib";
import UserChallengeProgress from "../models/userChallengeProgressModel.js";
import User from "../models/userModel.js";

const checkChallengeProgress = async (req, res) => {
    try {
        const { lat, lng, chaId } = req.body;
        const challenge = await Challenge.findById(chaId);
        const challengeLatitude = challenge.latitude;
        const challengeLongitude = challenge.longitude;
        const distance = geolib.getDistance(
            { latitude: lat, longitude: lng },
            { latitude: challengeLatitude, longitude: challengeLongitude }
        )
        if (distance > 250) {
            return res.status(200).json({ message: "Please complete the mission at the location provided", distance })
        }
        const challengePoints = challenge.points;
        const changeUserChallengeProgress = await UserChallengeProgress.findOneAndUpdate(
            { chaId: challenge._id },
            { completed: true },
            { new: true, projection: { userId: 1 } }
        );
        await User.findOneAndUpdate(
            { _id: changeUserChallengeProgress.userId },
            { $inc: { experience: challengePoints } },
            { new: true }
        );
        return res.status(200).json({ message: "Complete the challenge", distance })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
170923
export { checkChallengeProgress }
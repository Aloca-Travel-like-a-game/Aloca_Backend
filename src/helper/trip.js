import axios from "axios"

const getImagesFromLocation = async (location) => {
    try {
        const apiKey = "AIzaSyDL31mk2CJNsLs39xuKgocBKx8AEcUNrcQ";
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours&key=${apiKey}`);
        const placeData = response.data;
        if (placeData.candidates && placeData.candidates.length > 0) {
            const photoReference = placeData.candidates[0].photos[0].photo_reference;
            const imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
            return imageURL;
        } else {
            throw new Error('Not found this location');
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

export { getImagesFromLocation };
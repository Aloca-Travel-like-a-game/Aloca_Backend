const getTravelKeywords = () => {
    const keywordsData = [
        "du lịch",
        "khách sạn",
        "vé máy bay",
        "điểm đến",
        "kỳ nghỉ",
        "tour",
        "địa điểm",
        "chuyến đi",
        "ẩm thực",
        "thắng cảnh",
        "quốc gia",
        "thành phố",
        "bãi biển",
        "núi",
        "hồ",
        "đảo",
        "di tích lịch sử",
        "văn hóa dân tộc",
        "hành hương",
        "đồ ăn địa phương",
        "thể thao mạo hiểm",
        "mua sắm",
        "thuê xe",
        "hướng dẫn viên",
        "tài liệu du lịch",
        "visa",
        "quy định an toàn",
        "điều kiện khí hậu",
        "dịch vụ du lịch",
        "kinh nghiệm du lịch",
        "dịch vụ hướng dẫn",
        "công ty du lịch",
        "tour du lịch tự túc",
        "tôi muốn đi chụp ảnh"
    ]
    return keywordsData
}

const checkTravelRelated = (message, keywords) => {
    if (typeof message !== 'string') {
        throw new Error('message must be a string');
    }
    for (const keyword of keywords) {
        if (message.includes(keyword)) {
            return true
        }
    }
    return false
}

export { getTravelKeywords, checkTravelRelated }
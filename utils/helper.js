const { readDocumentsFromS3 } = require("./s3");

const fetchIcons = async (items) => {
    const urls = await readDocumentsFromS3('Icons', undefined, process.env.AWS_S3_BUCKET);
    const detailsItems = [
        {
            icon: urls.find(url => url.includes("singleAttendance")),
            title: "Attendance",
            number: "90%"
        },
        {
            icon: urls.find(url => url.includes("singleBranch")),
            title: "Branches",
            number: 20
        },
        {
            icon: urls.find(url => url.includes("singleLesson")),
            title: "Lessons",
            number: 10
        },
        {
            icon: urls.find(url => url.includes("singleClass")),
            title: "Classes",
            number: 15
        },
    ];
    return detailsItems;
}

const formatTime = (time) => {
    time = time.slice(0, 5); // "11:00"
    const today = new Date().toISOString().split("T")[0];
    const formattedTime = `${today}T${time}:00Z`;
    return formattedTime;
}

module.exports = {
    fetchIcons,
    formatTime
}
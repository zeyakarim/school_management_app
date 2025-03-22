const { readDocumentsFromS3 } = require("./s3");

const fetchIcons = async () => {
    const items = [
        {
            // icon: urls.find(url => url.includes("singleAttendance")),
            key: 'Icons/singleAttendance.png',
            title: "Attendance",
            number: "90%"
        },
        {
            key: 'Icons/singleBranch.png',
            // icon: urls.find(url => url.includes("singleBranch")),
            title: "Branches",
            number: 20
        },
        {
            // icon: urls.find(url => url.includes("singleLesson")),
            key: 'Icons/singleLesson.png',
            title: "Lessons",
            number: 10
        },
        {
            // icon: urls.find(url => url.includes("singleClass")),
            key: 'Icons/singleClass.png',
            title: "Classes",
            number: 15
        },
    ];

    await Promise.all(items?.map(async (item) => {
        item.icon = (await readDocumentsFromS3('Icons', item?.key, process.env.AWS_BUCKET))?.[0] || null;
        return item;
    }));
    return items;
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
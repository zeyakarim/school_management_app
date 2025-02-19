module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/Icons/*",
            },
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/students/*",
            },
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/teachers/*",
            },
        ],
        unoptimized: true,
    },
};
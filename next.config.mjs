/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/Icons/**", // Allow all images from the "Icons" folder
            },
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/students/**", // Allow all images from the "students" folder
            },
            {
                protocol: "https",
                hostname: "school-management-v1.s3.ap-south-1.amazonaws.com",
                pathname: "/teachers/**", // Allow all images from the "teachers" folder
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;

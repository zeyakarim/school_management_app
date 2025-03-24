const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");


const createAdmin = async (data) => {
    try {
        const createdAdmin = await prisma.admin.create({
            data: data
        });

        return createdAdmin;
    } catch (error) {
        handlePrismaError(error);
    }
}

const signInAdmin = async (data) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: { username: data?.username }
        })

        if (!admin) {
            throw { message: 'Admin Not Exist in the Database.' }
        }

        if (admin?.password !== data?.password) {
            throw { message: 'Please fill correct password.' }
        }

        return admin;
    } catch (error) {
        handlePrismaError(error)
    }
}

module.exports = {
    createAdmin,
    signInAdmin
}
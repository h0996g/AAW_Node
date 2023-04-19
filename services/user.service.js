// UserModel = require("../models/user.model");
const user = require('../models/user');

const jwt = require("jsonwebtoken");

class UserServices {

    static async registerUser(email, password, name) {
        try {
            console.log("-----Email --- Password-----", email, password, name);

            const createUser = new user({ email, password, name });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await user.findOne({ email });
        } catch (err) {
            console.log(err);
        }
    }

    static async checkUser(email) {
        try {
            return await user.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = UserServices;
import { UserRefreshToken } from "../../../mongo/models/refeshToken.js";

export const updateToken = async(userId, refreshToken) => {
    console.log("userID: " + userId)
    try {
        if (!userId || !refreshToken) {
            return Error('No User Id or Refresh Token')
        }
        const token = await UserRefreshToken.findOneAndUpdate(
            { userId: userId }, 
            { refreshToken: refreshToken }, 
            { upsert: true }
        );
        
        if (!token) {
            return Error('Token was not able to be accessed.')

        }

        return token
    } catch (error) {
        console.error("Error updating token:", error);
        return Error(error)
    }
}

export const getToken = async(userId) => {
    if (!userId) {
        return Error('No User Id')
    }
    try {
        const token = await UserRefreshToken.findOne(
            { userId: userId},
        )
        if (!token) {
            return Error("Not able to access token.")
        }
        
        return JSON.parse(token.googleRefreshToken)
    } catch (error) {
        console.error("Error getting token:", error);
        return Error(error)
    }
}
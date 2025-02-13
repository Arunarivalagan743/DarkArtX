import UserModel from "../models/users.model.js";
import sendEmail from "../config/sendEmail.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import dotenv from "dotenv";
import { generatedAccessToken } from "../utils/generatedAccessToken.js";
import { generatedRefreshToken } from "../utils/generatedRefreshToken.js";

dotenv.config();

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email,name and password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email already exist",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONT_URL}/verify-email?code=${save._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verification E-mail from Darkart",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.json({
      message: "User Created Successfully",
      error: false,
      success: true,
      save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const code = req.body;

    const id = await UserModel.findOne({ _id: code });
    if (!id) {
      return res.status(400).json({
        message: "Not a valid user",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      {
        _id: code,
      },
      {
        verify_email: true,
      }
    );

    return res.json({
      message: "Verified Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Please provide the inputs required",
            error: true,
            success: false,
        })
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid mail ID",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact with Admin",
        error: true,
        success: false,
      });
    }

    const chkPassword = await bcryptjs.compare(password, user.password);

    if (!chkPassword) {
      return res.status(400).json({
        message: "Make sure your password is correct",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id)

    const cookieOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }

    res.cookie('accessToken',accessToken,cookieOption)
    res.cookie('refreshToken',refreshToken,cookieOption)

    res.json({
        message:"Usre login Successfully",
        error : false,
        success : true,
        data : {
            accessToken,
            refreshToken
        }
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function logoutController(req,res) {
    try {
        
        const userId = req.userId

        const cookieOption = {
            http : true,
            secure : true,
            sameSite : "None"
        }

        res.clearCookie('accessToken',cookieOption)
        res.clearCookie('refreshToken',cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{refresh_token : ""})

        return res.json({
            message : "Logout Successfully",
            error:false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
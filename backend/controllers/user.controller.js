import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/user.model.js';
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const authUser = asyncHandler(async (req,res) => {
  const { email,password } = req.body;
  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))) {

    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    })
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
  
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: false,
    isVerified: false,
    verificationToken: crypto.randomBytes(32).toString('hex')
  });

  if (user) {
    const redirect = req.query.redirect || '/';
    const verificationUrl = `http://localhost:3000/verify-email?token=${user.verificationToken}`;
    console.log(verificationUrl);
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'htooaunglin0297@gmail.com',
        pass: 'bxez zcrg zlow hwll'
      }
    });

    const mailOptions = {
      from: 'htooaunglin0297@gmail.com',
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: ${verificationUrl}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt','',{
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({message: "Logged out successfully!!"})
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    }); 
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const existingUser = await User.findOne({ email: req.body.email });
		if (
			existingUser &&
			existingUser._id.toString() !== req.user._id.toString()
		) {
			res.status(400);
			throw new Error("Email already exists");
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});


const getAllUserProfiles = asyncHandler(async (req, res) => {
  const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({});
  const users = await User.find({})
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

const getUserById = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const deleteUser = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);

 if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error("Can not delete admin user");
		}
		await User.deleteOne({ _id: user._id });
		res.json({ message: "User removed" });
 } else {
		res.status(404);
		throw new Error("User not found");
 }
});

const updateUser = asyncHandler(async (req,res) => {
  const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUserProfiles,
  getUserById,
  deleteUser,
  verifyEmail,
  updateUser
}



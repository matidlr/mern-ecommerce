import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcryptjs from 'bcryptjs'
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        throw new Error("Please fill out all the inputs.")
    }

    const userExist = await User.findOne({ email });
    if(userExist) res.status(400).send('User already exists');

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        createToken(res, newUser._id)

        res
           .status(201)
           .json({
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              isAdmin: newUser.isAdmin,
            });
    } catch (error) {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const loginUser = asyncHandler(async (req, res) => {
   const {email, password} = req.body

   const existingUser = await User.findOne({email})

   if (existingUser) {
    const isPasswordValid = await bcryptjs.compare(password, existingUser.password)

    if (isPasswordValid) {
        createToken(res, existingUser._id)

        res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
        });
        return;
    }
   }
})

export {
    createUser,
    loginUser
};

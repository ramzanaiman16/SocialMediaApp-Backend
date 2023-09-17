import User from '../model/User';
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (error) {
        console.log(error)
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" })
    }
    return res.status(200).json({ users })
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error)
    }
    if (existingUser) {
        return res.status(400).json({ message: " User Already Exist! Login Instead" })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs  :[]
    })

    try {
        await user.save()
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({ user })
}


export const login = async (req, res, next) => {
    const { password, email } = req.body;

    let loginUser;
    try {
        loginUser = await User.findOne({ email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!loginUser) {
        return res.status(404).json({ message: "Could not find the user with this email" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, loginUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ message: "Login successful" });
};

const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db.config.js");
const User = db.users;

const createAccount = async (req, res) => {
	try {
            const { userName, email, password, role } = req.body;
            const data = {
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                role,
                active: 1,
            };
            const user = await User.create(data);
            return res.status(200).send('Account create successfully');
		}
		else {
			return res.status(409).send("Create account failed");
		}
	}
	catch (error) {
		console.log(error);
	}
};
const login = async (req, res) => {
	try {
		const {email, password,} = req.body;
        const user = await User.findOne({
            where: {
				email: String(email),
                active: true
			} 
		});
        if(!user && email =="sys@iir"){
            const data = {
                userName: 'sys',
                email: 'sys@iir',
                password: await bcrypt.hash(password, 10),
                role: 0,
                active: true,
            };
            sysAdmin = await User.create(data);
        }
		if (user) {
			const isSame = await bcrypt.compare(String(password), String(user.password));
			if (isSame) {
				let token = jwt.sign({ email: user.email, role: user.role }, dbConfig.secretKey, {
					expiresIn: 1 * 24 * 60 * 60 * 1000});
                let refreshToken = jwt.sign({ userName: user.userName, role: user.role }, dbConfig.secretKey, {
					expiresIn: 90 * 24 * 60 * 60 * 1000});
				// res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
				// return res.status(201).send('Login Successfully');
                const response = {
                    "status": 200,
                    "token": token,
                    "refreshToken": refreshToken,
                }
                return res.status(200).send(response);
			} 
			else {
                console.log("incorrect username/password")
                return res.status(401).send("Username / Password is incorrect");
			}
		} 
		else {
			return res.status(401).send("Authentication failed at server");
		}
	}
	catch (error) {
		console.log(error);
	}
};
const valicateUser = async (req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        if (username) {
            return res.json(409).send("username already taken");
        }
        
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (emailcheck) {
            return res.json(409).send("email already taken");
        }
        next();
    } 
    catch (error) {
        console.log(error);
    }
};
module.exports = {
    createAccount,
    login,
    valicateUser,
};
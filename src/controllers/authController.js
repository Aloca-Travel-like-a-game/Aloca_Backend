const Register = (req, res) => {
    const dataUser = req.body;
    const username = dataUser.username;
    const password = dataUser.password;
    if (!username || !password) {
        req.status(401).send("Username not found");
    }

    console.log(dataUser);
    res.status(200).json(dataUser);
}

export {
    Register
}
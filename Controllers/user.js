import user from "../model/user.js"
export const Addusers = async (req, res) => {
    const { name, email } = req.body;
    try {
        if (!name && !email) {
            return res.json({ message: "all feild req" })
        }
        const userData = await user.create({ name, email });
        if (userData) {
            // res.json({ message: " data add successfully" })
            res.status(201).json(userData);
        }


    } catch (error) {
        res.status(409).json({ message: error.message });

    }

}

export const AllUaers = async (req, res) => {
    try {
        const allData = await user.find();
        if (allData) {
            //  res.json(allData)
            res.status(200).json(allData);
        }
        //  console.log(allData)
    } catch (error) {
        res.status(404).json({ message: error.message })

    }

}


export const UserDelete = async (req, res) => {
    const id = req.params.id
    try {
        const allData = await user.deleteOne({ _id: id });
        if (allData) {
            return res.status(201).json("User deleted Successfully");
        }
        console.log(allData)

    } catch (error) {
        res.status(409).json({ message: error.message });

    }

}


export const UserUpdate = async (req, res) => {
    const id = req.params.id
    try {
        user.findByIdAndUpdate({ _id: id }, req.body)
            .then((data) => {
                res.json({ message: "data update success fully" })
            })


    } catch (error) {
        res.status(409).json({ message: error.message });

    }

}

export const getUserById = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const userData12 = await user.findById({ _id: id });
        res.status(200).json(userData12);
        console.log(userData12)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


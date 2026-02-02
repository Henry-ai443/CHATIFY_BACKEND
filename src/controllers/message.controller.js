import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js"
export const getAllContacts = async (req , res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json({filteredUsers})
    } catch (error) {
        console.log("Error in getAllContacts", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId} = req.params

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({message:"Internal server error!"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        if(!text && !image){
            return res.status(400).json({message:"Text or image is required"});
        }
        if(senderId.equals(receiverId)){
            return res.status(400).json({message:"Cannot send message to yourself."});
        }

        const receiverExists = await User.exists({_id: receiverId});
        if(!receiverExists){
            return res.status(404).json({message: "Receiver not found"})
        }

        let ImageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            ImageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: ImageUrl
        })

        await newMessage.save();

        //todo: sendMessage in real time if user is online - socket.io


        res.status(201).json(newMessage)
    }catch(error){
        console.log("Error in sendmessage controller");
        res.status(500).json({message:"Internal server error"});
    }
}
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Messages.find({
            $or:[{senderId: loggedInUserId}, {receiverId:loggedInUserId}],
        });

        const chatPatnersId = [...new Set(messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString()
         ? msg.receiverId.toString()
         : msg.senderId.toString()
        ))  
        ];

        const chatPatners = await User.find({_id:{$in:chatPatnersId}}).select("-password")

        res.status(200).json(chatPatners)
    } catch (error) {
        console.log("Error in the getChatPatners controller");
        res.status(500).json({message:"Internal server error"});
    }
}
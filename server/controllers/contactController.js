import Feedback from "../models/feedbackSchema.js";

const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;

    // Create a new feedback entry
    const newMessage = await Feedback.create({ email, username, message });

    // Note: userCreated.generateToken() was referenced but not defined in this file.
    // If this token generation is needed, ensure userCreated is properly imported/defined.
    res.status(201).json({
      message: newMessage.message,
      userId: newMessage._id.toString(),
      token: await userCreated.generateToken(), // assuming userCreated is available globally
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default contact;

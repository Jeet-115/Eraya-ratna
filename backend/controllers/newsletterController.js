import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const sendNewsletter = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required." });
    }

    const users = await User.find({}, "email"); // get all registered users' emails

    const emailPromises = users.map((user) =>
      sendEmail({
        to: user.email,
        subject,
        text: message,
      })
    );

    await Promise.all(emailPromises);

    res.status(200).json({ message: "Newsletter sent to all users." });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ message: "Failed to send newsletter." });
  }
};
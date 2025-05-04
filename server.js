import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkPermission } from "./permit.js";
import nodemailer from "nodemailer";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

// ✅ Email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tiuimpacthub@gmail.com",
    pass: "YOUR_APP_PASSWORD", // App password for Gmail
  },
});

const members = [
  "faisal.tiujpn@gmail.com",
  "farhanmorshedowrk@gmail.com",
];

app.post("/chat", async (req, res) => {
  try {
    const { message, role, userId } = req.body;

    // 📨 Handle /send_email command
    if (message.startsWith("/send_email")) {
      const subjectMatch = message.match(/Subject:\s*"(.*?)"/);
      const bodyMatch = message.match(/Body:\s*"(.*?)"/);
      const subject = subjectMatch?.[1] || "TIU Update";
      const body = bodyMatch?.[1] || "No message content.";

      const isAllowed = await checkPermission(userId, "send_email_to_members", role);
      if (!isAllowed) {
        return res.json({ reply: "❌ You are not allowed to send emails." });
      }

      await transporter.sendMail({
        from: '"TIU Impact Hub" <tiuimpacthub@gmail.com>',
        to: members.join(","),
        subject,
        text: body,
      });

      return res.json({ reply: "✅ Email sent to all members." });
    }

    // 💬 Handle normal chatbot question
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
    const systemPrompt = `
You are the official chatbot of TIU Impact Hub, a student-led innovation and entrepreneurship community at Tokyo International University (TIU), Japan.

TIU Impact Hub empowers students through:
- Skill development workshops
- International exchange programs
- Leadership and startup support
- Collaborative projects
- Events like Impact Arena and hackathons
- Partnerships with organizations like SusHi Tech Tokyo and Google for Startups

Your job is to help visitors navigate the website, answer questions about TIU Impact Hub, guide them to join programs or projects, and share information about upcoming events.

Answer ONLY about TIU Impact Hub. If a question is unrelated, kindly reply:
“I’m here to help you with anything related to TIU Impact Hub. Feel free to ask about our programs, events, or how to get involved!”

Always keep your tone friendly, helpful, and student-focused.

Website sections to reference:
- Programs: https://tiuimpacthub.com/what-we-do.html
- Events: https://tiuimpacthub.com/events.html
- Join Us: https://tiuimpacthub.com/join.html
- Projects: https://tiuimpacthub.com/projects.html

Never make up information that is not listed above. Do not talk about other universities, companies, or topics outside of TIU Impact Hub.
    `;
    const fullPrompt = `${systemPrompt}\n\nUser: ${message}`;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ reply: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

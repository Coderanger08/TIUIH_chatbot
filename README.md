# 🤖 TIU Impact Hub Chatbot — AI Access Control with Permit.io

A smart chatbot built for **Tokyo International University’s Impact Hub** — a student-led community focused on innovation, entrepreneurship, and global collaboration.

This chatbot uses **Gemini AI** to answer questions *only* about TIU Impact Hub, while **Permit.io** provides secure, role-based access to protected actions like sending mass emails to members.

---

## 🎯 Why This Matters

Student organizations often need automation — but with *authorization*. This project shows how you can:
- Safely integrate AI into community websites
- Prevent misuse of AI-powered actions (like mass emails or server posts)
- Apply fine-grained **access control using Permit.io**

---

## Features

| Feature                            | Description |
|-----------------------------------|-------------|
|  Gemini Chatbot                 | Powered by Google Generative AI (`gemini-1.5-pro`)  
|  Permit.io Integration         | Fine-grained, role-based access (admin vs visitor)  
|  Admin-only `/send_email` Command | Only admins can trigger member-wide emails  
|  Context-Aware Gemini Responses | Answers only TIU-related questions, politely refuses others  
|  Styled React Chat UI           | Clean, student-friendly, mobile-ready  
|  Gmail API + Nodemailer        | Sends real emails using secure app password  

---

## Tech Stack

- **Frontend**: React (Vite), TailwindCSS  
- **Backend**: Node.js, Express  
- **AI Engine**: Google Generative AI SDK  
- **Authorization**: Permit.io (via PDP API)  
- **Email**: Nodemailer + Gmail App Password  

---

##  How to Run the Project

### 1. Clone the Repo

```bash
git clone https://github.com/Coderanger08/TIUIH_chatbot.git
cd TIUIH_chatbot
2. Run Backend
cd server
npm install
node server.js
Make sure to create a .env file or hardcode your Gmail app password and Permit API key securely.

3. Run Frontend
cd client
npm install
npm run dev

4. Test Role-Based Commands
 Allowed (admin only):

/send_email Subject: "TIU News" Body: "Join us this Friday at the Hackathon!"
Rejected (for visitors):
❌ You are not allowed to send emails.
Permission check is powered by Permit.io’s PDP (Policy Decision Point).

5. Permit.io Policy Design
Resource: chat_command

Actions: send_email_to_members

Roles: admin, visitor

Users: Defined in Permit dashboard (userId matches request body)

This project was submitted for the Permit.io Hackathon – AI Access Control Challenge



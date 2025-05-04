export const askGemini = async (message) => {
  try {
    const response = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,               // example: "/send_email Subject: \"TIU Update\" Body: \"Join us Friday!\""
        role: "admin",         // make dynamic later if needed
        userId: "TIUIH"        // must match Permit user key
      }),
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Frontend Gemini Error:", error);
    return "⚠️ Cannot reach Gemini server.";
  }
};

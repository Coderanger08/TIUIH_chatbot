import axios from "axios";

const PERMIT_API_KEY = "PERMIT_API_KEY";
const PDP_URL = "https://api.permit.io";

export async function checkPermission(user, action, role) {
  try {
    const response = await axios.post(
      `${PDP_URL}/v2/allowed`,
      {
        user: { key: user },
        action,
        resource: { key: "chat_command" },
        context: { role }
      },
      {
        headers: {
          Authorization: `Bearer ${PERMIT_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    return response.data.allow;
  } catch (error) {
    console.error("Permit check failed:", error.response?.data || error.message);
    return false;
  }
}

import axios from "axios";

const baseUrl = process.env.REACT_APP_PROVIDER_API_AWS_DOMAIN || "http://localhost:8000";

export const sendEventLog = async (event: string, info: any, token: string) => {
  const eventUrl = `${baseUrl}/prescreen/events/${event}?token=${token}`

  event = event.replace("_", "-")

  try {
    await axios.post(eventUrl, {
      ...info,
      source: "profiler-browser",
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

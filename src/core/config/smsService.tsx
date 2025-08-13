// sms.service.ts
import axios from "axios";

export const useSmsService = () => {
  const sendSms = async (phoneNumber: string, message: string) => {
    try {
      await axios.post(
        "http://localhost:3001/sms/send-message",
        {
          message,
          phoneNumber,
        },
      );
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  return { sendSms };
};
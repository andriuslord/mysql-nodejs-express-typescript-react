import { Event } from "./types";
import axios from "axios";

export const service = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const response = await axios.get("http://localhost:3000/events"); // Realiza la llamada al backend para obtener los eventos
      const events = response.data; // Suponiendo que el backend devuelve un array de eventos en el cuerpo de la respuesta
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  },

};

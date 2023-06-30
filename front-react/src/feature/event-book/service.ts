import { Event } from "./types";
import axios from "axios";

export const service = {
  async getEventById(id: string): Promise<Event> {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event");
    }
  },



  async  book(props: { eventId: string; selectedSeats: number[] }): Promise<{ reserveId: string }> {
    try {
      const response = await axios.post("http://localhost:3000/reserve", props);
      const data = response.data; // Suponiendo que el backend devuelve un objeto con el reserveId en el cuerpo de la respuesta
      return data;
    } catch (error) {
      console.error("Error booking event:", error);
      const errorMessage = `Failed to book event. Status code: ${error.response?.status}, Error message: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
};

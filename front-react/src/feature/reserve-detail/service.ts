import { Reserve } from "./types";

export const service = {
  async getReserveById(id: string): Promise<Reserve> {
    try {
      const response = await fetch(`http://localhost:3000/reserve/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event");
    }
  },
};


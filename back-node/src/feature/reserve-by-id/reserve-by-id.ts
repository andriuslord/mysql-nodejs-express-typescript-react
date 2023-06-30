import { EventRepository } from "../../persistence/event";
import { ReserveRepository } from "../../persistence/reserve";

type Response = {
  id: string;
  seats: number[];
  event: {
    id: string;
    name: string;
    date: string;
  };
};

export function ReserveById(props: {
  eventRepository: EventRepository;
  reserveRepository: ReserveRepository;
}) {
  return async (id: string): Promise<Response | null> => {
    const reserve = await props.reserveRepository.findById(id);
    if (!reserve) {
      return null;
    }
    const reserves = await props.reserveRepository.findByEventId(reserve.eventId);
    const reservedSeats = reserves.flatMap((reserve) => reserve.seats);

    // Obtén los detalles del evento a partir del repositorio de eventos
    const event = await props.eventRepository.findById(reserve.eventId);
    if (!event) {
      return null;
    }

    return {
      id: reserve.id,
      seats: reserve.seats,
      event: {
        id: reserve.eventId,
        name: event.name, // Utiliza event.name en lugar de reserve.eventName
        date: event.date, // Utiliza event.date en lugar de reserve.eventDate
      },
    };
  };
}

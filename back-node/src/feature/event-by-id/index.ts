import { reserveMysqlRepository } from "../../persistence/reserve/adapter/mysql";
import { eventMysqlRepository } from "../../persistence/event/adapter/mysql";
import { EventById } from "./event-by-id";

export const eventById = EventById({
  eventRepository: eventMysqlRepository,
  reserveRepository: reserveMysqlRepository,
});

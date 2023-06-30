import { eventMysqlRepository } from "../../persistence/event/adapter/mysql";
import { EventList } from "./event-list";

export const eventList = EventList({ eventRepository: eventMysqlRepository });

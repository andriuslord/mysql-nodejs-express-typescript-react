import { ReserveById } from "./reserve-by-id";
import { reserveMysqlRepository } from "../../persistence/reserve/adapter/mysql";
import { eventMysqlRepository } from "../../persistence/event/adapter/mysql";

export const reserveById = ReserveById({
    eventRepository: eventMysqlRepository,
    reserveRepository: reserveMysqlRepository,
});

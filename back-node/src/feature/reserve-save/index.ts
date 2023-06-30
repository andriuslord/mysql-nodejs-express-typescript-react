import { reserveMysqlRepository } from "../../persistence/reserve/adapter/mysql";
import { ReserveSave } from "./reserve-save";

export const reserveSave = ReserveSave({
  reserveRepository: reserveMysqlRepository,
});

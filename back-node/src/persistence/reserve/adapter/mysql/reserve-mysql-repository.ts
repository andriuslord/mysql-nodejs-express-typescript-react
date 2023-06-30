import { ReserveEntity } from "../../reserve-entity";
import { ReserveRepository } from "../../reserve-repository";
import mysql from "mysql";
import { createDatabaseConnection } from "../../../database";

export class ReserveMySQLRepository implements ReserveRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = createDatabaseConnection();
  }

  async save(reserve: ReserveEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Realiza una consulta INSERT para guardar la reserva en la base de datos
      this.connection.query(
          "INSERT INTO reserves (id, eventId, seats) VALUES (?, ?, ?)",
          [reserve.id, reserve.eventId, JSON.stringify(reserve.seats)],
          (error) => {
            if (error) {
              console.error("Error al guardar la reserva:", error);
              reject(error);
            } else {
              resolve();
            }
          }
      );
    });
  }

  async findById(id: string): Promise<ReserveEntity | null> {
    return new Promise<ReserveEntity | null>((resolve, reject) => {
      // Realiza una consulta SELECT para obtener una reserva por su ID
      this.connection.query(
          "SELECT * FROM reserves WHERE id = ?",
          [id],
          (error, results) => {
            if (error) {
              console.error("Error al obtener la reserva:", error);
              reject(error);
            } else {
              if (results.length === 0) {
                resolve(null);
              } else {
                // Convierte el resultado de la consulta a un objeto ReserveEntity
                const reserve: ReserveEntity = {
                  id: results[0].id,
                  eventId: results[0].eventId,
                  seats: JSON.parse(results[0].seats),
                };

                resolve(reserve);
              }
            }
          }
      );
    });
  }

  async findByEventId(eventId: string): Promise<ReserveEntity[]> {
    return new Promise<ReserveEntity[]>((resolve, reject) => {
      // Realiza una consulta SELECT para obtener todas las reservas de un evento por su ID
      this.connection.query(
          "SELECT * FROM reserves WHERE eventId = ?",
          [eventId],
          (error, results) => {
            if (error) {
              console.error("Error al obtener las reservas:", error);
              reject(error);
            } else {
              // Mapea los resultados de la consulta a objetos ReserveEntity
              const reserves: ReserveEntity[] = results.map((row: any) => ({
                id: row.id,
                eventId: row.eventId,
                seats: JSON.parse(row.seats),
              }));

              resolve(reserves);
            }
          }
      );
    });
  }
}

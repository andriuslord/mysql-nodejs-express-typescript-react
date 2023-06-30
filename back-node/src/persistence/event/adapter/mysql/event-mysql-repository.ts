import { EventEntity } from "../../event-entity";
import { EventRepository } from "../../event-repository";
import mysql from "mysql";
import { createDatabaseConnection } from "../../../database";
export class EventMySQLRepository implements EventRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = createDatabaseConnection();
  }

  async findAll(): Promise<EventEntity[]> {
    return new Promise<EventEntity[]>((resolve, reject) => {
// Realiza una consulta SELECT para obtener todos los eventos de la base de datos
      this.connection.query("SELECT * FROM events", (error, results) => {
        if (error) {
          console.error("Error al obtener los eventos:", error);
          reject(error);
        } else {
// Mapea los resultados de la consulta a objetos EventEntity
          const events: EventEntity[] = results.map((row: any) => ({
            id: row.id,
            name: row.name,
            date: row.date,
            price: row.price,
          }));

          resolve(events);
        }
      });
    });
  }

  async findById(id: string): Promise<EventEntity | null> {
    return new Promise<EventEntity | null>((resolve, reject) => {
// Realiza una consulta SELECT para obtener un evento por su ID
      this.connection.query(
          "SELECT * FROM events WHERE id = ?",
          [id],
          (error, results) => {
            if (error) {
              console.error("Error al obtener el evento:", error);
              reject(error);
            } else {
              if (results.length === 0) {
                resolve(null);
              } else {
// Convierte el resultado de la consulta a un objeto EventEntity
                const event: EventEntity = {
                  id: results[0].id,
                  name: results[0].name,
                  date: results[0].date,
                  price: results[0].price,
                };

                resolve(event);
              }
            }
          }
      );
    });
  }
}

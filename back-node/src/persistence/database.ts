import mysql from "mysql";

export function createDatabaseConnection() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "cinema",
    });

    connection.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err);
            return;
        }
        console.log("Conexión exitosa a la base de datos MySQL");
    });

    return connection;
}

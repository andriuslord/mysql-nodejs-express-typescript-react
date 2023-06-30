import { Link, useParams } from "react-router-dom";
import style from "./reserve-detail.module.css";
import { Layout } from "../../components/layout";
import { BookQR} from "./components";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { Reserve } from "./types";
import { service } from "./service";

export const ReserveDetail = () => {
    const { bookingId } = useParams<"bookingId">();
    const [reserve, setReserve] = useState<Reserve | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar la carga

    useEffect(() => {
        if (!bookingId) {
            return;
        }

        // Simular una demora de 2 segundos antes de obtener la reserva
        setTimeout(() => {
            service.getReserveById(bookingId).then((reserve) => {
                setReserve(reserve);
                setIsLoading(false); // Cambiar el estado a false cuando se ha cargado la reserva
            });
        }, 1000);
    }, [bookingId]);

    if (isLoading) {
        return  <ClipLoader/>; // Mostrar el spinner mientras se carga la reserva
    }


    if (!reserve) {
        return  <ClipLoader/>
        null;
    }

    // Format the date
    const formattedDate = new Date(reserve.event.date).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <Layout>
            <Link className={style.back} to="/">
                Inicio
            </Link>

            <div className={style.content}>
                <h1 className={style.title}>¡Reserva exitosa!</h1>

                <h2 className={style.eventName}>{reserve.event.name}</h2>
                <p className={style.eventDate}>{formattedDate}</p>

                <h3 className={style.reserveTitle}>Reserva</h3>
                <p className={style.reserveId}>{reserve.id}</p>

                <h3 className={style.seatsTitle}>Asientos</h3>
                <p className={style.seatsNumbers}>{reserve.seats.join(",")}</p>

                <BookQR bookingId={bookingId} />
            </div>
        </Layout>
    );
};

import style from "./event-book.module.css";
import { Layout } from "../../components/layout";
import { BookButton, SeatList, SeatListItem, Screen } from "./components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event } from "./types";
import ClipLoader from "react-spinners/ClipLoader";
import { service } from "./service";
import moment from "moment";
import {Reserve} from "../reserve-detail/types";

export const EventBook = () => {
    const maxSeats = 32;
    const navigate = useNavigate();
    const { eventId } = useParams<"eventId">();
    const [event, setEvent] = useState<Event | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Estado para guardar los asientos seleccionados
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar la carga
    const [reserve, setReserve] = useState<Reserve | null>(null);
    useEffect(() => {
        if (!eventId) {
            return;
        }
        setTimeout(() => {
            service.getEventById(eventId).then((event) => {
                setEvent(event);
                setIsLoading(false); // Cambiar el estado a false cuando se ha cargado la reserva
            });
        }, 1000);
    }, [eventId]);

    const submit = () => {
        if (!eventId) {
            return;
        }

        service
            .book({
                eventId: eventId,
                selectedSeats: selectedSeats,
            })
            .then((response) => {
              const reserve = response.reserveId;
                navigate(`/reserve/${response.id}`);
            });
    };

    const computeAmount = () => {
        // Calcular el monto total de los asientos seleccionados
        return selectedSeats.length * event.price;
    };

    const toggleSeatSelection = (seatNumber: number) => {
        // Marcar o desmarcar un asiento al hacer clic en él
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            if (selectedSeats.length < 4) {
                setSelectedSeats([...selectedSeats, seatNumber]);
            }
        }
    };

    if (isLoading) {
        return  <ClipLoader/>;
    }

    if (!event) {
        return <ClipLoader/>
        null;
    }

    return (
        <Layout>
            <Link className={style.back} to="..">
                Atrás
            </Link>

            <h1 className={style.title}>{event.name}</h1>
            <p className={style.date}>
                {moment(event.date).format("DD/MM/YYYY HH:mm")} {/* Mostrar la fecha en formato "DD/MM/YYYY HH:mm" utilizando moment */}
            </p>

            <Screen />
            <SeatList>
                {Array.from({ length: maxSeats }, (_, idx) => idx + 1).map((number) => {
                    const isReserved = event.reservedSeats.indexOf(number) !== -1;
                    const isSelected = selectedSeats.includes(number); // Verificar si el asiento está seleccionado

                    return (
                        <SeatListItem
                            key={number}
                            number={number}
                            isReserved={isReserved}
                            isSelected={isSelected}
                            onClick={() => toggleSeatSelection(number)} // Manejar el evento onClick para marcar/desmarcar el asiento
                        />
                    );
                })}
            </SeatList>
            <p>Asientos seleccionados: {selectedSeats.join(", ")}</p> {/* Mostrar los asientos seleccionados */}
            <BookButton
                amount={computeAmount().toString()}
                onClick={submit}
                disabled={selectedSeats.length === 0}
            />
        </Layout>
    );
};

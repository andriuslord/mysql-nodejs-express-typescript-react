import React from "react";
import style from "./book-qr.module.css";
import QrCode from "./QrCode";

interface BookQRProps {
    bookingId: string;
}

export const BookQR: React.FC<BookQRProps> = ({ bookingId }) => {
    return (
        <div className={style.container}>
            <QrCode value={bookingId} />
        </div>
    );
};

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
    value: string;
}

const QrCode: React.FC<QrCodeProps> = ({ value }) => {
    const qrRef = useRef();

    const qrcode = (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "110%",
            height: "110%"
        }}>
            <QRCodeCanvas
                id="qrCode"
                value={value}
                size={110}
                width={10}
                bgColor={"#00ff00"}
                level={"H"}
            />
        </div>
    );

    return (
        <div className="qrcode__container">
            <div ref={qrRef}>{qrcode}</div>
        </div>
    );
};

export default QrCode;

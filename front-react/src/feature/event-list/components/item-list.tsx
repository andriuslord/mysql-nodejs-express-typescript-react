
import style from "./item-list.module.css";
import { Link } from "react-router-dom";
import moment from "moment";

export const ItemList = (props: { children?: React.ReactNode }) => {
    return (
        <div className={style.container}>
            <ul className={style.list}>{props.children}</ul>
        </div>
    );
};


export const ItemListRow = (props: {
    to: string;
    name: string;
    date: string;
}) => {
    const formattedDate = moment(props.date).format("DD/MM/YYYY HH:mm");

    return (
        <li className={style.item}>
            <Link className={style.item_link} to={props.to}>
                <div className={style.item_name}>{props.name}</div>
                <div className={style.item_date}>{formattedDate}</div>
            </Link>
        </li>
    );
};

import style from "./book-button.module.css";

export const BookButton = (props: { amount: string; onClick?: () => void,disabled }) => {
  return (

    <div className={style.container}>
      <button className={style.button} onClick={() => props.onClick?.()} disabled={props.disabled}>
        <div className={style.amount}>$ {props.amount}</div>
        <div className={style.label}>Reservar</div>
      </button>
    </div>
  );
};

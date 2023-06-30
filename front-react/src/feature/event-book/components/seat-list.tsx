import style from "./seat-list.module.css";

export const SeatList = (props: { children?: React.ReactNode }) => {
  return (
      <div className={style.container}>
        <div className={style.list}>{props.children}</div>
      </div>
  );
};

export const SeatListItem = (props: {
  number: number;
  isReserved?: boolean;
  isSelected?: boolean;
  onClick?: (selectedNumber: number) => void;
}) => {
  const cls = [style.item];
  if (props.isSelected) {
    cls.push(style.item_selected);
  }

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.number);
    }
  };

  return (
      <button
          className={cls.join(" ")}
          disabled={props.isReserved}
          onClick={handleClick}
      >
        {props.number}
      </button>
  );
};

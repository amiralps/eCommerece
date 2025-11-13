import {Link} from "react-router-dom";
import styles from "../styles/Cards.module.css";
import {TbListDetails} from "react-icons/tb";
import {shortenText} from "../helper/helper.js";
import ButtonBox from "./ButtonBox.jsx";

function Card({data: {id, title, image, price}, data}) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price}$</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <ButtonBox data={data} />
      </div>
    </div>
  );
}

export default Card;

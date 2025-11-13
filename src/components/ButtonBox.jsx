import {MdDeleteOutline} from "react-icons/md";
import {productQuantity} from "../helper/helper.js";
import styles from "../styles/Buttons.module.css";
import {TbShoppingBagPlus} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem, incrementItem, decrementItem} from "../features/cart/cartSlice.js";

function ButtonBox({data: {id}, data}) {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  const quantity = productQuantity(carts, id);
  return (
    <div className={styles.buttonbox}>
      <button
        className={`${styles.one}${quantity !== 0 ? ` ${styles.active}` : ""}`}
        onClick={() => {
          quantity === 1 ? dispatch(removeItem(data)) : dispatch(decrementItem(data));
        }}>
        {quantity <= 1 ? <MdDeleteOutline /> : "-"}
      </button>
      <span className={quantity > 0 ? styles.active : null}>{quantity > 0 ? quantity : quantity + 1}</span>
      {quantity === 0 ? (
        <button
          onClick={() => {
            dispatch(addItem(data));
          }}>
          <TbShoppingBagPlus />
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch(incrementItem(data));
          }}>
          +
        </button>
      )}
    </div>
  );
}

export default ButtonBox;

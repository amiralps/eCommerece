import {shortenText} from "../helper/helper.js";
import styles from "../styles/CheckOut.module.css";
import ButtonBox from "../components/ButtonBox.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkOut} from "../features/cart/cartSlice";
import {Link} from "react-router-dom";

function CheckOut() {
  const carts = useSelector((state) => state.carts);
  console.log(carts);
  const dispatch = useDispatch();
  const {selectedItems} = carts;
  return (
    <>
      {selectedItems.length !== 0 ? (
        <div className={styles.container}>
          <div className={styles.totalDetails}>
            <h1>Purchase Receipt</h1>
            <h4>Items Count : {carts.itemsCounter}</h4>
            <h4>Total Price : {carts.total}$ </h4>
            <button
              onClick={() => {
                dispatch(checkOut());
              }}>
              Check Out
            </button>
          </div>
          <div className={styles.pDetails}>
            <ul>
              {carts.selectedItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.id} />
                  <div className={styles.productsContainer}>
                    <h3>{shortenText(item.title, 14)}</h3>
                    <ButtonBox data={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <h1>You Didnt Choose Any Product</h1>
          <Link to={"/"}>Go To Products</Link>
        </div>
      )}
    </>
  );
}

export default CheckOut;

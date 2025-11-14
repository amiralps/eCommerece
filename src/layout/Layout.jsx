import {Link} from "react-router-dom";
import styles from "../styles/Layout.module.css";
import {PiShoppingCartSimpleBold} from "react-icons/pi";
import {useRef} from "react";
import { useSelector } from "react-redux";

function Layout({children}) {
  const carts = useSelector(state => state.carts);
  const countSpan = useRef();
  const addDiv = () => {
    if (carts.actionType == "INCREASE") {
      const increase = document.createElement("div");
      increase.innerText = "+1";
      countSpan.current.appendChild(increase);
      setTimeout(() => {
      increase.classList.add(styles.increased);
      }, 0);
      setTimeout(() => {
        increase.remove();
      }, 800);
    } else if (carts.actionType == "DECREASE") {
      const decrease = document.createElement("div");
      decrease.innerText = "-1";
      countSpan.current.appendChild(decrease);
      setTimeout(() => {
      decrease.classList.add(styles.decreased);
      }, 0);
      setTimeout(() => {
        decrease.remove();
      }, 800);
    }
  };
  return (
    <>
      <header className={styles.header}>
        <Link to={"/products"}>Fake Shop</Link>
        <Link ref={countSpan} to={"/checkout"}>
          <span className={carts.itemsCounter > 0 ? styles.added : null}>{carts.itemsCounter}</span>
          <PiShoppingCartSimpleBold />
          {addDiv()}
        </Link>
      </header>
      <div className={styles.children}>{children}</div>
      <footer className={styles.footer}>maded by amiralps</footer>
    </>
  );
}

export default Layout;

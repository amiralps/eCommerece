import {createQueryObject} from "../helper/helper.js";
import {FaListUl} from "react-icons/fa";
import styles from "../styles/SideBar.module.css";

const categories = [
  {id: 1, type: "All"},
  {id: 2, type: "Electronics"},
  {id: 3, type: "Jewelery"},
  {id: 4, type: "Men's Clothing"},
  {id: 5, type: "Women's Clothing"},
];
function SideBar({setQuery, query}) {
  const categoryHandler = (e) => {
    const {tagName} = e.target;
    const category = e.target.innerText.toLowerCase();
    setQuery((obj) => createQueryObject(obj, {category}));
    if (tagName != "LI") return;
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.p}>
          <FaListUl />
          <p>Categories</p>
        </div>
        <ul onClick={categoryHandler}>
          {categories.map((e) => {
            return (
              <li
                key={e.id}
                className={
                  query.category == e.type.toLowerCase()
                    ? styles.activeLi
                    : !query.category && e.type == "All"
                    ? styles.activeLi
                    : null
                }
              >
                {e.type}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;

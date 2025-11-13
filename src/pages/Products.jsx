import {ImSearch} from "react-icons/im";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import styles from "../styles/Products.module.css";
import {useEffect, useState} from "react";
import {searchProducts, filterSearch, createQueryObject, getInitialQuery} from "../helper/helper.js";
import {useSearchParams} from "react-router-dom";
import SideBar from "../components/SideBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../features/products/productsSlice.js";

function Products() {
  const dispatch = useDispatch();
  const {
    error: productsError,
    products: allProducts,
    loading: productsLoading,
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setQuery(getInitialQuery(searchParams));
    setDisplayed(allProducts);
  }, [allProducts]);
  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(allProducts, query.search);
    finalProducts = filterSearch(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  const searchHandler = () => {
    setQuery((obj) => createQueryObject(obj, {search}));
  };
  if (productsError) return <h1>Error : {productsError}</h1>
  return (
    <>
      {productsLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.search}>
            <input type="text" placeholder="Search ..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={searchHandler}>
              <ImSearch />
            </button>
          </div>
          <div className={styles.container}>
            <div className={!displayed.length ? `${styles.products} ${styles.notfoundsearch}` : `${styles.products}`}>
              {!displayed.length && <h2>not founded product with your search...</h2>}
              {displayed.map((p) => (
                <Card key={p.id} data={p} />
              ))}
            </div>
            <SideBar query={query} setQuery={setQuery} searchParams={searchParams} />
          </div>
        </>
      )}
    </>
  );
}

export default Products;

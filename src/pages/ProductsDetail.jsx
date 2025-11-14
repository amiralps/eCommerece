import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NotFound from "./NotFound.jsx";
import styles from "../styles/ProductsDetail.module.css";
import {IoArrowBackOutline} from "react-icons/io5";
import Loader from "../components/Loader.jsx";
import api from "../sevices/config.js";
import {FaStar} from "react-icons/fa";
import {BsCurrencyDollar} from "react-icons/bs";

function ProductsDetail() {
  const {id} = useParams();
  const [pNotFound, setPNotFound] = useState();
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    api
      .get(`products/${id}`)
      .then((res) => {
        if (res.data !== "") {
          setProductDetail(res.data);
          setPNotFound(false);
        } else {
          setPNotFound(true);
          setProductDetail(["1"]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {productDetail.length === 0 ? (
        <Loader />
      ) : !pNotFound ? (
        <div className={styles.productcontainer}>
          <img src={productDetail.image} alt={productDetail.title} />
          <div className={styles.details}>
            <div>
              <h1>{productDetail.title}</h1>
              <p>{productDetail.description}</p>
              <div className={styles.linedetail}>
                <p>
                  {productDetail.price}
                  <span>
                    <BsCurrencyDollar />
                  </span>
                </p>
                <p>
                  {productDetail.rating.rate}
                  <span>
                    <FaStar />
                  </span>
                </p>
                <p>Saled Counts : {productDetail.rating.count}</p>
              </div>
            </div>
            <div className={styles.backbutton}>
              <Link to="/products">
                <IoArrowBackOutline />
                Back Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default ProductsDetail;

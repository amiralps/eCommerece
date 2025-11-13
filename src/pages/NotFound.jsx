import {Link} from "react-router"
import { useEffect } from "react"
import styles from "../styles/NotFound.module.css"

function NotFound() {
  useEffect(() => {
    document.title = "not found"
  },[])
  return (
    <>
      <div className={styles.nf}>
        <h1 className={styles.nfh1}>404</h1>
        <p className={styles.nfp}>Page Not Found</p>
        <Link to="/products" className={styles.nfa}>
          Back To Products
        </Link>
      </div>
    </>
  )
}

export default NotFound

import { Link } from "react-router-dom";
import Four from '../../assets/icons/four.svg'
import NotFoundImg from '../../assets/images/not-found.png'

import styles from './NotFound.module.css';


export default function NotFound() {
    return (
        <div className="globalContainer">
            <div className={styles.container}>
                <div className={styles.imgBox}>
                    <img src={Four} alt="404" className={styles.img} />
                    <img src={NotFoundImg} alt="404" className={styles.img} />
                    <img src={Four} alt="404" className={styles.img} />
                </div>
                <div className={styles.info}>
                    <h2 className={styles.title}>Page Not Found</h2>
                    <p className={styles.message}>
                        We’re sorry, the page you requested could not be found. <br /> Please go back to the homepage.
                    </p>
                </div>
                <Link to='/' className={styles.homeBtn}>Go Home</Link>
            </div>
        </div>
    )
}
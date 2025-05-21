import styles from './HomePage.module.css'
import BackgroundImg from '../../assets/images/mainP-banner.jpg'

import { Link } from 'react-router-dom'

import DiscountForm from '../../components/DiscountForm/DiscountForm'
import CategoriesBlock from '../../components/CategoriesBlock/CategoriesBlock'
import SalesBlock from '../../components/SalesBlock/SalesBlock'

export default function HomePage() {
    return (
        <div>
            <div className="globalContainer">
                <div className={styles.content}>
                    <h1>Amazing Discounts <br/> on Pets Products!</h1>
                    <Link to='/sale' className={styles.salesBtn}>Check out</Link> 
                </div>
            </div>
            <div className={styles.bgImg} style={{ backgroundImage: `url(${BackgroundImg})` }}></div>

            <CategoriesBlock/>
            <DiscountForm/>
            <SalesBlock/>
        </div>
    )
}


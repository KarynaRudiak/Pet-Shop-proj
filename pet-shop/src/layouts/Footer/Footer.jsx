import InstaLogo from '../../assets/icons/ic-instagram.svg';
import WhatsAppLogo from '../../assets/icons/ic-whatsapp.svg'

import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="globalContainer">
                <h2>Contact</h2>
                <div className={styles.gridContainer}>
                    <div className={styles.gridItem}>
                        <p>Phone</p>
                        <p>+49 30 915-88492</p>
                    </div>
                    <div className={styles.gridItem}>
                        <p>Socials</p>
                        <div className={styles.mediaIcons}>
                            <a href="https://www.instagram.com" target="_blank" >
                                <img src={InstaLogo} alt="instagram" /></a>
                            <a href="https://www.whatsapp.com/">
                                <img src={WhatsAppLogo} alt="whatsapp" target="_blank" /></a>
                        </div>
                    </div>
                    <div className={styles.gridItem}>
                        <p>Address</p>
                        <address>Wallstraße 9-13, 10179 Berlin, Deutschland</address>
                    </div>
                    <div className={styles.gridItem}>
                        <p>Working Hours</p>
                        <p>24 hours a day</p>
                    </div>
                </div>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.826268337366!2d13.414859276739949!3d52.51314577981495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e56fa34a65%3A0x80b6a3f172a2270b!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1622039898429!5m2!1sen!2sus&zoom=15&disableDefaultUI=true&scrollwheel=false"
                    ></iframe>
                </div>
            </div>
        </footer>
    )
}
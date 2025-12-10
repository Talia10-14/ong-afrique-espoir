'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Jean YATTA</h3>
                        <p className={styles.footerText}>
                            Designer Graphique Polyvalent
                            <br />
                            Créativité, Technique et Sens Marketing
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerSubtitle}>Navigation</h4>
                        <nav className={styles.footerNav}>
                            <Link href="#about" className={styles.footerLink}>À Propos</Link>
                            <Link href="#skills" className={styles.footerLink}>Compétences</Link>
                            <Link href="#portfolio" className={styles.footerLink}>Portfolio</Link>
                            <Link href="#services" className={styles.footerLink}>Services</Link>
                            <Link href="#contact" className={styles.footerLink}>Contact</Link>
                        </nav>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerSubtitle}>Réseaux Sociaux</h4>
                        <div className={styles.socialLinks}>
                            <a href="https://www.facebook.com/jean.wayne.370654" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Jean YATTA. Tous droits réservés.
                    </p>
                    <div className={styles.footerLinks}>
                        <Link href="/mentions-legales" className={styles.footerLink}>Mentions Légales</Link>
                        <Link href="/confidentialite" className={styles.footerLink}>Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

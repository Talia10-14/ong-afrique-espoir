import Link from 'next/link';
import { personalInfo } from '@/data/content';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.heroBackground}>
                <div className={styles.heroPattern}></div>
            </div>

            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={`${styles.heroTitle} animate-fade-in`}>
                            Bonjour, je suis <br />
                            <span className={styles.heroName}>{personalInfo.name}</span>
                        </h1>

                        <p className={`${styles.heroSubtitle} animate-fade-in`}>
                            {personalInfo.title}
                        </p>

                        <p className={`${styles.heroTagline} animate-fade-in`}>
                            {personalInfo.tagline}
                        </p>

                        <div className={`${styles.heroButtons} animate-fade-in`}>
                            <Link href="#portfolio" className="btn btn-primary">
                                Voir mes Projets
                            </Link>
                            <Link href="#contact" className="btn btn-outline">
                                Me Contacter
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.heroCircle}>
                            <div className={styles.heroCircleInner}>
                                <img
                                    src="/images/jean-profile.jpg"
                                    alt="Jean Guillaume - Designer Graphique"
                                    className={styles.heroImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroScroll}>
                    <span>Scroll</span>
                    <div className={styles.heroScrollLine}></div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState } from 'react';
import { personalInfo } from '@/data/content';
import styles from './Contact.module.css';

export default function Contact() {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmailClick = () => {
        window.location.href = `mailto:${personalInfo.email}`;
        setIsOpen(false);
    };

    const handleWhatsAppClick = () => {
        const formattedPhone = personalInfo.whatsapp.replace(/\s/g, '');
        window.open(`https://wa.me/${formattedPhone}`, '_blank');
        setIsOpen(false);
    };

    return (
        <>
            <section className="section" id="contact">
                <div className="container">
                    <h2 className="section-title">Contactez-Moi</h2>

                    <div className={styles.contactContent}>
                        <div className={styles.contactInfo}>
                            <h3 className={styles.contactTitle}>Travaillons Ensemble</h3>
                            <p className={styles.contactText}>
                                Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins.
                                Je serais ravi de vous aider à concrétiser vos idées.
                            </p>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>📧</div>
                                    <div>
                                        <h4>Email</h4>
                                        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>📱</div>
                                    <div>
                                        <h4>Téléphone</h4>
                                        <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>💬</div>
                                    <div>
                                        <h4>WhatsApp</h4>
                                        <a href={`https://wa.me/${personalInfo.whatsapp.replace(/\s/g, '')}`}>{personalInfo.whatsapp}</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>📍</div>
                                    <div>
                                        <h4>Localisation</h4>
                                        <p>{personalInfo.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.socialLinks}>
                                <h4>Suivez-moi</h4>
                                <div className={styles.socialIcons}>
                                    <a href={personalInfo.social.facebook} className={styles.socialLink} aria-label="Facebook">
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Contact Button */}
            <div className={styles.floatingContact}>
                <button 
                    className={`${styles.floatingButton} ${isOpen ? styles.active : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Ouvrir les options de contact"
                >
                    {isOpen ? '✕' : 'Contactez-moi'}
                </button>

                {isOpen && (
                    <div className={styles.contactOptions}>
                        <button 
                            className={styles.contactOption}
                            onClick={handleEmailClick}
                        >
                            <span className={styles.optionIcon}>📧</span>
                            <span className={styles.optionText}>Email</span>
                        </button>
                        <button 
                            className={styles.contactOption}
                            onClick={handleWhatsAppClick}
                        >
                            <span className={styles.optionIcon}>💬</span>
                            <span className={styles.optionText}>WhatsApp</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

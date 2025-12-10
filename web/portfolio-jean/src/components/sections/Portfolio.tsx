'use client';

import { useState } from 'react';
import { projects } from '@/data/content';
import styles from './Portfolio.module.css';

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);

    const categories = [
        { id: 'all', label: 'Tous les Projets' },
        { id: 'design-graphique', label: 'Design Graphique' },
        { id: 'video', label: 'Vidéo' },
        { id: 'ebooks', label: 'E-books' },
        { id: 'presentations', label: 'Présentations' },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);
    const hasMore = filteredProjects.length > 3;

    return (
        <section className={styles.portfolioSection} id="portfolio">
            <div className="container">
                <h2 className="section-title" style={{ color: 'white' }}>Mon Portfolio</h2>

                <div className={styles.filters}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`${styles.filterButton} ${activeFilter === category.id ? styles.active : ''}`}
                            onClick={() => {
                                setActiveFilter(category.id);
                                setShowAll(false);
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className={styles.projectsList}>
                    {displayedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`${styles.projectItem} ${index % 2 === 1 ? styles.reverse : ''}`}
                        >
                            <div className={styles.projectContent}>
                                <div className={styles.projectCategory}>{project.categoryLabel}</div>
                                <h3 className={styles.projectTitle}>{project.title}</h3>

                                <div className={styles.projectDescription}>
                                    <p>{project.description}</p>

                                    {project.client && (
                                        <p><strong>Client:</strong> {project.client}</p>
                                    )}

                                    {project.tools && project.tools.length > 0 && (
                                        <p><strong>Outils:</strong> {project.tools.join(', ')}</p>
                                    )}

                                    {project.results && (
                                        <p><strong>Résultats:</strong> {project.results}</p>
                                    )}
                                </div>

                                <div className={styles.projectMeta}>
                                    <span className={styles.projectRole}>{project.role}</span>
                                    <span className={styles.projectYear}>{project.year}</span>
                                </div>
                            </div>

                            <div className={styles.projectImageWrapper}>
                                {project.thumbnail ? (
                                    <img
                                        src={`/images/projects/projet-${projects.indexOf(project) + 1}.jpg`}
                                        alt={project.title}
                                        className={styles.projectImage}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        <span className={styles.projectNumber}>{projects.indexOf(project) + 1}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className={styles.showMoreContainer}>
                        <button
                            className={styles.showMoreButton}
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Voir Moins' : 'Voir Plus de Projets'}
                            <svg
                                className={`${styles.arrow} ${showAll ? styles.arrowUp : ''}`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M5 7.5L10 12.5L15 7.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className={styles.noProjects}>
                        <p>Aucun projet dans cette catégorie pour le moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

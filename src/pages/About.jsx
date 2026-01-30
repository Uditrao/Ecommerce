import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Zap, Eye, Recycle, Users, Award } from 'lucide-react';
import styles from './About.module.css';

const values = [
    { icon: Leaf, title: 'Sustainability First', desc: 'Every decision starts with environmental impact. If we cant do it cleanly, we dont do it.' },
    { icon: Zap, title: 'Uncompromised Effectiveness', desc: 'Eco-friendly means nothing if it doesnt work. We demand performance.' },
    { icon: Eye, title: 'Radical Transparency', desc: 'From sourcing to shipping, we share everything. No greenwashing, ever.' }
];

const metrics = [
    { value: '2M+', label: 'Spray cans replaced' },
    { value: '50K+', label: 'Happy customers' },
    { value: '0', label: 'Chemicals used' },
    { value: '100%', label: 'Biodegradable' }
];

const About = () => {
    return (
        <div className={styles.about}>
            {/* Section 1: Mission Statement */}
            <section className={styles.mission}>
                <div className="container">
                    <h1>We believe fresh shoes shouldnt cost the planet.</h1>
                    <p className={styles.missionText}>
                        SneakerFresh exists to end the toxic cycle of chemical sprays and wasted footwear.
                        We prove that natural solutions can outperform synthetic ones.
                    </p>
                </div>
            </section>

            {/* Section 2: Founder Story */}
            <section className={`${styles.founder} container section-padding`}>
                <div className={styles.founderGrid}>
                    <div className={styles.founderImage}>
                        <div className={styles.imagePlaceholder}>Founder Photo</div>
                    </div>
                    <div className={styles.founderContent}>
                        <span className={styles.label}>The Origin Story</span>
                        <h2>From Frustration to Revolution</h2>
                        <p>
                            It started in a gym locker room. After another embarrassing moment with smelly sneakers,
                            I reached for the usual aerosol spray - and stopped. Why was I spraying toxic chemicals
                            into shoes my feet would sweat into tomorrow?
                        </p>
                        <p>
                            As a materials scientist, I knew there had to be a better way. Six months of research
                            and 47 prototypes later, SneakerFresh was born: a reusable, natural solution that
                            actually works better than anything on the market.
                        </p>
                        <p className={styles.signature}>- Alex Chen, Founder</p>
                    </div>
                </div>
            </section>

            {/* Section 3: The Problem */}
            <section className={styles.problem}>
                <div className="container section-padding">
                    <h2>The Problem We're Solving</h2>
                    <div className={styles.problemGrid}>
                        <div className={styles.problemCard}>
                            <span className={styles.stat}>3.8B</span>
                            <span className={styles.statLabel}>Aerosol cans used yearly for shoe care</span>
                        </div>
                        <div className={styles.problemCard}>
                            <span className={styles.stat}>100+</span>
                            <span className={styles.statLabel}>Chemicals in typical shoe sprays</span>
                        </div>
                        <div className={styles.problemCard}>
                            <span className={styles.stat}>$240</span>
                            <span className={styles.statLabel}>Avg spent yearly on temporary solutions</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Our Solution */}
            <section className={`${styles.solution} container section-padding`}>
                <h2>Engineered Different</h2>
                <div className={styles.solutionContent}>
                    <p>
                        We combined volcanic zeolite minerals (natures most powerful absorbers) with
                        high-surface-area moso bamboo charcoal. The result? A pack that absorbs 3x more
                        moisture and odor than any spray - without a single chemical.
                    </p>
                    <p>
                        But the real innovation is reusability. Monthly UV recharging breaks down
                        trapped molecules, restoring full power. One purchase lasts 2+ years.
                    </p>
                </div>
            </section>

            {/* Section 5: Values Pillars */}
            <section className={styles.values}>
                <div className="container section-padding">
                    <h2>What We Stand For</h2>
                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <div key={i} className={styles.valueCard}>
                                <v.icon size={32} className={styles.valueIcon} />
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Manufacturing */}
            <section className={`${styles.manufacturing} container section-padding`}>
                <h2>How It's Made</h2>
                <div className={styles.mfgGrid}>
                    <div className={styles.mfgItem}>
                        <h3>Sourcing</h3>
                        <p>Volcanic minerals from sustainable Icelandic deposits. Moso bamboo from certified forests in Japan.</p>
                    </div>
                    <div className={styles.mfgItem}>
                        <h3>Production</h3>
                        <p>Hand-assembled in a solar-powered facility. Fair wages, safe conditions, zero waste policy.</p>
                    </div>
                    <div className={styles.mfgItem}>
                        <h3>Packaging</h3>
                        <p>FSC-certified recycled cardboard. Soy-based inks. No plastic anywhere in the supply chain.</p>
                    </div>
                </div>
            </section>

            {/* Section 7: Impact Metrics */}
            <section className={styles.impact}>
                <div className="container section-padding">
                    <h2>Our Impact</h2>
                    <div className={styles.impactGrid}>
                        {metrics.map((m, i) => (
                            <div key={i} className={styles.metric}>
                                <span className={styles.metricValue}>{m.value}</span>
                                <span className={styles.metricLabel}>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 8: Team - Optional */}
            <section className={`${styles.team} container section-padding`}>
                <h2>Small Team, Big Mission</h2>
                <p className={styles.teamText}>
                    We're a team of 8 based in Portland, Oregon. Materials scientists,
                    sustainability obsessives, and sneaker enthusiasts united by a simple belief:
                    better products shouldn't cost the earth.
                </p>
            </section>

            {/* Section 9: CTA */}
            <section className={styles.cta}>
                <div className="container">
                    <h2>Join the Solution</h2>
                    <p>Every pack you buy replaces 200+ spray applications. Your shoes - and the planet - will thank you.</p>
                    <Link to="/product" className={styles.ctaBtn}>Shop Now</Link>
                </div>
            </section>
        </div>
    );
};

export default About;

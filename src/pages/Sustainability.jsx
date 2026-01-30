import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Sun, Package, Award, Users, FileText, Download } from 'lucide-react';
import styles from './Sustainability.module.css';

const materials = [
    { name: 'Volcanic Zeolite', source: 'Iceland', decomposition: 'Returns to mineral state naturally' },
    { name: 'Moso Bamboo Charcoal', source: 'Japan', decomposition: '6-12 months in compost' },
    { name: 'Organic Cotton Shell', source: 'Turkey', decomposition: '3-6 months in compost' },
    { name: 'Cotton Thread', source: 'India', decomposition: '3-6 months in compost' }
];

const certifications = [
    { icon: Award, name: 'OEKO-TEX Standard 100', desc: 'Tested for harmful substances' },
    { icon: Leaf, name: 'FSC Certified', desc: 'Sustainable forestry sourcing' },
    { icon: Recycle, name: 'Carbon Neutral', desc: 'Offset all manufacturing emissions' }
];

const Sustainability = () => {
    return (
        <div className={styles.sustainability}>
            {/* Section 1: Commitment Statement */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>Sustainability Isn't a Feature. It's the Foundation.</h1>
                    <p className={styles.heroText}>
                        Every claim we make is backed by data. Every process is designed for minimal impact.
                        This page is our accountability to you and the planet.
                    </p>
                </div>
            </section>

            {/* Section 2: Materials Breakdown */}
            <section className={`${styles.materials} container section-padding`}>
                <h2>What's Inside</h2>
                <p className={styles.sectionIntro}>Every component is chosen for effectiveness AND end-of-life impact.</p>
                <div className={styles.materialsGrid}>
                    {materials.map((m, i) => (
                        <div key={i} className={styles.materialCard}>
                            <h3>{m.name}</h3>
                            <div className={styles.materialMeta}>
                                <span><strong>Source:</strong> {m.source}</span>
                                <span><strong>End of life:</strong> {m.decomposition}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Lifecycle Analysis */}
            <section className={styles.lifecycle}>
                <div className="container section-padding">
                    <h2>Full Lifecycle Impact</h2>
                    <div className={styles.lifecycleGrid}>
                        <div className={styles.lcCard}>
                            <Sun size={32} />
                            <h3>Production</h3>
                            <p>0.8 kg CO2 per pack (vs 2.4 kg for typical aerosol)</p>
                        </div>
                        <div className={styles.lcCard}>
                            <Package size={32} />
                            <h3>Shipping</h3>
                            <p>Carbon-neutral via verified offsets</p>
                        </div>
                        <div className={styles.lcCard}>
                            <Recycle size={32} />
                            <h3>Disposal</h3>
                            <p>100% compostable, zero landfill</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Reusability Economics */}
            <section className={`${styles.reuse} container section-padding`}>
                <h2>The Reuse Math</h2>
                <div className={styles.reuseGrid}>
                    <div className={styles.reuseCard}>
                        <span className={styles.bigNum}>1</span>
                        <span className={styles.reuseLabel}>SneakerFresh Pack</span>
                    </div>
                    <div className={styles.equals}>=</div>
                    <div className={styles.reuseCard}>
                        <span className={styles.bigNum}>50+</span>
                        <span className={styles.reuseLabel}>Spray cans avoided</span>
                    </div>
                    <div className={styles.equals}>=</div>
                    <div className={styles.reuseCard}>
                        <span className={styles.bigNum}>2+</span>
                        <span className={styles.reuseLabel}>Years of freshness</span>
                    </div>
                </div>
            </section>

            {/* Section 5: Carbon Footprint */}
            <section className={styles.carbon}>
                <div className="container section-padding">
                    <h2>Carbon Transparency</h2>
                    <div className={styles.carbonContent}>
                        <div className={styles.carbonText}>
                            <p><strong>Manufacturing:</strong> 0.8 kg CO2 per pack</p>
                            <p><strong>Shipping (US avg):</strong> 0.3 kg CO2 per order</p>
                            <p><strong>Total:</strong> ~1.1 kg CO2 per pack delivered</p>
                            <p className={styles.offset}>We offset 150% of emissions through verified reforestation projects.</p>
                        </div>
                        <div className={styles.carbonVs}>
                            <h4>Compare to alternatives:</h4>
                            <ul>
                                <li>Aerosol spray (annual): 12+ kg CO2</li>
                                <li>Replacing shoes monthly: 200+ kg CO2</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: Packaging */}
            <section className={`${styles.packaging} container section-padding`}>
                <h2>Zero-Waste Packaging</h2>
                <div className={styles.packagingGrid}>
                    <div className={styles.packItem}>
                        <h3>Box</h3>
                        <p>100% recycled cardboard, FSC-certified</p>
                    </div>
                    <div className={styles.packItem}>
                        <h3>Inks</h3>
                        <p>Soy-based, non-toxic printing</p>
                    </div>
                    <div className={styles.packItem}>
                        <h3>Filler</h3>
                        <p>Recycled paper, no plastic or foam</p>
                    </div>
                    <div className={styles.packItem}>
                        <h3>Labels</h3>
                        <p>Compostable adhesive, plant-based</p>
                    </div>
                </div>
            </section>

            {/* Section 7: Manufacturing Ethics */}
            <section className={styles.ethics}>
                <div className="container section-padding">
                    <h2>Ethical Manufacturing</h2>
                    <div className={styles.ethicsContent}>
                        <ul className={styles.ethicsList}>
                            <li><strong>Fair Wages:</strong> All workers paid 2x local minimum wage</li>
                            <li><strong>Safe Conditions:</strong> Regular third-party safety audits</li>
                            <li><strong>No Child Labor:</strong> Strict age verification protocols</li>
                            <li><strong>Solar Powered:</strong> 100% renewable energy in production</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 8: Certifications */}
            <section className={`${styles.certs} container section-padding`}>
                <h2>Verified & Certified</h2>
                <div className={styles.certsGrid}>
                    {certifications.map((c, i) => (
                        <div key={i} className={styles.certCard}>
                            <c.icon size={32} className={styles.certIcon} />
                            <h3>{c.name}</h3>
                            <p>{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 9: What We're Working On */}
            <section className={styles.roadmap}>
                <div className="container section-padding">
                    <h2>What We're Improving</h2>
                    <p className={styles.sectionIntro}>We're not perfect. Here's what we're working on:</p>
                    <div className={styles.roadmapGrid}>
                        <div className={styles.roadmapItem}>
                            <span className={styles.status}>In Progress</span>
                            <h3>Local Sourcing</h3>
                            <p>Moving bamboo sourcing to US-grown alternatives by 2025</p>
                        </div>
                        <div className={styles.roadmapItem}>
                            <span className={styles.status}>Researching</span>
                            <h3>Refill Program</h3>
                            <p>Testing a take-back program to extend cotton shell life</p>
                        </div>
                        <div className={styles.roadmapItem}>
                            <span className={styles.status}>Planned</span>
                            <h3>B-Corp Certification</h3>
                            <p>Formal application submitted, audit scheduled for Q3 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 10: Customer Impact */}
            <section className={styles.customerImpact}>
                <div className="container section-padding">
                    <h2>Your Impact</h2>
                    <div className={styles.impactCard}>
                        <p>Every SneakerFresh pack you use prevents:</p>
                        <div className={styles.impactStats}>
                            <div>
                                <span className={styles.impactNum}>50+</span>
                                <span>Spray cans from landfill</span>
                            </div>
                            <div>
                                <span className={styles.impactNum}>12 kg</span>
                                <span>CO2 emissions avoided</span>
                            </div>
                            <div>
                                <span className={styles.impactNum}>100+</span>
                                <span>Chemicals kept out of your shoes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 11: Transparency Resources */}
            <section className={`${styles.resources} container section-padding`}>
                <h2>Full Transparency</h2>
                <p className={styles.sectionIntro}>We don't just make claims. We back them up.</p>
                <div className={styles.resourcesGrid}>
                    <a href="#" className={styles.resourceLink}>
                        <FileText size={24} />
                        <span>Lifecycle Assessment Report (PDF)</span>
                    </a>
                    <a href="#" className={styles.resourceLink}>
                        <FileText size={24} />
                        <span>Material Safety Data Sheets</span>
                    </a>
                    <a href="#" className={styles.resourceLink}>
                        <FileText size={24} />
                        <span>Carbon Offset Certificates</span>
                    </a>
                </div>
            </section>

            {/* Section 12: CTA */}
            <section className={styles.cta}>
                <div className="container">
                    <h2>Make the Sustainable Choice</h2>
                    <p>Your purchase supports a cleaner future for footwear care.</p>
                    <Link to="/product" className={styles.ctaBtn}>Shop Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Sustainability;

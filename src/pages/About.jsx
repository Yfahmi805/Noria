import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './About.css';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-container section container">
                <div className="about-hero">
                    
                    <h1 className="about-title">About Noria</h1>
                </div>
                <div className="about-content">
                    <p>
                        <strong>Noria</strong> is your gateway to authentic Moroccan natural products, sourced directly from local cooperatives and artisans. Our mission is to empower small producers, promote sustainable practices, and bring you the finest organic goods Morocco has to offer.
                    </p>
                    <p>
                        We believe in fair trade, transparency, and the power of community. Every purchase supports rural families, preserves traditional craftsmanship, and helps protect Morocco's unique biodiversity.
                    </p>
                    <div className="about-values">
                        <h2>Our Values</h2>
                        <ul>
                            <li>🌱 Sustainability & Eco-friendliness</li>
                            <li>🤝 Fair Trade & Community Empowerment</li>
                            <li>✨ Authenticity & Quality</li>
                            <li>🌍 Cultural Heritage</li>
                        </ul>
                    </div>
                    <div className="about-team">
                        <h2>Meet the Team</h2>
                        <p>
                            We are a passionate group of locals, artisans, and tech enthusiasts dedicated to sharing Morocco's natural treasures with the world.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;

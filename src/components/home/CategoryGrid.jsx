import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css'
import categories from '../../assets/data/categories'; // Adjust the path as necessary


const CategoryGrid = () => {
  return (
    <section className="category-section section">
      <div className="container">
        <h2 className="section-title">Shop By Category</h2>

        <div className="category-grid">
          {categories.map(category => (
            <Link
              to={`/categories/${category.slug}`}
              className="category-card"
              key={category.id}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} className="category-img" />
              </div>
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css'
import { supabase } from '../../supabaseClient';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('categories').select('*');
      if (!error) setCategories(data || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) return (
    <div className="loading-spinner">
      <span className="spinner"></span>
      <span className="loading-text">Loading categories...</span>
    </div>
  );

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
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import './styles/global.css';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form validation and submission logic here
  };

  return (
    <Router>
      <div className="container">
        <nav
          style={{
            padding: '1rem 0',
            marginBottom: '2rem',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              to="/"
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#2563eb',
                textDecoration: 'none',
              }}
            >
              Beyond The Book
            </Link>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="outline" size="small">
                Login
              </Button>
              <Button variant="primary" size="small">
                Register
              </Button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="fade-in">
                <h1
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}
                >
                  Welcome to Beyond The Book
                </h1>
                <p
                  style={{
                    fontSize: '1.25rem',
                    color: '#64748b',
                    textAlign: 'center',
                    marginBottom: '2rem',
                  }}
                >
                  Your gateway to a world of knowledge and discovery
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem',
                  }}
                >
                  <Card
                    title="Explore Books"
                    subtitle="Discover new worlds through our vast collection of books"
                    image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  >
                    <Button variant="primary" fullWidth>
                      Browse Collection
                    </Button>
                  </Card>

                  <Card
                    title="Join Community"
                    subtitle="Connect with fellow book lovers and share your thoughts"
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  >
                    <Button variant="secondary" fullWidth>
                      Join Now
                    </Button>
                  </Card>

                  <Card
                    title="Start Reading"
                    subtitle="Begin your reading journey with our curated recommendations"
                    image="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  >
                    <Button variant="outline" fullWidth>
                      Get Started
                    </Button>
                  </Card>
                </div>
              </div>
            }
          />

          <Route
            path="/login"
            element={
              <div
                style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                  padding: '2rem',
                }}
                className="fade-in"
              >
                <Card title="Login to Your Account">
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      error={errors.email}
                    />
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                      error={errors.password}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      style={{ marginTop: '1rem' }}
                    >
                      Login
                    </Button>
                  </form>
                </Card>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 
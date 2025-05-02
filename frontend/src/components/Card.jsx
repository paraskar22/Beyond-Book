import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../styles/theme';
import bookClubService from '../services/bookClub.service';
import { useNavigate } from 'react-router-dom';

const Card = ({
  children,
  title,
  subtitle,
  image,
  footer,
  hoverable = true,
  className = '',
  bookClubId,
  isMember = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleJoinClub = async () => {
    if (!bookClubId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await bookClubService.joinBookClub(bookClubId);
      // Show success message or redirect
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join the club');
    } finally {
      setLoading(false);
    }
  };

  const cardStyles = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    overflow: 'hidden',
    transition: theme.transitions.default,
    ...(hoverable && {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows.lg,
      },
    }),
  };

  return (
    <div
      style={cardStyles}
      className={`card ${className}`}
      {...props}
    >
      {image && (
        <div
          style={{
            width: '100%',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      
      <div
        style={{
          padding: theme.spacing.lg,
        }}
      >
        {title && (
          <h3
            style={{
              ...theme.typography.h3,
              marginBottom: theme.spacing.sm,
              color: theme.colors.text.primary,
            }}
          >
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p
            style={{
              ...theme.typography.body2,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.md,
            }}
          >
            {subtitle}
          </p>
        )}
        
        <div>
          {children}
          {bookClubId && !isMember && (
            <button
              onClick={handleJoinClub}
              disabled={loading}
              style={{
                ...theme.typography.body1,
                backgroundColor: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.md,
                padding: '0.75rem 1.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: theme.spacing.md,
                opacity: loading ? 0.7 : 1,
                transition: theme.transitions.default,
              }}
            >
              {loading ? 'Joining...' : 'Join Club'}
            </button>
          )}
          {error && (
            <p
              style={{
                color: theme.colors.error,
                fontSize: theme.typography.body2.fontSize,
                marginTop: theme.spacing.sm,
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
      
      {footer && (
        <div
          style={{
            padding: theme.spacing.md,
            borderTop: `1px solid ${theme.colors.text.disabled}`,
            backgroundColor: theme.colors.background,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  footer: PropTypes.node,
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  bookClubId: PropTypes.number,
  isMember: PropTypes.bool,
};

export default Card; 
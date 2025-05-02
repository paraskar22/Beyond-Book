import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../styles/theme';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: `1px solid ${
      error
        ? theme.colors.error
        : success
        ? theme.colors.success
        : isFocused
        ? theme.colors.primary
        : theme.colors.text.disabled
    }`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: disabled ? theme.colors.background : theme.colors.surface,
    color: theme.colors.text.primary,
    fontSize: theme.typography.body1.fontSize,
    transition: theme.transitions.default,
    outline: 'none',
    '&:focus': {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px rgba(37, 99, 235, 0.1)`,
    },
  };

  return (
    <div
      style={{
        marginBottom: theme.spacing.md,
        position: 'relative',
      }}
      className={className}
    >
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            color: theme.colors.text.primary,
            fontWeight: 500,
          }}
        >
          {label}
          {required && (
            <span
              style={{
                color: theme.colors.error,
                marginLeft: theme.spacing.xs,
              }}
            >
              *
            </span>
          )}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(error || success) && (
          <div
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {error && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 6C10.4142 6 10.75 6.33579 10.75 6.75V10.25C10.75 10.6642 10.4142 11 10 11C9.58579 11 9.25 10.6642 9.25 10.25V6.75C9.25 6.33579 9.58579 6 10 6ZM10 13C10.5523 13 11 13.4477 11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13Z"
                  fill={theme.colors.error}
                />
              </svg>
            )}
            {success && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.53033 13.5303L5.53033 10.5303C5.23744 10.2374 5.23744 9.76256 5.53033 9.46967C5.82322 9.17678 6.2981 9.17678 6.59099 9.46967L9 11.8787L13.409 7.46967C13.7019 7.17678 14.1768 7.17678 14.4697 7.46967C14.7626 7.76256 14.7626 8.23744 14.4697 8.53033L9.46967 13.5303C9.17678 13.8232 8.7019 13.8232 8.40899 13.5303L8.53033 13.5303Z"
                  fill={theme.colors.success}
                />
              </svg>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p
          style={{
            color: theme.colors.error,
            fontSize: theme.typography.body2.fontSize,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input; 
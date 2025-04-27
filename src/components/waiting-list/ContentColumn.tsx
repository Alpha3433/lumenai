
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentColumn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new waiting list page
    navigate('/');
  }, [navigate]);

  return null; // This component will not render as it redirects
};

export default ContentColumn;

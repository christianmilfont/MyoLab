import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as gtag from '../lib/gtag';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    gtag.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default Analytics;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  isMobile?: boolean;
  onMobileClick?: () => void;
}

const NavLinks: React.FC<NavLinkProps> = ({ isMobile = false, onMobileClick }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Classes for desktop and mobile views
  const desktopLinkClasses = "text-sm font-medium hover:text-blue-600 transition-colors relative";
  const desktopActiveLinkClasses = "text-blue-600";
  
  const mobileLinkClasses = "text-sm font-medium p-2 rounded-md transition-colors";
  const mobileActiveLinkClasses = "bg-blue-50 dark:bg-blue-900/30 text-blue-600";
  const mobileInactiveLinkClasses = "hover:bg-gray-50 dark:hover:bg-gray-800/50";

  const getLinkClasses = (path: string) => {
    if (isMobile) {
      return `${mobileLinkClasses} ${isActive(path) ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`;
    } else {
      return `${desktopLinkClasses} ${isActive(path) ? desktopActiveLinkClasses : ''}`;
    }
  };

  const handleClick = () => {
    if (isMobile && onMobileClick) {
      onMobileClick();
    }
  };

  return (
    <>
      <Link 
        to="/home" 
        className={getLinkClasses('/home')}
        onClick={handleClick}
      >
        Home
        {!isMobile && isActive('/home') && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded" />
        )}
      </Link>
      
      <a 
        href="#features" 
        className={isMobile ? 
          "text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" : 
          "text-sm font-medium hover:text-blue-600 transition-colors"
        }
        onClick={handleClick}
      >
        Features
      </a>
      
      <Link 
        to="/examples" 
        className={getLinkClasses('/examples')}
        onClick={handleClick}
      >
        Examples
        {!isMobile && isActive('/examples') && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded" />
        )}
      </Link>
      
      <a 
        href="#pricing" 
        className={isMobile ? 
          "text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" : 
          "text-sm font-medium hover:text-blue-600 transition-colors"
        }
        onClick={handleClick}
      >
        Pricing
      </a>
      
      <a 
        href="#faq" 
        className={isMobile ? 
          "text-sm font-medium p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" : 
          "text-sm font-medium hover:text-blue-600 transition-colors"
        }
        onClick={handleClick}
      >
        FAQ
      </a>
    </>
  );
};

export default NavLinks;

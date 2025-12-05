import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartIcon, LikeIcon, MatchesIcon, ChatIcon, ProfileIcon } from './Icons';
import './BottomNav.css';

const items = [
  { to: '/discover', label: 'Discover', icon: <HeartIcon />, activeIcon: <HeartIcon active /> },
  { to: '/likes', label: 'Likes', icon: <LikeIcon />, activeIcon: <LikeIcon active /> },
  { to: '/matches', label: 'Matches', icon: <MatchesIcon />, activeIcon: <MatchesIcon active /> },
  { to: '/chats', label: 'Chats', icon: <ChatIcon />, activeIcon: <ChatIcon active /> },
  { to: '/profile', label: 'Profile', icon: <ProfileIcon />, activeIcon: <ProfileIcon active /> },
];

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveTooltip(index);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const handleClick = (to) => {
    nav(to);
    setActiveTooltip(null);
  };

  return (
    <div className="bottom-nav">
      <div className="bar">
        {items.map((item, index) => {
          const isActive = loc.pathname === item.to;
          return (
            <div
              key={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(item.to)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="icon-container">
                {isActive ? item.activeIcon : item.icon}
              </div>
              {activeTooltip === index && (
                <div className="tooltip">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

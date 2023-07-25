import React from 'react';

export default function TabMenu({ activeTab, onTabChange }) {
  return (
    <div>
      <div className="page_menu">
        <div
          onClick={() => onTabChange('all')}
          className={`page_menuOption__y4n_M ${activeTab === 'all' ? 'active' : ''}`}
        >
          <span>All</span>
          <div className={`page_underline${activeTab === 'all' ? 'Active' : ''}__VrwOT`}></div>
        </div>
        <div
          onClick={() => onTabChange('active')}
          className={`page_menuOption__y4n_M ${activeTab === 'active' ? 'active' : ''}`}
        >
          <span>Active</span>
          <div className={`page_underline${activeTab === 'active' ? 'Active' : ''}__VrwOT`}></div>
        </div>
        <div
          onClick={() => onTabChange('completed')}
          className={`page_menuOption__y4n_M ${activeTab === 'completed' ? 'active' : ''}`}
        >
          <span>Completed</span>
          <div className={`page_underline${activeTab === 'completed' ? 'Active' : ''}__VrwOT`}></div>
        </div>
      </div>
      <hr/>
    </div>
  );
}

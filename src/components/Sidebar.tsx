import { CheckSquare, Share2 } from 'lucide-react';
import Profile from './profile';
import { useState } from 'react';

const Sidebar: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const sidebarTabs = [
    {
      id: 'tasklist',
      icon: <CheckSquare className="w-5 h-5" />,
      label: 'Task Lists',
    },
    {
      id: 'tasksharing',
      icon: <Share2 className="w-5 h-5" />,
      label: 'Sharing',
    },
  ];

  return (
    <div className="md:w-40 lg:w-72 bg-white border-r border-gray-200 shadow-lg flex flex-col h-full">
      {/* Logo and Branding */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">TaskMaster</h1>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-grow p-4 space-y-2">
        {sidebarTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              w-full flex items-center p-3 rounded-lg transition-all duration-200
              ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <span className="mr-3">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div>
        <Profile
          onProfileToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          isProfileMenuOpen={isProfileMenuOpen}
        />
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TasksList from './components/TasksList';
import TaskSharing from './components/TaskSharing';
import Sidebar from './components/Sidebar';
import CreateTaskListButton from './components/CreateTaskListButton';

interface AppProps {
  user: any;
}

const App: React.FC<AppProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('tasklist');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'tasklist':
        return <TasksList />;
      case 'tasksharing':
        return <TaskSharing />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Toggle - Visible only on small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar - Becomes slide-out menu on small screens */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 bg-white h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Sidebar for Tablet and Desktop */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-2 lg:p-8 mt-16 md:mt-0 overflow-auto">
        <header className="flex justify-between gap-4 flex-wrap lg:flex-nowrap items-center mb-8 p-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
            {activeTab} View
          </h2>
          <div>
            <CreateTaskListButton />
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;

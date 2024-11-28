import React, { useState, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';
import useLogout from '../api/logoutRequest';

interface ProfileProps {
  onProfileToggle: () => void;
  isProfileMenuOpen: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  onProfileToggle,
  isProfileMenuOpen,
}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const logout = useLogout();

  useEffect(() => {
    // Fetch user details from localStorage on component mount
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    logout();
    onProfileToggle();
  };

  return (
    <div>
      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={onProfileToggle}
            className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                {user ? (
                  <>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </>
                ) : (
                  <p className="font-semibold text-gray-800">Loading...</p>
                )}
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isProfileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mb-2">
              <div className="p-2">
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-gray-700">
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout} // Call handleLogout when logout is clicked
                  className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

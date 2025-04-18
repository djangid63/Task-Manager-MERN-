import { useState } from 'react';

const Dashboard = () => {
  // Dummy static data
  const stats = {
    admins: {
      total: 5,
      details: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "System Admin" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "IT Admin" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Content Admin" },
        { id: 5, name: "Alex Brown", email: "alex@example.com", role: "User Admin" }
      ]
    },
    users: {
      total: 28,
      details: [
        { id: 1, name: "Robert Wilson", email: "robert@example.com", department: "Marketing" },
        { id: 2, name: "Emily Davis", email: "emily@example.com", department: "Sales" },
        { id: 3, name: "David Thompson", email: "david@example.com", department: "Engineering" },
        { id: 4, name: "Lisa Anderson", email: "lisa@example.com", department: "HR" },
        { id: 5, name: "Michael Lee", email: "michael@example.com", department: "Finance" },
        { id: 6, name: "Sophia Chen", email: "sophia@example.com", department: "Support" }
      ]
    },
    tasks: {
      total: 47,
      details: [
        { id: 1, title: "Update website content", status: "In Progress", assignee: "Emily Davis", dueDate: "2025-04-25" },
        { id: 2, title: "Fix login page bug", status: "Completed", assignee: "David Thompson", dueDate: "2025-04-15" },
        { id: 3, title: "Create monthly report", status: "Pending", assignee: "Michael Lee", dueDate: "2025-04-30" },
        { id: 4, title: "Design new logo", status: "In Progress", assignee: "Robert Wilson", dueDate: "2025-05-05" },
        { id: 5, title: "Setup user accounts", status: "Pending", assignee: "Alex Brown", dueDate: "2025-04-22" },
        { id: 6, title: "Optimize database queries", status: "Pending", assignee: "David Thompson", dueDate: "2025-05-10" }
      ]
    }
  };

  // State to track which card is selected
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card click
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType === selectedCard ? null : cardType);
  };

  // Card colors
  const cardColors = {
    admins: { bg: "bg-blue-100", hover: "hover:bg-blue-200", border: "border-blue-300", text: "text-blue-800", icon: "text-blue-500" },
    users: { bg: "bg-green-100", hover: "hover:bg-green-200", border: "border-green-300", text: "text-green-800", icon: "text-green-500" },
    tasks: { bg: "bg-purple-100", hover: "hover:bg-purple-200", border: "border-purple-300", text: "text-purple-800", icon: "text-purple-500" }
  };

  // Icons for each card
  const renderIcon = (type) => {
    switch (type) {
      case 'admins':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${cardColors[type].icon}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 10-2 0c0 .535.087 1.061.25 1.566C4.523 13.327 6.614 15 10 15s5.477-1.673 6.75-3.434A6.01 6.01 0 0017 10a1 1 0 10-2 0 4 4 0 01-.783 2.392A5.002 5.002 0 0010 11z" clipRule="evenodd" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${cardColors[type].icon}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'tasks':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${cardColors[type].icon}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Render detail tables based on selected card
  const renderDetails = () => {
    if (!selectedCard) return null;

    const detailsData = stats[selectedCard].details;

    // Different table structures based on selected card type
    if (selectedCard === 'admins') {
      return (
        <div className="mt-8 animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Admin Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detailsData.map(admin => (
                  <tr key={admin.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 text-gray-800">{admin.name}</td>
                    <td className="py-3 px-4 text-gray-600">{admin.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {admin.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (selectedCard === 'users') {
      return (
        <div className="mt-8 animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">User Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detailsData.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {user.department}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (selectedCard === 'tasks') {
      return (
        <div className="mt-8 animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Task Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Assignee</th>
                  <th className="py-3 px-4 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detailsData.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 text-gray-800">{task.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{task.assignee}</td>
                    <td className="py-3 px-4 text-gray-600">{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slideFromTop">Dashboard</h1>
          <p className="text-gray-600 animate-slideFromBottom">Welcome to your task management dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Admin Card */}
          <div 
            className={`${cardColors.admins.bg} ${cardColors.admins.hover} ${cardColors.admins.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'admins' ? 'ring-4 ring-blue-300 scale-105' : ''}`}
            onClick={() => handleCardClick('admins')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${cardColors.admins.text}`}>Total Admins</h2>
                <p className="text-4xl font-bold mt-2 text-gray-800">{stats.admins.total}</p>
              </div>
              {renderIcon('admins')}
            </div>
          </div>

          {/* Users Card */}
          <div 
            className={`${cardColors.users.bg} ${cardColors.users.hover} ${cardColors.users.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'users' ? 'ring-4 ring-green-300 scale-105' : ''}`}
            onClick={() => handleCardClick('users')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${cardColors.users.text}`}>Total Users</h2>
                <p className="text-4xl font-bold mt-2 text-gray-800">{stats.users.total}</p>
              </div>
              {renderIcon('users')}
            </div>
          </div>

          {/* Tasks Card */}
          <div 
            className={`${cardColors.tasks.bg} ${cardColors.tasks.hover} ${cardColors.tasks.border} border rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${selectedCard === 'tasks' ? 'ring-4 ring-purple-300 scale-105' : ''}`}
            onClick={() => handleCardClick('tasks')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${cardColors.tasks.text}`}>Total Tasks</h2>
                <p className="text-4xl font-bold mt-2 text-gray-800">{stats.tasks.total}</p>
              </div>
              {renderIcon('tasks')}
            </div>
          </div>
        </div>
        
        {/* Render details based on selected card */}
        {renderDetails()}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes slideFromTop {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideFromTop {
          animation: slideFromTop 0.5s ease-out;
        }
        @keyframes slideFromBottom {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideFromBottom {
          animation: slideFromBottom 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
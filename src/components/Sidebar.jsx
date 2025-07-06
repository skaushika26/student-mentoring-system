import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-1/4 bg-gradient-to-b from-blue-900 to-blue-500 p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Menus</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/mentees" className="hover:underline">Mentee List</Link>
        </li>
        <li>
          <Link to="/scheduling" className="hover:underline">New Scheduling</Link>
        </li>
        <li>
          <Link to="/counselling" className="hover:underline">New Counselling</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

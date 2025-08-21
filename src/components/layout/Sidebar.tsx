import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Users,
  FileText,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    to: '/dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
    label: 'Дашборд',
    roles: ['client', 'manager', 'admin'],
  },
  {
    to: '/products',
    icon: <Package className="h-5 w-5" />,
    label: 'Товары',
    roles: ['client', 'manager'],
  },
  {
    to: '/purchases',
    icon: <ShoppingCart className="h-5 w-5" />,
    label: 'Закупки',
    roles: ['client', 'manager'],
  },
  {
    to: '/orders',
    icon: <FileText className="h-5 w-5" />,
    label: 'Заказы',
    roles: ['client', 'manager'],
  },
  {
    to: '/chat',
    icon: <MessageSquare className="h-5 w-5" />,
    label: 'Чат',
    roles: ['client', 'manager'],
  },
  {
    to: '/payments',
    icon: <CreditCard className="h-5 w-5" />,
    label: 'Платежи',
    roles: ['client', 'manager'],
  },
  {
    to: '/clients',
    icon: <Users className="h-5 w-5" />,
    label: 'Клиенты',
    roles: ['manager', 'admin'],
  },
  {
    to: '/admin',
    icon: <Shield className="h-5 w-5" />,
    label: 'Админка',
    roles: ['admin'],
  },
  {
    to: '/settings',
    icon: <Settings className="h-5 w-5" />,
    label: 'Настройки',
    roles: ['client', 'manager', 'admin'],
  },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
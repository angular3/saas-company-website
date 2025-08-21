import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const clientStats = [
    {
      title: 'Активные закупки',
      value: '3',
      icon: <ShoppingCart className="h-4 w-4" />,
      change: '+2 за неделю',
    },
    {
      title: 'Завершенные заказы',
      value: '12',
      icon: <CheckCircle className="h-4 w-4" />,
      change: '+3 за месяц',
    },
    {
      title: 'Общая экономия',
      value: '₽45,230',
      icon: <TrendingUp className="h-4 w-4" />,
      change: '+15% к розничным ценам',
    },
    {
      title: 'Ожидают оплаты',
      value: '1',
      icon: <AlertCircle className="h-4 w-4" />,
      change: 'Требует внимания',
    },
  ];

  const managerStats = [
    {
      title: 'Активные группы',
      value: '8',
      icon: <Users className="h-4 w-4" />,
      change: '+2 за неделю',
    },
    {
      title: 'Общий объем',
      value: '₽2,340,000',
      icon: <Package className="h-4 w-4" />,
      change: '+12% за месяц',
    },
    {
      title: 'Клиентов в работе',
      value: '47',
      icon: <Users className="h-4 w-4" />,
      change: '+8 за неделю',
    },
    {
      title: 'Заказы в производстве',
      value: '5',
      icon: <Clock className="h-4 w-4" />,
      change: 'В срок',
    },
  ];

  const stats = user?.role === 'manager' ? managerStats : clientStats;

  const activePurchases = [
    {
      id: '1',
      product: 'Беспроводные наушники TWS',
      progress: 75,
      participants: 12,
      target: 16,
      deadline: '2024-02-15',
      status: 'collecting',
    },
    {
      id: '2',
      product: 'Смарт-часы с GPS',
      progress: 90,
      participants: 18,
      target: 20,
      deadline: '2024-02-10',
      status: 'processing',
    },
    {
      id: '3',
      product: 'Портативная колонка',
      progress: 45,
      participants: 9,
      target: 20,
      deadline: '2024-02-20',
      status: 'collecting',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collecting': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-purple-100 text-purple-800';
      case 'shipping': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'collecting': return 'Сбор участников';
      case 'processing': return 'Обработка';
      case 'production': return 'Производство';
      case 'shipping': return 'Доставка';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Добро пожаловать, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Обзор ваших активных закупок и заказов
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Активные закупки */}
      <Card>
        <CardHeader>
          <CardTitle>Активные закупки</CardTitle>
          <CardDescription>
            Текущие групповые закупки и их статус
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePurchases.map((purchase) => (
              <div key={purchase.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{purchase.product}</h3>
                  <Badge className={getStatusColor(purchase.status)}>
                    {getStatusLabel(purchase.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Участники: {purchase.participants}/{purchase.target}</span>
                    <span>До: {new Date(purchase.deadline).toLocaleDateString('ru-RU')}</span>
                  </div>
                  
                  <Progress value={purchase.progress} className="h-2" />
                  
                  <div className="text-sm text-gray-500">
                    Прогресс: {purchase.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Последние уведомления */}
      <Card>
        <CardHeader>
          <CardTitle>Последние уведомления</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Заказ готов к отправке</p>
                <p className="text-xs text-gray-600">Смарт-часы с GPS - документы загружены</p>
                <p className="text-xs text-gray-500">2 часа назад</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Требуется оплата</p>
                <p className="text-xs text-gray-600">Беспроводные наушники TWS - ₽15,400</p>
                <p className="text-xs text-gray-500">1 день назад</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Users className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Новый участник</p>
                <p className="text-xs text-gray-600">Портативная колонка - присоединился Алексей М.</p>
                <p className="text-xs text-gray-500">3 дня назад</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  Clock,
  Package,
  TrendingUp,
  Plus,
  Calendar,
  DollarSign,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { GroupPurchase } from '@/types';

const Purchases: React.FC = () => {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockPurchases: GroupPurchase[] = [
    {
      id: '1',
      productId: '1',
      product: {
        id: '1',
        name: 'Беспроводные наушники TWS Pro',
        description: 'Премиальные беспроводные наушники',
        images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
        price: 1250,
        minQuantity: 10,
        category: 'Электроника',
        specifications: {},
        factoryInfo: {
          name: 'Shenzhen Audio Tech',
          location: 'Шэньчжэнь, Китай',
          rating: 4.8
        },
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z'
      },
      managerId: 'manager1',
      manager: {
        id: 'manager1',
        email: 'manager@company.com',
        name: 'Анна Менеджерова',
        role: 'manager',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      title: 'Групповая закупка наушников TWS Pro',
      description: 'Закупка премиальных беспроводных наушников с активным шумоподавлением',
      targetQuantity: 20,
      currentQuantity: 15,
      pricePerUnit: 1250,
      deadline: '2024-02-15T23:59:59Z',
      status: 'collecting',
      participants: [],
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-25T10:00:00Z'
    },
    {
      id: '2',
      productId: '2',
      product: {
        id: '2',
        name: 'Смарт-часы с GPS и NFC',
        description: 'Многофункциональные смарт-часы',
        images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'],
        price: 2800,
        minQuantity: 15,
        category: 'Электроника',
        specifications: {},
        factoryInfo: {
          name: 'Guangzhou Smart Devices',
          location: 'Гуанчжоу, Китай',
          rating: 4.6
        },
        isActive: true,
        createdAt: '2024-01-10T10:00:00Z'
      },
      managerId: 'manager1',
      manager: {
        id: 'manager1',
        email: 'manager@company.com',
        name: 'Анна Менеджерова',
        role: 'manager',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      title: 'Смарт-часы для активного образа жизни',
      description: 'Закупка многофункциональных смарт-часов с GPS и NFC',
      targetQuantity: 15,
      currentQuantity: 14,
      pricePerUnit: 2800,
      deadline: '2024-02-10T23:59:59Z',
      status: 'processing',
      participants: [],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-28T10:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'collecting': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-purple-100 text-purple-800';
      case 'shipping': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'collecting': return 'Сбор участников';
      case 'processing': return 'Обработка';
      case 'production': return 'Производство';
      case 'shipping': return 'Доставка';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return status;
    }
  };

  const activePurchases = mockPurchases.filter(p => 
    ['collecting', 'processing', 'production', 'shipping'].includes(p.status)
  );
  
  const completedPurchases = mockPurchases.filter(p => 
    ['completed', 'cancelled'].includes(p.status)
  );

  const handleCreatePurchase = () => {
    // Логика создания закупки
    setIsCreateDialogOpen(false);
  };

  const handleJoinPurchase = (purchaseId: string) => {
    // Логика присоединения к закупке
    console.log('Joining purchase:', purchaseId);
  };

  const PurchaseCard: React.FC<{ purchase: GroupPurchase }> = ({ purchase }) => {
    const progress = (purchase.currentQuantity / purchase.targetQuantity) * 100;
    const daysLeft = Math.ceil((new Date(purchase.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <img
            src={purchase.product.images[0]}
            alt={purchase.product.name}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${getStatusColor(purchase.status)}`}>
            {getStatusLabel(purchase.status)}
          </Badge>
        </div>
        
        <CardHeader>
          <CardTitle className="text-lg">{purchase.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {purchase.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-green-600">
                ₽{purchase.pricePerUnit.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-1">за шт.</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Участники</div>
              <div className="font-semibold">
                {purchase.currentQuantity}/{purchase.targetQuantity}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс сбора</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {daysLeft > 0 ? `${daysLeft} дн.` : 'Завершено'}
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              ₽{(purchase.pricePerUnit * purchase.currentQuantity).toLocaleString()}
            </div>
          </div>

          <div className="flex space-x-2">
            {user?.role === 'client' && purchase.status === 'collecting' && (
              <Button 
                className="flex-1"
                onClick={() => handleJoinPurchase(purchase.id)}
              >
                <Users className="h-4 w-4 mr-2" />
                Присоединиться
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Чат
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Групповые закупки</h1>
          <p className="text-gray-600 mt-2">
            Участвуйте в совместных закупках и экономьте на оптовых ценах
          </p>
        </div>
        
        {user?.role === 'manager' && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать закупку
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создать групповую закупку</DialogTitle>
                <DialogDescription>
                  Настройте параметры новой групповой закупки
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="title">Название закупки</Label>
                  <Input id="title" placeholder="Введите название" />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" placeholder="Подробное описание закупки" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="targetQuantity">Целевое количество</Label>
                    <Input id="targetQuantity" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="pricePerUnit">Цена за единицу (₽)</Label>
                    <Input id="pricePerUnit" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Дедлайн</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreatePurchase}>
                    Создать закупку
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные закупки
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePurchases.length}</div>
            <p className="text-xs text-muted-foreground">
              В процессе сбора
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Участников всего
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPurchases.reduce((sum, p) => sum + p.currentQuantity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Активных участников
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Общий объем
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₽{mockPurchases.reduce((sum, p) => sum + (p.pricePerUnit * p.currentQuantity), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Текущий оборот
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средний срок
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Дней до дедлайна
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Вкладки с закупками */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Активные ({activePurchases.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Завершенные ({completedPurchases.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePurchases.map((purchase) => (
              <PurchaseCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
          
          {activePurchases.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет активных закупок
              </h3>
              <p className="text-gray-600">
                Создайте новую закупку или дождитесь появления новых предложений
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPurchases.map((purchase) => (
              <PurchaseCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
          
          {completedPurchases.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Нет завершенных закупок
              </h3>
              <p className="text-gray-600">
                Завершенные закупки будут отображаться здесь
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Purchases;
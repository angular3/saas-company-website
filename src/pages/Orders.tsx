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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Upload,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  Package,
  CreditCard,
  Eye,
  Plus,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Order, OrderStage, OrderDocument } from '@/types';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);

  const mockOrders: Order[] = [
    {
      id: '1',
      groupPurchaseId: '1',
      groupPurchase: {
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
        description: 'Закупка премиальных беспроводных наушников',
        targetQuantity: 20,
        currentQuantity: 20,
        pricePerUnit: 1250,
        deadline: '2024-02-15T23:59:59Z',
        status: 'processing',
        participants: [],
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-25T10:00:00Z'
      },
      orderNumber: 'ORD-2024-001',
      status: 'production',
      totalAmount: 25000,
      paidAmount: 20000,
      stages: [
        {
          id: '1',
          orderId: '1',
          stage: 'Подтверждение заказа',
          status: 'completed',
          startDate: '2024-01-25T10:00:00Z',
          completedDate: '2024-01-26T10:00:00Z',
          description: 'Заказ подтвержден фабрикой',
          notes: 'Все параметры согласованы'
        },
        {
          id: '2',
          orderId: '1',
          stage: 'Производство',
          status: 'in_progress',
          startDate: '2024-01-26T10:00:00Z',
          description: 'Товар находится в производстве',
          notes: 'Ожидаемое время: 10-14 дней'
        },
        {
          id: '3',
          orderId: '1',
          stage: 'Контроль качества',
          status: 'pending',
          description: 'Проверка качества продукции'
        },
        {
          id: '4',
          orderId: '1',
          stage: 'Отправка',
          status: 'pending',
          description: 'Отправка товара'
        }
      ],
      documents: [
        {
          id: '1',
          orderId: '1',
          name: 'Договор поставки',
          type: 'contract',
          url: '#',
          uploadedBy: 'manager1',
          uploadedAt: '2024-01-25T10:00:00Z'
        },
        {
          id: '2',
          orderId: '1',
          name: 'Счет на оплату',
          type: 'invoice',
          url: '#',
          uploadedBy: 'manager1',
          uploadedAt: '2024-01-25T12:00:00Z'
        }
      ],
      createdAt: '2024-01-25T10:00:00Z',
      updatedAt: '2024-01-28T10:00:00Z',
      estimatedDelivery: '2024-02-20T00:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'production': return 'bg-yellow-100 text-yellow-800';
      case 'quality_check': return 'bg-purple-100 text-purple-800';
      case 'shipping': return 'bg-green-100 text-green-800';
      case 'customs': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'created': return 'Создан';
      case 'confirmed': return 'Подтвержден';
      case 'production': return 'Производство';
      case 'quality_check': return 'Контроль качества';
      case 'shipping': return 'Доставка';
      case 'customs': return 'Таможня';
      case 'delivered': return 'Доставлен';
      default: return status;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'delayed': return 'text-red-600';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5" />;
      case 'in_progress': return <Clock className="h-5 w-5" />;
      case 'delayed': return <AlertCircle className="h-5 w-5" />;
      case 'pending': return <Clock className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'contract': return 'Договор';
      case 'invoice': return 'Счет';
      case 'payment_receipt': return 'Чек об оплате';
      case 'shipping_doc': return 'Транспортный документ';
      case 'quality_cert': return 'Сертификат качества';
      case 'other': return 'Другое';
      default: return type;
    }
  };

  const handleUploadDocument = () => {
    // Логика загрузки документа
    setIsDocumentDialogOpen(false);
  };

  const handleUpdateStage = () => {
    // Логика обновления этапа
    setIsStageDialogOpen(false);
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const completedStages = order.stages.filter(s => s.status === 'completed').length;
    const progress = (completedStages / order.stages.length) * 100;
    const paymentProgress = (order.paidAmount / order.totalAmount) * 100;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
              <CardDescription>
                {order.groupPurchase.product.name}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Общая сумма</div>
              <div className="text-xl font-bold">
                ₽{order.totalAmount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Оплачено</div>
              <div className="text-xl font-bold text-green-600">
                ₽{order.paidAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс выполнения</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Оплата</span>
              <span>{Math.round(paymentProgress)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-2" />
          </div>

          {order.estimatedDelivery && (
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="h-4 w-4 mr-2" />
              Ожидаемая доставка: {new Date(order.estimatedDelivery).toLocaleDateString('ru-RU')}
            </div>
          )}

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSelectedOrder(order)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Подробнее
            </Button>
            {user?.role === 'manager' && (
              <Button variant="outline" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Заказы</h1>
          <p className="text-gray-600 mt-2">
            Отслеживайте статус и прогресс выполнения заказов
          </p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего заказов
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Активных заказов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              В производстве
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOrders.filter(o => o.status === 'production').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Заказов в работе
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Общая сумма
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₽{mockOrders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Всех заказов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средний срок
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Дней до доставки
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Список заказов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Детальный просмотр заказа */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Заказ {selectedOrder.orderNumber}
              </DialogTitle>
              <DialogDescription>
                {selectedOrder.groupPurchase.product.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Основная информация */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Информация о заказе</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Статус:</span>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusLabel(selectedOrder.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Общая сумма:</span>
                      <span className="font-semibold">₽{selectedOrder.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Оплачено:</span>
                      <span className="font-semibold text-green-600">₽{selectedOrder.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">К доплате:</span>
                      <span className="font-semibold text-red-600">
                        ₽{(selectedOrder.totalAmount - selectedOrder.paidAmount).toLocaleString()}
                      </span>
                    </div>
                    {selectedOrder.estimatedDelivery && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ожидаемая доставка:</span>
                        <span className="font-semibold">
                          {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Товар</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <img
                        src={selectedOrder.groupPurchase.product.images[0]}
                        alt={selectedOrder.groupPurchase.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{selectedOrder.groupPurchase.product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedOrder.groupPurchase.product.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Количество: {selectedOrder.groupPurchase.currentQuantity} шт.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Этапы выполнения */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Этапы выполнения</CardTitle>
                  {user?.role === 'manager' && (
                    <Dialog open={isStageDialogOpen} onOpenChange={setIsStageDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Обновить этап
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Обновить этап заказа</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="stage">Этап</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите этап" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="confirmed">Подтверждение заказа</SelectItem>
                                <SelectItem value="production">Производство</SelectItem>
                                <SelectItem value="quality_check">Контроль качества</SelectItem>
                                <SelectItem value="shipping">Отправка</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="status">Статус</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите статус" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Ожидание</SelectItem>
                                <SelectItem value="in_progress">В процессе</SelectItem>
                                <SelectItem value="completed">Завершено</SelectItem>
                                <SelectItem value="delayed">Задержка</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="notes">Примечания</Label>
                            <Textarea id="notes" placeholder="Дополнительная информация" />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsStageDialogOpen(false)}>
                              Отмена
                            </Button>
                            <Button onClick={handleUpdateStage}>
                              Обновить
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.stages.map((stage, index) => (
                      <div key={stage.id} className="flex items-start space-x-4">
                        <div className={`mt-1 ${getStageStatusColor(stage.status)}`}>
                          {getStageIcon(stage.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{stage.stage}</h4>
                            <Badge variant="outline" className={getStageStatusColor(stage.status)}>
                              {stage.status === 'completed' && 'Завершено'}
                              {stage.status === 'in_progress' && 'В процессе'}
                              {stage.status === 'delayed' && 'Задержка'}
                              {stage.status === 'pending' && 'Ожидание'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                          {stage.notes && (
                            <p className="text-sm text-gray-500 mt-1">{stage.notes}</p>
                          )}
                          <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                            {stage.startDate && (
                              <span>Начато: {new Date(stage.startDate).toLocaleDateString('ru-RU')}</span>
                            )}
                            {stage.completedDate && (
                              <span>Завершено: {new Date(stage.completedDate).toLocaleDateString('ru-RU')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Документы */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Документы</CardTitle>
                  {user?.role === 'manager' && (
                    <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Загрузить документ
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Загрузить документ</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="docName">Название документа</Label>
                            <Input id="docName" placeholder="Введите название" />
                          </div>
                          <div>
                            <Label htmlFor="docType">Тип документа</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите тип" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="contract">Договор</SelectItem>
                                <SelectItem value="invoice">Счет</SelectItem>
                                <SelectItem value="payment_receipt">Чек об оплате</SelectItem>
                                <SelectItem value="shipping_doc">Транспортный документ</SelectItem>
                                <SelectItem value="quality_cert">Сертификат качества</SelectItem>
                                <SelectItem value="other">Другое</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="file">Файл</Label>
                            <Input id="file" type="file" />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                              Отмена
                            </Button>
                            <Button onClick={handleUploadDocument}>
                              Загрузить
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-600">
                              {getDocumentTypeLabel(doc.type)} • {new Date(doc.uploadedAt).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Скачать
                        </Button>
                      </div>
                    ))}
                    
                    {selectedOrder.documents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>Документы не загружены</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
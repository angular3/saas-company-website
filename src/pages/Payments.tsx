import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Download,
  Upload,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Payment } from '@/types';

const Payments: React.FC = () => {
  const { user } = useAuth();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const mockPayments: Payment[] = [
    {
      id: '1',
      orderId: '1',
      userId: 'client1',
      amount: 15000,
      method: 'bank_transfer',
      status: 'confirmed',
      transactionId: 'TXN-2024-001',
      confirmedBy: 'manager1',
      confirmedAt: '2024-01-25T14:30:00Z',
      createdAt: '2024-01-25T10:00:00Z'
    },
    {
      id: '2',
      orderId: '1',
      userId: 'client2',
      amount: 10000,
      method: 'card',
      status: 'pending',
      transactionId: 'TXN-2024-002',
      createdAt: '2024-01-26T09:00:00Z'
    },
    {
      id: '3',
      orderId: '2',
      userId: 'client1',
      amount: 28000,
      method: 'bank_transfer',
      status: 'confirmed',
      transactionId: 'TXN-2024-003',
      confirmedBy: 'manager1',
      confirmedAt: '2024-01-27T11:15:00Z',
      createdAt: '2024-01-27T08:30:00Z'
    },
    {
      id: '4',
      orderId: '3',
      userId: 'client3',
      amount: 5000,
      method: 'crypto',
      status: 'failed',
      transactionId: 'TXN-2024-004',
      createdAt: '2024-01-28T16:45:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает подтверждения';
      case 'failed': return 'Отклонено';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'Банковский перевод';
      case 'card': return 'Банковская карта';
      case 'crypto': return 'Криптовалюта';
      default: return method;
    }
  };

  const totalAmount = mockPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const confirmedAmount = mockPayments
    .filter(p => p.status === 'confirmed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const confirmedPayments = mockPayments.filter(p => p.status === 'confirmed');
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  const failedPayments = mockPayments.filter(p => p.status === 'failed');

  const handleCreatePayment = () => {
    // Логика создания платежа
    setIsPaymentDialogOpen(false);
  };

  const handleConfirmPayment = () => {
    // Логика подтверждения платежа
    setIsConfirmDialogOpen(false);
    setSelectedPayment(null);
  };

  const PaymentCard: React.FC<{ payment: Payment }> = ({ payment }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              ₽{payment.amount.toLocaleString()}
            </CardTitle>
            <CardDescription>
              {payment.transactionId}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(payment.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(payment.status)}
              <span>{getStatusLabel(payment.status)}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Способ оплаты:</span>
            <div className="font-medium">{getMethodLabel(payment.method)}</div>
          </div>
          <div>
            <span className="text-gray-600">Дата создания:</span>
            <div className="font-medium">
              {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
            </div>
          </div>
        </div>

        {payment.confirmedAt && (
          <div className="text-sm">
            <span className="text-gray-600">Подтверждено:</span>
            <div className="font-medium">
              {new Date(payment.confirmedAt).toLocaleDateString('ru-RU')} в{' '}
              {new Date(payment.confirmedAt).toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Подробнее
          </Button>
          
          {user?.role === 'manager' && payment.status === 'pending' && (
            <Button 
              className="flex-1"
              onClick={() => {
                setSelectedPayment(payment);
                setIsConfirmDialogOpen(true);
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Подтвердить
            </Button>
          )}
          
          {payment.status === 'confirmed' && (
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Платежи</h1>
          <p className="text-gray-600 mt-2">
            Управление платежами и финансовыми операциями
          </p>
        </div>
        
        {user?.role === 'client' && (
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать платеж
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Создать платеж</DialogTitle>
                <DialogDescription>
                  Заполните данные для создания нового платежа
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="order">Заказ</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите заказ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order1">ORD-2024-001 - Наушники TWS Pro</SelectItem>
                      <SelectItem value="order2">ORD-2024-002 - Смарт-часы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Сумма (₽)</Label>
                  <Input id="amount" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="method">Способ оплаты</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите способ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Банковский перевод</SelectItem>
                      <SelectItem value="card">Банковская карта</SelectItem>
                      <SelectItem value="crypto">Криптовалюта</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Примечания</Label>
                  <Textarea id="notes" placeholder="Дополнительная информация" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreatePayment}>
                    Создать платеж
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
              Общая сумма
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Всех платежей
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Подтверждено
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₽{confirmedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {confirmedPayments.length} платежей
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ожидает подтверждения
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ₽{pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {pendingPayments.length} платежей
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средний чек
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₽{Math.round(totalAmount / mockPayments.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              За платеж
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Вкладки с платежами */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            Все ({mockPayments.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Подтверждено ({confirmedPayments.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Ожидает ({pendingPayments.length})
          </TabsTrigger>
          <TabsTrigger value="failed">
            Отклонено ({failedPayments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confirmedPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="failed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {failedPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Диалог подтверждения платежа */}
      {selectedPayment && (
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Подтвердить платеж</DialogTitle>
              <DialogDescription>
                Подтвердите получение платежа от клиента
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Сумма:</span>
                    <div className="font-semibold text-lg">
                      ₽{selectedPayment.amount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Способ оплаты:</span>
                    <div className="font-medium">
                      {getMethodLabel(selectedPayment.method)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">ID транзакции:</span>
                    <div className="font-medium">{selectedPayment.transactionId}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Дата создания:</span>
                    <div className="font-medium">
                      {new Date(selectedPayment.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirmNotes">Комментарий к подтверждению</Label>
                <Textarea 
                  id="confirmNotes" 
                  placeholder="Дополнительные заметки (необязательно)" 
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsConfirmDialogOpen(false);
                    setSelectedPayment(null);
                  }}
                >
                  Отмена
                </Button>
                <Button onClick={handleConfirmPayment}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Подтвердить платеж
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Пустое состояние */}
      {mockPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет платежей
          </h3>
          <p className="text-gray-600">
            Платежи будут отображаться здесь после их создания
          </p>
        </div>
      )}
    </div>
  );
};

export default Payments;
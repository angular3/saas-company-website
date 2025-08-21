import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  Paperclip,
  Users,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage, GroupPurchase } from '@/types';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockChats: GroupPurchase[] = [
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
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      title: 'Групповая закупка наушников TWS Pro',
      description: 'Закупка премиальных беспроводных наушников',
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
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      title: 'Смарт-часы для активного образа жизни',
      description: 'Закупка многофункциональных смарт-часов',
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

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      groupPurchaseId: '1',
      senderId: 'manager1',
      sender: {
        id: 'manager1',
        email: 'manager@company.com',
        name: 'Анна Менеджерова',
        role: 'manager',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'Добро пожаловать в чат групповой закупки наушников TWS Pro! Здесь мы будем обсуждать все вопросы по заказу.',
      type: 'text',
      createdAt: '2024-01-25T09:00:00Z'
    },
    {
      id: '2',
      groupPurchaseId: '1',
      senderId: 'client1',
      sender: {
        id: 'client1',
        email: 'client1@example.com',
        name: 'Иван Петров',
        role: 'client',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'Здравствуйте! Когда планируется отправка заказа?',
      type: 'text',
      createdAt: '2024-01-25T10:30:00Z'
    },
    {
      id: '3',
      groupPurchaseId: '1',
      senderId: 'manager1',
      sender: {
        id: 'manager1',
        email: 'manager@company.com',
        name: 'Анна Менеджерова',
        role: 'manager',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'Производство займет 10-14 дней после подтверждения заказа. Ожидаемая отправка - 15 февраля.',
      type: 'text',
      createdAt: '2024-01-25T10:45:00Z'
    },
    {
      id: '4',
      groupPurchaseId: '1',
      senderId: 'client2',
      sender: {
        id: 'client2',
        email: 'client2@example.com',
        name: 'Мария Сидорова',
        role: 'client',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'Отлично! А какие варианты доставки доступны?',
      type: 'text',
      createdAt: '2024-01-25T11:00:00Z'
    },
    {
      id: '5',
      groupPurchaseId: '1',
      senderId: 'manager1',
      sender: {
        id: 'manager1',
        email: 'manager@company.com',
        name: 'Анна Менеджерова',
        role: 'manager',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'Доступны следующие варианты:\n1. Курьерская доставка по Москве - 500₽\n2. Доставка в регионы - от 800₽\n3. Самовывоз из офиса - бесплатно',
      type: 'text',
      createdAt: '2024-01-25T11:15:00Z'
    },
    {
      id: '6',
      groupPurchaseId: '1',
      senderId: 'system',
      sender: {
        id: 'system',
        email: 'system@groupbuy.com',
        name: 'Система',
        role: 'admin',
        createdAt: '2024-01-01T10:00:00Z',
        isActive: true
      },
      message: 'К закупке присоединился новый участник: Алексей Козлов',
      type: 'system',
      createdAt: '2024-01-25T14:30:00Z'
    }
  ];

  const selectedChatData = mockChats.find(chat => chat.id === selectedChat);
  const chatMessages = mockMessages.filter(msg => msg.groupPurchaseId === selectedChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Логика отправки сообщения
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Список чатов */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Чаты закупок</h2>
          <p className="text-sm text-gray-600">Общение с участниками</p>
        </div>
        
        <ScrollArea className="h-full">
          <div className="p-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  selectedChat === chat.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={chat.product.images[0]}
                    alt={chat.product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {chat.title}
                      </h3>
                      <Badge className={`text-xs ${getStatusColor(chat.status)}`}>
                        {getStatusLabel(chat.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {chat.product.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        {chat.currentQuantity}/{chat.targetQuantity}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(chat.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Область чата */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Заголовок чата */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChatData.product.images[0]}
                    alt={selectedChatData.product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedChatData.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{selectedChatData.currentQuantity} участников</span>
                      <Badge className={getStatusColor(selectedChatData.status)}>
                        {getStatusLabel(selectedChatData.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'system' ? (
                      <div className="flex justify-center">
                        <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                          {message.message}
                        </div>
                      </div>
                    ) : (
                      <div className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                          message.senderId === user?.id ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                            <AvatarFallback>
                              {message.sender.name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className={`rounded-lg px-3 py-2 ${
                            message.senderId === user?.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {message.senderId !== user?.id && (
                              <div className="text-xs font-medium mb-1">
                                {message.sender.name}
                              </div>
                            )}
                            <div className="text-sm whitespace-pre-wrap">
                              {message.message}
                            </div>
                            <div className={`text-xs mt-1 ${
                              message.senderId === user?.id
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Поле ввода */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="resize-none"
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Выберите чат
              </h3>
              <p className="text-gray-600">
                Выберите закупку из списка слева для начала общения
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
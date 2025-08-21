import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Plus, Star, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';

const Products: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Беспроводные наушники TWS Pro',
      description: 'Премиальные беспроводные наушники с активным шумоподавлением и быстрой зарядкой',
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
      price: 1250,
      minQuantity: 10,
      category: 'Электроника',
      specifications: {
        'Время работы': '8 часов',
        'Bluetooth': '5.2',
        'Водозащита': 'IPX5',
        'Вес': '45г'
      },
      factoryInfo: {
        name: 'Shenzhen Audio Tech',
        location: 'Шэньчжэнь, Китай',
        rating: 4.8
      },
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Смарт-часы с GPS и NFC',
      description: 'Многофункциональные смарт-часы с мониторингом здоровья и бесконтактными платежами',
      images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'],
      price: 2800,
      minQuantity: 15,
      category: 'Электроника',
      specifications: {
        'Экран': '1.4" AMOLED',
        'Батарея': '7 дней',
        'Водозащита': '5ATM',
        'GPS': 'Да'
      },
      factoryInfo: {
        name: 'Guangzhou Smart Devices',
        location: 'Гуанчжоу, Китай',
        rating: 4.6
      },
      isActive: true,
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      name: 'Портативная Bluetooth колонка',
      description: 'Мощная портативная колонка с защитой от воды и 20-часовой батареей',
      images: ['https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400'],
      price: 890,
      minQuantity: 20,
      category: 'Аудио',
      specifications: {
        'Мощность': '20W',
        'Батарея': '20 часов',
        'Водозащита': 'IPX7',
        'Bluetooth': '5.0'
      },
      factoryInfo: {
        name: 'Dongguan Audio Solutions',
        location: 'Дунгуань, Китай',
        rating: 4.5
      },
      isActive: true,
      createdAt: '2024-01-05T10:00:00Z'
    }
  ];

  const categories = ['all', 'Электроника', 'Аудио', 'Аксессуары', 'Дом и сад'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    // Логика добавления товара
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Каталог товаров</h1>
          <p className="text-gray-600 mt-2">
            Выберите товары для групповых закупок
          </p>
        </div>
        
        {user?.role === 'manager' && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавить новый товар</DialogTitle>
                <DialogDescription>
                  Заполните информацию о товаре для добавления в каталог
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Название товара</Label>
                    <Input id="name" placeholder="Введите название" />
                  </div>
                  <div>
                    <Label htmlFor="category">Категория</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Электроника</SelectItem>
                        <SelectItem value="audio">Аудио</SelectItem>
                        <SelectItem value="accessories">Аксессуары</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" placeholder="Подробное описание товара" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Цена за единицу (₽)</Label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="minQuantity">Минимальное количество</Label>
                    <Input id="minQuantity" type="number" placeholder="1" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddProduct}>
                    Добавить товар
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Все категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.slice(1).map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Список товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-white text-gray-900">
                {product.category}
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    ₽{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">за шт.</span>
                </div>
                <Badge variant="outline">
                  Мин. {product.minQuantity} шт.
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.factoryInfo.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {product.factoryInfo.rating} • {product.factoryInfo.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-2 rounded">
                    <div className="font-medium text-gray-700">{key}</div>
                    <div className="text-gray-600">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Присоединиться
                </Button>
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Товары не найдены
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить параметры поиска или выбрать другую категорию
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
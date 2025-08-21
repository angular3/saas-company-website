import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">GroupBuy Pro</CardTitle>
          <CardDescription>
            Платформа для совместных оптовых закупок
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => login('google')}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Войти через Google
          </Button>
          
          <Button
            onClick={() => login('yandex')}
            disabled={loading}
            variant="outline"
            className="w-full border-red-500 text-red-600 hover:bg-red-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c0 3.123-1.968 4.608-3.84 4.608-.72 0-1.44-.24-1.92-.72v3.36h-2.16V6.24h2.16v.72c.48-.48 1.2-.72 1.92-.72 1.872 0 3.84 1.485 3.84 4.608v1.92zm-2.16-1.92c0-1.44-.72-2.4-1.68-2.4s-1.68.96-1.68 2.4v1.92c0 1.44.72 2.4 1.68 2.4s1.68-.96 1.68-2.4V6.24z"
              />
            </svg>
            Войти через Яндекс
          </Button>

          <div className="text-center text-sm text-gray-600 mt-6">
            Входя в систему, вы соглашаетесь с{' '}
            <a href="#" className="text-blue-600 hover:underline">
              условиями использования
            </a>{' '}
            и{' '}
            <a href="#" className="text-blue-600 hover:underline">
              политикой конфиденциальности
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
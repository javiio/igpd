import React, { useState } from 'react';
import { useAuth } from '~auth';
import { Input, Label, Button } from '~core-ui';

export const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email, password);
    } else {
      signup(name, email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-96">
      <div className="grid grid-cols-1 gap-6 bg-white/5 px-4 py-12 rounded">
        {mode === 'signup' && (
          <div>
            <Label>Name</Label>
            <Input
              variant='secondary'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <Label>Email</Label>
          <Input
            variant='secondary'
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            variant='secondary'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" isLoading={isLoading}>
          {mode === 'login' ? 'Login' : 'Sign up'}
        </Button>

        <div className="flex space-x-2 items-center justify-center">
          <span className="mb-2">
            {mode === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
          </span>
          <Button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            variant="link"
            className="!px-2"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </div>
    </form>
  );
};

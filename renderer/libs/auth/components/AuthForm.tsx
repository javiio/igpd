import React from 'react';
import { useAuth } from '~auth';
import { Input, Label, Button } from '~core-ui';

export const AuthForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96">
      <div className="grid grid-cols-1 gap-6 bg-white/5 px-4 py-12 rounded">
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

        <Button type="submit" isLoading={isLoading}>Login</Button>
      </div>
    </form>
  );
};

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setLogin } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    const response = await setLogin(data);

    if (!response.error) {
      const token = response.data.token
      const user = response.data.user.email
      login(token, user)

      toast.success(response.message);
      router.push('/admin');
    } else {
      toast.error(response.message || 'Login failed');
    }
  };

  return (
    <div className='bg-[#f0f2ed] min-h-screen flex items-center justify-center'>
  <div className='max-w-md w-full p-6 bg-white shadow-lg rounded font-haskoy'>
    <h1 className='text-2xl font-bold mb-1'>Admin Login</h1>
    <p className='mb-4 font-medium'>Akses halaman admin dengan login di bawah ini.</p>
    <form onSubmit={handleLogin} className='space-y-4'>
      <input
        type='email'
        placeholder='Email'
        className='w-full border p-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        className='w-full border p-2'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type='submit'
        className='px-4 py-2 rounded w-full bg-lime-600 text-white'
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
}

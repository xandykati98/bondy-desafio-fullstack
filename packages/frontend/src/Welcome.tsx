import React from 'react'
import logo from '@/assets/logo-bondy.png'
const Welcome: React.FC = () => {
  return (
    <div className='w-screen bg-[#f4f5f9] h-screen flex flex-col items-center justify-center'>
      <div className='w-full max-w-md flex flex-col bg-white p-8 rounded-lg shadow-md'>
        <div className='mb-4'>
          <img src={logo} alt="Logo" className='h-10' />
        </div>
        <h2 className='text-2xl font-bold'>Bem-vindo!</h2>
        <p className='text-sm'>Login realizado com sucesso. <a href="/login" className='text-sm mt-2 text-blue-500 hover:text-blue-700'>Sair</a></p>
      </div>
    </div>
  )
}

export default Welcome
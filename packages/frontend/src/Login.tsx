import React, { useState, FormEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import side1 from '@/assets/side1.webp'
import logo from '@/assets/logo-bondy.png'
import './Login.css'
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      name
      email
      company
    }
  }
`

interface LoginData {
  login: {
    _id: string
    name: string
    email: string
    company: string
  }
}

interface LoginVars {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const [login, { loading, error }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION, {
    onCompleted: () => {
      navigate('/welcome')
    }
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await login({ variables: { email, password } })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      style={{ fontFamily: 'var(--font-geist-sans)' }}
    >
      {/* Left Panel */}
      <div className="relative hidden h-full flex-col bg-white p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 p-4">
          <div className="bg-primary h-full w-full rounded-lg relative overflow-hidden">
            <img
              src={side1}
              alt="Login background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium gap-2 p-0 -translate-x-6 -translate-y-6">
          <div id="logo-curved-bottom-left" className="rounded-br-lg">
            <img
              src={logo}
              alt="Logo"
              width="120"
              height="100"
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative z-20 mt-auto p-2">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "O Orange revolucionou a gestão da minha clínica odontológica. Agora consigo
              gerenciar pacientes, agenda e procedimentos de forma muito mais eficiente e
              integrada."
            </p>
            <footer className="text-sm">
              Dra. Ana Santos - Clínica Sorriso Perfeito
            </footer>
          </blockquote>
        </div>
      </div>
      {/* Right Panel */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Entre na sua conta</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu e-mail e senha para acessar sua conta
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemplo@bondy.com"
                className="mt-1 block w-full rounded-md border-1 border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
                className="mt-1 block w-full rounded-md border-1 border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={"w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50 "+(error ? "!bg-red-500 !hover:bg-red-600" : "")}
            >
              {error ? 'Erro! Tente novamente.' : loading ? 'Entrando...' : 'Entrar'}
            </button>
            {
                error && (
                    <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>
                )
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
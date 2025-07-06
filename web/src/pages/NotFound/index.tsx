import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/404.svg';

export function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 px-4">      
        <div className="flex flex-col bg-white max-w-lg rounded-xl p-10 gap-4 text-center shadow-md">  
            <img
                src={notFoundImage}                
                alt="Ícone de corrente azul representando um link ao lado do nome 'brev.ly' também em azul."
                className="h-20 w-auto mx-auto"
            />            
            <h1 className="text-xl font-bold text-gray-600">
                Link não encontrado
            </h1>
            <p className="text-sm text-gray-500 mt-2">
                O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em {' '}
                <Link
                    to="/"
                    className="text-blue-base font-medium hover:underline"
                >
                    brev.ly
                </Link>
                .
            </p>
        </div>
    </div>
  )
}
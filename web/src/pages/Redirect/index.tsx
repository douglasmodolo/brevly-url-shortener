import iconLogo from '../../assets/Logo_Icon.svg';

import { useParams } from "react-router-dom";
import { useEffect } from "react";

export function Redirect() {
  const { shortenedLink } = useParams();

  useEffect(() => {  
    if (!shortenedLink) return;

    const redirectUrl = `${import.meta.env.VITE_BACKEND_URL}/r/${shortenedLink}`

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 3000);
  }, [shortenedLink])


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 px-4">      
      <div className="flex flex-col bg-white rounded-xl p-10 gap-4 text-center shadow-md">        
        <img
          src={iconLogo}
          alt="Ícone de corrente azul representando um link ao lado do nome 'brev.ly' também em azul."
          className="h-8"
        />
        <h1 className="text-xl font-bold text-gray-600">Redirecionando...</h1>
        <p className="text-sm text-gray-500 mt-2">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{' '}
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/r/${shortenedLink}`}
            className="text-blue-base font-medium"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  )
}
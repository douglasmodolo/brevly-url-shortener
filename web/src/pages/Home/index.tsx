import logo from '../../assets/logo.svg';
import { MyLinks } from './components/MyLinks';
import { NewLink } from './components/NewLink';

export function Home () {
    return (
        <main className="min-h-screen flex flex-col py-16 px-6 bg-gray-200">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
                <header>
                    <img
                        src={logo}
                        alt="Ícone de corrente azul representando um link ao lado do nome 'brev.ly' também em azul."
                        className="h-8"
                    />  
                </header>

                <section className="w-full flex flex-col md:flex-row items-start justify-between gap-10">
                    <NewLink />
                    <MyLinks />
                </section>
            </div>
        </main>
    )
}
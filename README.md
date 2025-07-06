# Brev.ly - Encurtador de URLs 🔗

Este é um projeto full stack desenvolvido como parte de uma pós-graduação, cujo objetivo é permitir a criação, listagem e redirecionamento de links encurtados. O sistema também permite exportar relatórios em CSV com os dados dos links.

## 🧰 Tecnologias Utilizadas

### Backend:

* [Node.js](https://nodejs.org/)
* [Fastify](https://fastify.dev/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [Zod](https://zod.dev/)
* PostgreSQL
* Docker + Docker Compose

### Frontend:

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Phosphor Icons](https://phosphoricons.com/)
* [Framer Motion](https://www.framer.com/motion/)

## ✨ Funcionalidades

* ✅ Criar link encurtado
* ✅ Listar todos os links encurtados
* ✅ Copiar link encurtado para a área de transferência
* ✅ Excluir link encurtado
* ✅ Redirecionar link encurtado
* ✅ Exportar relatório de links em CSV
* ✅ Página 404 personalizada
* ✅ Validações com feedback visual no frontend
* ✅ Integração com CDN via Cloudflare R2 (mocked para o desafio)
* ✅ Responsividade e boa experiência de uso

## 🚀 Como Rodar Localmente

Para executar o projeto localmente com Docker, siga os passos abaixo:

### Pré-requisitos

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/) (apenas se for rodar o frontend fora do container)

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/brevly-url-shortener.git
cd brevly-url-shortener
```

2. Suba os containers:

```bash
docker-compose up --build
```

3. Acesse o container `brevly_dev` para rodar as migrations:

```bash
docker exec -it brevly_dev sh
```

4. Dentro do container, rode as migrations:

```bash
npx drizzle-kit migrate
```

5. Acesse o frontend:

```
http://localhost:5173
```

6. Acesse a API (backend):

```
http://localhost:3333/docs
```

> O backend estará documentado via Swagger disponível em `/docs`.

---

## 📝 Licença

Este projeto foi desenvolvido apenas para fins acadêmicos. Sinta-se à vontade para usar como base de estudo.
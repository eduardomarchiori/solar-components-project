# Cenergy Tech
## Objetivo

Implementar sistema básico com listagem, criação edição, remoção de componentes fotovoltaicos e calculo de cubagem necessitando de um usuário autenticado para tais ações.

## Requisitos técnicos

A aplicação deve respeitar os seguintes requisitos técnicos:

- Calculo de cubagem dos componentes fotovoltaico existentes/selecionados;
- Listagem de componentes fotovoltaicos;
- Adição de um novo componente fotovoltaico;
- Edição de um componente fotovoltaico já existente;
- Remoção de um componente fotovoltaico já existente;
- Autenticação (front);
- Autenticação API (back).

## Autor

- [Eduardo Marchiori](https://www.linkedin.com/in/eduardo-marchiori-679965187)

## Programas necessários

- Node/NPM
- Docker
- docker-compose

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu .env da pasta back

`ACCESS_TOKEN_SECRET`

## Para rodar Localmente

Clone o projeto

```bash
  git clone git@github.com:eduardomarchiori/solar-components-project.git
```

Abra o diretório do projeto na pasta

```bash
  cd solar-components-project
```

Entre na pasta front

```bash
  cd front
```

Instale as dependências do projeto e rode localmente (front)

```bash
  npm i
  npm run start
```

Em outro terminal, entre na pasta back

```bash
  cd back
```

Suba a instancia do banco de dados

```bash
  sudo docker-compose up
```

Instale as dependências do projeto e rode localmente (back)

```bash
  npm i
  npm run start
```

## Stack utilizada

**Front-End:** Vue 3.

**Back-End:** Node.

**Banco de dados:** Postgress.

## Screenshot


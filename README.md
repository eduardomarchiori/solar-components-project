# Cenergy Tech
## Objetivo

Implementar sistema básico com listagem, criação, edição e remoção de componentes fotovoltaicos e calculo de cubagem necessitando de um usuário autenticado para tais ações.

## Requisitos técnicos

A aplicação deve respeitar os seguintes requisitos técnicos:

- Calculo de cubagem dos componentes fotovoltaicos existentes/selecionados;
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

Novamente, em outro terminal, entre na pasta back

```bash
  cd back
```

Instale as dependências do projeto e rode localmente (back)

```bash
  npm i
  npm run start
```


## Utilização API
**Rotas autenticação:**

[POST] Signin: /api/signin

Payload: 

```json
Body

{
  "email": "string",
  "password": "string"
}
```

[POST] Signup: /api/signup

Payload: 

```json
Body

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Rotas componente solar (autenticada):**

[GET] Listagem: /api/solar-component

[POST] Criação: /api/solar-component

Payload: 

```json
Body

{
  "name": "string",
  "gtim": "string",
  "sector": "string",
  "group": "string",
  "grossWeight": "float",
  "netWeight": "float",
  "height": "float",
  "width": "float",
  "depth": "float"
}
```

[DELETE] Remoção: /api/solar-component/:id

[PUT] Alteração: /api/solar-component

Payload: 

```json
Body

{
  "logisticDimensionId": "uuid",
  "solarComponentId": "uuid",
  "name": "string",
  "gtim": "string",
  "sector": "string",
  "group": "string",
  "grossWeight": "float",
  "netWeight": "float",
  "height": "float",
  "width": "float",
  "depth": "float"
}
```

[POST] Calculo cubagem: /api/solar-component/calculate

Payload: 

```json
Body

{
  "components": [
    {
      "id": "string",
      "quantidade": "int"
    },
    outros componentes...
  ]
}
```

**Rotas usuário (autenticada):**

[GET] Obter: /api/user

## Stack utilizada

**Front-End:** Vue 3.

**Back-End:** Node.

**Banco de dados:** Postgress.

## GIF
![alt text](/utilizacao.gif "Apresentação projeto")

## Próximos passos
- Fazer front-end responsivo;
- Sepapração de regras de negócio em microserviços separados, ou seja, um microserviço para autenticação com seu próprio banco de dados e outro para regras relacionadas a componentes solares sobre a mesma estrutura;
- Swagger
- Melhorar componetização;
- Criação de testes unitários.

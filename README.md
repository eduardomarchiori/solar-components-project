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

- Node (versão utilizada 16.13.2)
- Docker
- docker-compose

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar a seguinte variável de ambiente no seu ```.env``` da pasta back

`ACCESS_TOKEN_SECRET`

## Ambiente testado

**Sistema operacional:** Linux e Windows

**Navegador:** Google Chrome e Edge

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
  --Linux
  sudo docker-compose up
  
  ou
  
  --Windows
  docker-compose up
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

Documentação feita com **Swagger API**.

Ao executar o serviço de back-end, acessar rota: [Eduardo Marchiori](http://localhost:5003/documentation/)

## Stack utilizada

**Front-End:** Vue 3.

**Back-End:** Node.

**Banco de dados:** Postgress.

## GIF
![alt text](/utilizacao.gif "Apresentação projeto")

## Próximos passos
- Sepapração de regras de negócio em microserviços separados, ou seja, um microserviço para autenticação com seu próprio banco de dados e outro para regras relacionadas a componentes solares sobre a mesma estrutura;
- Melhorar componetização;
- Criação de testes unitários.

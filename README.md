# Projeto de Rastreamento de Treinos

Este projeto é uma aplicação completa para rastreamento de treinos, unindo um backend em Spring Boot e um frontend em React. A aplicação permite cadastrar treinos e exercícios associados, servindo tanto a API quanto a interface de usuário a partir do mesmo servidor.

## Pré-requisitos

- **Java** (JDK 11 ou superior)
- **Maven** (para compilar e executar o backend)
- **Node.js** (para compilar e executar o frontend)
- **Git** (para controle de versão)
- **Colima** (para Oracle XE no MacOS)

## Configuração

### 1. Configurar o Banco de Dados (Oracle XE)

    colima start --arch x86_64 --memory 4
    docker run -d --name oracle-xe -p 1521:1521 -p 8080:8080 -e ORACLE_PWD=senha_forte gvenzl/oracle-xe

### 2. Configurar o Backend (Spring Boot)

1. Navegue até a pasta do backend:

   ```bash
   cd Backend

2. Certifique-se de que o arquivo de configuração application.properties em Backend/src/main/resources/ esteja configurado com a conexão do banco de dados.

3. Compile e inicie o backend:
    ```bash
    ./mvnw spring-boot:run

### 3. Configurar o Frontend (React)

1. Instalar as dependéncias, compilar a versão de produção do frontend e copiar os arquivos para o backend:
    ```bash
    cd Frontend
    npm install
    npm run build && npm run copy-build

## Executar o projeto
1. Na pasta Backend, executar:
    ```bash
    ./mvnw spring-boot:run
2. Acessar a aplicação no browser em:
   http://localhost:8081

## Estrutura do Banco de Dados
1. Tabela Treinos: Armazena os dados do treino (nome, descrição e data).
2. Tabela Exercícios: Armazena os dados dos exercícios, relacionados ao treino, incluindo nome, peso, séries e repetições.

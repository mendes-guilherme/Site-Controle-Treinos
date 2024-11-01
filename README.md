# Projeto de Gerenciamento de Treinos

Aplicação para gerenciamento de treinos, com o backend em Spring Boot e um frontend em React. A aplicação permite cadastrar treinos e exercícios associados, servindo a API e a interface de usuário a partir do mesmo servidor.
![image](https://github.com/user-attachments/assets/f084d4b4-c26d-493e-b972-e7ad78ea6a63)

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

1. Pasta Backend:

   ```bash
   cd Backend

2. Verificar se application.properties em Backend/src/main/resources/ esteja configurado com a conexão do banco de dados.


### 3. Configurar o Frontend (React)

1. Instalar as dependéncias, compilar a versão de produção do frontend e copiar os arquivos para o backend:
    ```bash
    cd Frontend
    npm install
    npm run build 

## Executar o projeto
1. Na pasta Backend, executar:
    ```bash
    ./mvnw spring-boot:run
    
2. Acessar a aplicação no browser em:
   http://localhost:8081

## Estrutura do Banco de Dados
1. Tabela Treinos: Armazena os dados do treino (nome, descrição e data).
2. Tabela Exercícios: Armazena os dados dos exercícios, relacionados ao treino, incluindo nome, peso, séries, repetições e Id do treino relacionado..

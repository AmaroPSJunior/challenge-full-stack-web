
Instrução para instalação e execução!
===================
### Requisitos pre instalados:
* Docker para rodar banco de dados "postgres": https://docs.docker.com/get-docker/
* nodejs: https://nodejs.org/en/download/


### Instalação:
Execute os comandos abaixo na seguinte sequencia!
<br>
<br>
1 - Instalação necessária para executar banco de dados postgres:
````
npm run db_install  ou  yarn db_install
````

2 - Instalação necessária para executar backend:
<br>
na raiz do projeto execute o comando abaixo
````
npm install  ou  yarn
````

3 - Instalação necessária para executar frontend:
````
npm run frontend_install ou yarn frontend_install
````

ou se preferir pode navegar ate a raiz do front e execute a partir de la
````
cd front
````

````
npm install  ou  yarn
````

<br>
<br>
<hr>
<br>


### iniciando backend:
4 - verifique se o banco de dados "postgres" esta executando,
se sim então execute o comando abaixo
````
npm run dev  ou  yarn dev
````

### iniciando frontend:
5 - Com backend em execução, abra outro terminal e execute o comando abaixo

````
npm run front  ou  yarn front
````

ou se preferir pode navegar ate a raiz do front e execute a partir de la
````
cd front
````

````
npm run serve  ou  yarn serve
````

<br>
<br>
<hr>
<br>

### iniciando testes com jest:
6 - Execute o comando abaixo para rodar os testes:
````
npm run test  ou  yarn test
````


<br>
<hr>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
GrupoA Educação - Full Stack Web Developer
===================

[![N|Solid](https://www.grupoa.com.br/hs-fs/hubfs/logo-grupoa.png?width=300&name=logo-grupoa.png)](https://www.grupoa.com.br) 

O objetivo deste desafio é avaliar as competências técnicas dos candidatos a desenvolvedor Full Stack Web na Maior Plataforma de Educação do Brasil, **Grupo A Educação**. 

Será solicitado o desenvolvimento de uma Aplicação que realize a Matrícula do User na Turma de Programação Web da instituição EdTech. Regras e requisitos técnicos estão detalhadas neste documento.

# Especificações Técnicas
- **Front End:** [Vuetifyjs](https://vuetifyjs.com/en/)  como framework de UI
- **API:** Express e NodeJS
- **Banco de Dados:** Postgress ou MySQL
- **Idioma de escrita do código:** Inglês


# Requisitos
## Contextualização
Considere que uma Instituição de Ensino Superior precisa de uma solução para cadastrar e gerenciar matrículas de usuários em turmas online. Para realizar a matrícula, é necessário que o cadastro de user tenha sido realizado.

O desafio consiste em criar uma aplicação para o cadastro de usuários conforme os critérios de aceitação.

## Mockups de interface
Abaixo alguns mockoups de interface como um guia para a criação do front-end. Fique à vontade para usar sua criatividade e melhorias na criação do front-end.

* Listagem de Users
![Listagem de Users](/mockups/studants_list.png)

* Criar/Editar User
![Listagem de Users](/mockups/studants_save.png)

## Histórias do Usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** gerenciar cadastros de users
- **Para** que eu possa realizar a matrícula do user

### Critérios de aceite: 

#### Cenário: cadastrar novo user
- **Dado** que estou na tela de Consulta de Users
- **Quando** clico em Cadastrar User
- **Então** abre a tela de Cadastro do User
- **E** exibe os campos obrigatórios vazios
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Salvar
- **Então** cria o novo user na base
- **E** retorna mensagem de sucesso
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Cancelar
- **Então** retorna para tela Consulta de Users
- **E** não persiste a gravação dos dados no banco 

#### Cenário: listar users cadastrados 
- **Dado** que estou no Módulo Acadêmico
- **Quando** clico no menu Users
- **Então** abre a tela de Consulta de Users 
- **E** exibe opção Cadastrar User ao topo
- **E** lista dados dos users cadastrados
- **E** exibe opção Editar por user
- **E** exibe opção Excluir por user

#### Cenário editar cadastro de user
- **Dado** que estou na listagem de users
- **Quando** clico em Editar user
- **Então** abre a tela de Cadastro do User 
- **E** exibe os campos do cadastro preenchidos
- **E** habilita alteração dos campos editáveis
####
- **Dado** que estou na tela de Cadastro do User
- **Quando** clica em Salvar
- **Então** grava os dados editáveis na base
####
- **Dado** que estou na tela de Cadastro do User
- **Quando** clica em Cancelar
- **Então** retorna para a tela de Consulta de Users
- **E** não persiste a gravação dos dados

#### Cenário: excluir cadastro de user
- **Dado** que estou na listagem de users
- **Quando** clico em Excluir user
- **Então** exibe a modal de confirmação de exclusão
####
- **Dado** que estou na modal de confirmação de exclusão 
- **Quando** clico em Confirmar
- **Então** então exclui o registro do user
####
- **Dado** que estou na modal de confirmação de exclusão
- **Quando** clico em Cancelar
- **Então** então fecha a modal e não persiste a exclusão

## Campos obrigatórios:
- **Nome** (editável)
- **Email** (editável)
- **RA** (não editável) (chave única)
- **CPF** (não editável)

# Desejável
- Testes unitários
- Documentação da arquitetura de solução

# Critérios de avaliação
- Qualidade de escrita do código
- Organização do projeto
- Qualidade da API
- Lógica da solução implementada
- Qualidade da camada de persistência
- Utilização do Git (quantidade e descrição dos commits, Git Flow, ...)

# Instruções de entrega
1. Crie um fork do repositório no seu GitHub
2. Faça o push do código desenvolvido no seu Github
3. Inclua um arquivo chamado COMMENTS.md explicando
- Decisão da arquitetura utilizada
- Lista de bibliotecas de terceiros utilizadas
- O que você melhoraria se tivesse mais tempo
- Quais requisitos obrigatórios que não foram entregues
4. Informe ao recrutador quando concluir o desafio junto com o link do repositório
5. Após revisão do projeto junto com a equipe de desevolvimento deixe seu repositório privado

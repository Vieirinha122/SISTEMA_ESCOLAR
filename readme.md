# Sistema Escolar (Versão Web)

Bem-vindo ao **Sistema Escolar**! Este projeto é um portal acadêmico desenvolvido para facilitar a gestão e comunicação entre alunos, professores e a coordenação. O objetivo principal é centralizar informações acadêmicas em uma interface intuitiva e eficiente.

## 🚀 Tecnologias Utilizadas

- **Front-end**: HTML5, CSS3, JavaScript
- **Back-end**: Node.js com Express.js
- **Banco de Dados**: MongoDB (Atlas)
- **Autenticação**: JWT (JSON Web Tokens)
- **Gerenciamento de Versão**: Git/GitHub
- **Estilização e Responsividade**: CSS Flexbox/Grid, Bootstrap

## 📋 Funcionalidades

### Para Alunos
- Acessar conceitos e notas.
- Visualizar comunicados publicados pelos professores e pela coordenação.
- Consultar informações de contato de professores e coordenação.

### Para Professores
- Inserir e editar notas dos alunos.
- Publicar comunicados para as turmas sob sua responsabilidade.
- Visualizar conceitos e desempenho geral de seus alunos.

### Para a Coordenação
- Gerenciar cadastros de alunos, professores e coordenadores (adicionar, editar, excluir).
- Publicar comunicados gerais.
- Visualizar relatórios de desempenho dos alunos.
- Acessar uma lista consolidada de registros acadêmicos.

## 📦 Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/Vieirinha122/SISTEMA_ESCOLAR.git
cd SISTEMA_ESCOLAR
```

### 2. Configurar o Banco de Dados
Crie uma conta no MongoDB Atlas.
Configure um cluster e copie a URL de conexão.
Crie um arquivo .env na raiz do projeto e adicione as configurações:
env
MONGO_URI=your-mongodb-connection-string
PORT=5000

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar o servidor

```bash
npm start
```

### 5. Rodar o servidor

Abra o navegador e acesse http://localhost:5000.
# Desafio Técnico - Backend

Este programa foi desenvolvido como resposta ao desafio proposto, O código fonte se encontra na pasta `BACK`.

O programa consiste em um servidor baseado em `express` que disponibiliza um serviço REST API para interagir com o aplicativo da pasta `FRONT`.

## Instruções

O backend deve ser inicializado e instalado utilizando `cd BACK` e em seguida `npm install` ou `yarn`. Após a instalação, os seguintes scripts estarão disponíveis:

- `npm run dev`: inicia o programa na pasta `src` através do `ts-node` pulando todos os outros scripts
- `npm run lint`: executa o linter `eslint` nos arquivos da pasta `src`
- `npm run test`: executa o script `lint` e em seguida executa os testes encontrados na pasta `test`
- `npm run build`: executa o script `test` e em seguida faz a compilação dos arquivos typescript da pasta `src` para javascript na pasta `dist`
- `npm run start`: executa o script `build` e em seguida inicia o programa na pasta `dist` através do `node`

Para além da instalação, também é necessária a configuração das variáveis de ambiente. Estas variáveis podem estar no seu ambiente global, serem injetadas no programa ou estarem presentes no arquivo `.env` na pasta `BACK`.

As seguintes variáveis de ambiente são obrigatórias:

- `LOGIN`: o login de usuário do aplicativo
- `SENHA`: a senha de usuário do aplicativo
- `CHAVE`: um texto aleatório que será utilizado como chave para a geração de tokens

Para além das variáveis obrigatórias, as seguintes variáveis opcionais também estão disponíveis:

- `PORT`: porta desejada para rodar o servidor, caso omitido será usada a porta `5000`
- `HOSTNAME`: o domínio origem do aplicativo que vai conectar ao servidor para efeitos de CORS, caso omitido será utilizado `localhost`
- `DATABASE`: onde salvar a base de dados, caso omitido uma base de dados in-memory será criada e os dados serão perdidos toda a vez que reiniciar o servidor

## Observações do Desafio

Alguns problemas foram encontrados durante o desenvolvimento do programa:

- O aplicativo frontend fornecido possui vários problemas de vulnerabilidade e segurança devido a dependências antigas e desatualizadas. Um destes problemas foi a depreciação e remoção de alguns sistemas vulneráveis do modulo SSL ocorrida a partir do NodeJS versão 17, o que causou o seguinte erro: `error:0308010C:digital envelope routines::unsupported`. A solução correta para este problema seria a revisão e atualização do aplicativo frontend fornecido, no entanto como solução rápida para dar seguimento ao desafio, a seguinte alteração foi feita na pasta `FRONT`: Foi adicionada a instrução `--openssl-legacy-provider` ao script `start` encontrado no arquivo `package.json`.

- O aplicativo frontend fornecido possui um bug que impossibilita a utilização do token `JWT` de forma correta. Ele espera que o token seja retornado pela API em forma de string, mas ao mesmo tempo ele tenta decodificar a resposta da API utilizando a função `response.json()`, o que causa um erro. Caso o token seja retornado em forma de JSON, o aplicativo frontend incorretamente gera o header de autorização `Bearer [object Object]` que também é incorreto. Para solucionar este problema, a seguinte alteração foi feita na pasta `FRONT`: o arquivo `cardServices.js` foi modificado para que o token seja decodificado como string utilizando `response.text()` ao vez de json.

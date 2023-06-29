# aula28-06-exercicio-API
Crie um API com o JSON em anexo e as seguintes rotas:

- GET: exibe todos os resultados
- GET: exibe por ID
- GET: exibe nome do aluno, matéria e se passou ou não (nota precisa ser maior ou igual a 7.0).

Exemplo:  
nome: fulano da silva  
matematica: aprovado  
portugues: aprovado  
historia: reprovado  
ingles: aprovado  
  
- POST: cria novo cadastro
- PATCH: alterar cadastro
- DELETE: deleta cadastro

Não se esqueça do express (npm i express), cors (npm i cors) e .gitignore!

### Acessando as rotas do Boletim

- Exibe todos os resultados:
```sh
GET http://localhost:8080/api/boletim
```

- Exibe por ID:
```sh
GET http://localhost:8080/api/boletim/{id}
```

- Exibe nome do aluno, matéria e se passou ou não:
```sh
GET http://localhost:8080/api/boletim/{id}/resultado
```

- Cria novo cadastro:
```sh
POST http://localhost:8080/api/boletim
```
```json
{
	"nome": "Nome",
	"boletim": {
		"matematica": 10,
		"portugues": 10,
		"historia": 10,
		"ingles": 10
	}
}
```

- Altera cadastro:
```sh
PATCH http://localhost:8080/api/boletim/{id}
```
```json
{
   "nome": "Nome"
}
```

- Deleta cadastro:
```sh
DELETE http://localhost:8080/api/boletim/{id}
```

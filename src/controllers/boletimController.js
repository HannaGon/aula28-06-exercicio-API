const boletins = require("../models/boletimModel")
const crypto = require("crypto")

const obterTodos = (request, response) => {
    response.status(200).send(boletins)
}

const obterPorId = (request, response) => {
    const id = request.params.id
    const boletim = boletins.find(boletim => boletim.id == id)
    if (boletim) {
        response.status(200).send(boletim)
    } else {
        response.status(404).send({ mensagem: `Não foi encontrado o boletim de ID ${id}.` })
    }
}

const obterTodosResultado = (request, response) => {
    const requestId = request.params.id
    const boletim = boletins.find(boletim => boletim.id == requestId)
    if (boletim) {
        const boletimResultado = JSON.parse(JSON.stringify(boletim));
        const { id, ...resultado } = boletimResultado;
        Object.entries(resultado.boletim).forEach(([materia, nota]) => {
            resultado.boletim[materia] = nota >= 7 ? "aprovado" : "reprovado";
        })
        response.status(200).send(resultado)
    } else {
        response.status(404).send({ mensagem: `Não foi encontrado o boletim de ID ${requestId}.` })
    }
}

const cadastrar = (request, response) => {
    const { nome, boletim } = request.body
    const boletimModel = { id: crypto.randomUUID(), nome, boletim }
    boletins.push(boletimModel)
    response.status(200).send(boletimModel)
}

const atualizar = (request, response) => {
    const id = request.params.id
    const boletimModel = boletins.find(boletim => boletim.id == id)
    if (boletimModel) {
        Object.keys(boletimModel).forEach(key => {
            if (request.body.hasOwnProperty(key)) {
                if (boletimModel[key] instanceof Object && request.body[key] instanceof Object) {
                    Object.assign(boletimModel[key], request.body[key]);
                } else {
                    boletimModel[key] = request.body[key];
                }
            }
        })
        response.status(200).send(boletimModel)
    } else {
        response.status(404).send({ mensagem: `Não foi encontrado o boletim de ID ${id}.` })
    }
}

const deletar = (request, response) => {
    const id = request.params.id
    const boletimIndex = boletins.findIndex(boletim => boletim.id == id)
    if (boletimIndex >= 0) {
        boletins.splice(boletimIndex, 1)
        response.status(200).send({ message: `O boletim de ID ${id} foi deletado.` })
    } else {
        response.status(404).send({ mensagem: `Não foi encontrado o boletim de ID ${id}.` })
    }
}

module.exports = {
    obterTodos,
    obterPorId,
    obterTodosResultado,
    cadastrar,
    atualizar,
    deletar
}

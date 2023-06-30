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

const obterResultado = (request, response) => {
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

    if (!nome || typeof nome !== "string") {
        return response.status(400).send({ mensagem: "O campo nome é obrigatório e deve ser informado por caracteres." })
    } else if (!boletim || typeof boletim !== "object" || Array.isArray(boletim)) {
        return response.status(400).send({ mensagem: "O campo boletim é obrigatório e deve ser informado pela matéria e sua nota." })
    } else if (!Object.values(boletim).every(nota => typeof nota === "number")) {
        return response.status(400).send({ mensagem: "Todos os valores no boletim devem ser números." })
    }

    const boletimModel = { id: crypto.randomUUID(), nome, boletim }
    boletins.push(boletimModel)
    response.status(201).send(boletimModel)
}

const atualizar = (request, response) => {
    const id = request.params.id
    const { nome, boletim } = request.body

    if (nome && typeof nome !== "string") {
        return response.status(400).send({ mensagem: "O campo nome deve ser informado por caracteres." })
    } else if (boletim && (typeof boletim !== "object" || Array.isArray(boletim))) {
        return response.status(400).send({ mensagem: "O campo boletim deve ser informado pela matéria e sua nota." })
    } else if (boletim && !Object.values(boletim).every(nota => typeof nota === "number")) {
        return response.status(400).send({ mensagem: "Todos os valores no boletim devem ser números." })
    }

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
    obterResultado,
    cadastrar,
    atualizar,
    deletar
}

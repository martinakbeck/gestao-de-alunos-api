export function novaDisciplina() {
    const timestamp = Date.now();

    return {
            nome: "Automação de Testes",
            codigo: `AT ${timestamp}`,
            cargaHoraria: 60

    };
}
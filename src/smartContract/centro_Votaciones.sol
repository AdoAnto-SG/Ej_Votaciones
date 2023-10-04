// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 <0.9.0;

contract centro_Votaciones {
    // Elabore un contrato inteligente que simule un centro de votaciones
    // • Deberá de hacer tanto el contrato inteligente asi como la parte visual, si bien asi queda
    //   a criterio del estudiante el diseño, este deberá de permitir al usuario iniciar sesión con
    //   una wallet y luego añadir su voto, deberá de mostrarle los posibles candidatos y
    //   guardar su elección.
    // • Por último deberá mostrar al final de la votación al ganador, sin mostrar quienes votaron
    //   por el candidato.

    // Contador de candidatos
    uint256 public candidatosCounter = 0;

    // Estructura para almacenar candidatos
    struct Candidato {
        uint id;
        string nombres;
        uint votos; // Contador de votos que el candidato vaya recibiendo
    }

    event NuevoCandidato(uint id, string nombres, uint votos);

    // mapeo para almacenar los candidatos por su ID
    mapping(uint256 => Candidato) public candidatos;

    // Función para agregar un nuevo candidato al sistema
    function agregarCandidato(string memory _nombres) public {
        candidatosCounter++;
        candidatos[candidatosCounter] = Candidato(
            candidatosCounter,
            _nombres,
            0
        );
        emit NuevoCandidato(candidatosCounter, _nombres, 0);
    }

    // Contador de votos
    uint256 public totalVotos = 0;

    // Función para votar por un candidato
    function votar(uint _candidatoId) public {
        // Asegura que la dirección que vota no haya votado previamente
        require(!votantes[msg.sender], "Ya ha votado antes.");
        // Asegura que el candidato sea válido
        require(
            _candidatoId > 0 && _candidatoId <= candidatosCounter,
            unicode"Candidato no válido."
        );

        // Registra el voto
        votantes[msg.sender] = true;
        candidatos[_candidatoId].votos++;
        totalVotos++;

        // Emite el evento de que se ha realizado un voto
        emit VotoRealizado(_candidatoId);
    }

    // Mapeo para rastrear si una dirección ya ha votado
    mapping(address => bool) public votantes;

    // Eventos
    event VotoRealizado(uint candidatoId);
    event GanadorDeterminado(string nombreGanador);

    // Función para determinar el ganador sin cambiar el estado
    function obtenerGanador() public view returns (string memory) {
        // Asegura que al menos un voto haya sido emitido
        require(totalVotos > 0, unicode"Ningún candidato ha recibido votos aún.");

        uint maxVotos = 0;
        uint ganadorId = 0;

        // Itera a través de todos los candidatos para encontrar el que tiene más votos
        for (uint i = 1; i <= candidatosCounter; i++) {
            if (candidatos[i].votos > maxVotos) {
                maxVotos = candidatos[i].votos;
                ganadorId = i;
            }
        }
        return candidatos[ganadorId].nombres;
    }

    // Función para emitir el evento de ganador determinado
    function anunciarGanador() public {
        string memory nombreGanador = obtenerGanador();
        emit GanadorDeterminado(nombreGanador);
    }
}

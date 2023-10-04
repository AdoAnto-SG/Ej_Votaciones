import { useState, useEffect } from 'react';
import './votarForm.css';

export default function VotarForm(props) {
    const { candidatos, contract, account, haVotado, setHaVotado } = props;
    const [candidatoSeleccionado, setCandidatoSeleccionado] = useState("");

    const manejarVoto = async () => {
    if (contract && candidatoSeleccionado) {
        await contract.methods.votar(parseInt(candidatoSeleccionado)).send({ from: account });
        setHaVotado(true);
    }
}


    return (
        <div className='VotacionForm'>
            <h3>Votar:</h3>
            <select value={candidatoSeleccionado} onChange={e => setCandidatoSeleccionado(e.target.value)}>
                <option value="">--Selecciona un candidato--</option>
                {candidatos.map(candidato => (
                    <option key={candidato.id} value={candidato.id}>
                        {candidato.nombres}
                    </option>
                ))}
            </select>
            <button onClick={manejarVoto} disabled={haVotado}>
                {haVotado ? "Usted ya ha votado" : "Votar"}
            </button>
        </div>
    );
}

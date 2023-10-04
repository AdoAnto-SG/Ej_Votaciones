import './CandidatosLista.css';

export default function CandidatosLista(props) {
    const { candidatos } = props;

    return (
        <div className='ListaC'>
            <h3>Candidatos:</h3>
            <ul>
                {candidatos.map(candidato => (
                    <li key={candidato.id}>
                        {candidato.nombres}: {candidato.votos} votos
                    </li>
                ))}
            </ul>
        </div>
    );
}

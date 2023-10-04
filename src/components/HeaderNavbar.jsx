import React from "react";

export default function HeaderNavbar(props) {

    const { conectarWallet, disconnectWallet, isConnected, account, balance } = props;



    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Centro de votaciones
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><button
                                className="btn btn-sm btn btn-outline-light"
                                id="cwalletBtn"
                                onClick={isConnected ? disconnectWallet : conectarWallet}
                            >
                                {isConnected ? 'Desconectar wallet' : 'Conectar wallet'}
                            </button></a>
                        </li>
                    </ul>
                    {account && balance && (
                        <div className="navbar-text" title={`Dirección: ${account} | Balance: ${balance} Eth`}>
                            Dirección: {account.substring(0, 6)}...{account.substring(account.length - 4)} | Balance: {parseFloat(balance).toFixed(2)} Eth
                        </div>
                    )}
                </div>
            </div>
        </nav>


    )
}

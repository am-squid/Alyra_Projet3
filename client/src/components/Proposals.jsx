import { useState } from "react";
import { useEth } from "../contexts/EthContext";

function Proposals({ currentState, proposals }) {
    const [newProposalInput, setNewProposalInput] = useState("");
    const { state: { contract, accounts } } = useEth();

    const handleNewProposalChange = e => {
        setNewProposalInput(e.target.value)
    }

    const registerProposal = async () => {
        await contract.methods.addProposal(newProposalInput).send({ from: accounts[0] });
    }

    let proposalBoard = (
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Description</th>
                        <th>Nombre de vote</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        proposals.map((proposal, index) => {
                            return (<tr key={index}><td>{proposal.id}</td><td>{proposal.description}</td><td>{proposal.voteCount}</td></tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    );

    let voterInput = (
        <div className="voteInput">
            <input type='text' placeholder="Détails de la proposition"
                value={newProposalInput} onChange={handleNewProposalChange} />
            <button onClick={registerProposal}>Ajouter</button>
        </div>
    );

    if(currentState > 1)
    {
        voterInput = (
            <div className="closedItemInformation">
                Les enregistrements sont fermés
            </div>
        );
    }

    return (
        <div className="proposalContainer">
            {proposalBoard}
            {voterInput}
        </div>
    )
}

export default Proposals;
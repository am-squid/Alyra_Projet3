import { useState } from "react";
import { useEth } from "../contexts/EthContext";

function Whitelist({ currentState, voters, checkVoterState}) {
    const [newVoterInput, setNewVoterInput] = useState("");
    const { state: { contract, accounts, isOwner } } = useEth();

    const handleVoterInputChange = e => {
        setNewVoterInput(e.target.value)
    }

    // Adds a voter to the Whitelist if new
    const addToWhitelist = async e => {
        if(voters.includes(newVoterInput)){
            return;
        }
        await contract.methods.addVoter(newVoterInput).send({ from: accounts[0] });
    }

    return(
        <div className="whitelistContainer">
            <div className="voterList">
                <table>
                    <tbody>
                        {
                            voters.map((voter, index) => {
                                return (<tr key={index}><td>{voter}</td></tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
            {isOwner && currentState === 0
                ? <div className="voteInput">
                    <input type='text' placeholder="Ajouter une adresse en tant que voteur"
                        value={newVoterInput} onChange={handleVoterInputChange} />
                    <button onClick={addToWhitelist}>Ajouter à la whitelist</button>
                 </div>
                : ''
            }
            {isOwner && currentState > 0
                ? <div className="closedItemInformation">
                        Les enregistrements sont fermés
                  </div>
                : ''
            }
        </div>
    );
}

export default Whitelist;
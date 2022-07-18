import { useState } from "react";
import { useEth } from "../contexts/EthContext";

function Vote ({votes, alreadyVoted, setVotedState}) {
    const [voteInput, setVoteInput] = useState("");
    const { state: { contract, accounts } } = useEth();

    const handleVoteChange = e => {
        setVoteInput(e.target.value)
    }

    const sendVote = async () => {
        await contract.methods.setVote(voteInput).send({from: accounts[0]});
        setVotedState(true);
    }

    return (
        <div>
            {!alreadyVoted
                ? <div className="voteInput">
                    <input type="text" placeholder="Numéro de la proposition" onChange={handleVoteChange} value={voteInput}/>
                    <button onClick={sendVote}>
                        Valider votre vote
                    </button>
                  </div>
                : ''
            }
            
            <div className="votesContainer">
                <table>
                    <thead>
                        <tr>
                            <td>address</td>
                            <td>proposition</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            votes.map((vote, index) => {
                                return (<tr key={index}><td>{vote.address}</td><td>{vote.proposalId}</td></tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Vote;
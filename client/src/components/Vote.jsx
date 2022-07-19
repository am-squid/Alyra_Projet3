import { useState } from "react";
import { useEth } from "../contexts/EthContext";

function Vote ({votes, alreadyVoted, setVotedState, proposals}) {
    const [voteInput, setVoteInput] = useState(0);
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
                    <select name="proposition" onChange={handleVoteChange}>
                        {
                            proposals.map((proposal, index) => {
                                return(<option value={proposal.id} key={index}>{proposal.description}</option>)
                            })
                        }
                    </select>
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
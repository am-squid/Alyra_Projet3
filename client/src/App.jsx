import { EthProvider, useEth } from "./contexts/EthContext";
import Whitelist from "./components/Whitelist";
import "./App.css";
import Proposals from "./components/Proposals";
import Workflow from "./components/Workflow";
import { useState } from "react";
import Header from "./components/Header";
import AppBtn from "./components/AppBtn";
import useModal from "./components/hook/useModal";
import Modal from "./components/modal";
import EventWatcher from "./components/EventWatcher";
import Vote from "./components/Vote";
import Result from "./components/Result";

function App() {
  const [workflowState, setWorkflowState] = useState(0);
  const [isVoter, setIsVoter] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voterList, setVoterList] = useState([]);
  const [proposalList, setProposalList] = useState([]);
  const [voteList, setVoteList] = useState([]);
  const {isShowing: isVoterListVisible, toggle: toggleVoterList} = useModal();
  const {isShowing: areProposalsVisible, toggle: toggleProposals} = useModal();
  const {isShowing: isVotingVisible, toggle: toggleVoting} = useModal();
  const {isShowing: isResultVisible, toggle: toggleResult} = useModal();
 
  const addNewVoter = (voter) => {
    if (voterList.indexOf(voter) > -1) {
      return;
    }
    // Adding the new voter to the list
    let tempList = voterList;
    voterList.push(voter);
    setVoterList(tempList);
  }

  const calcIfVoter = (userAddress, newAdress) => {
    if(!isVoter)
    {
      setIsVoter(userAddress === newAdress);
    }
  }

  const addProposalToList = (proposal) => {
    // Checking if the proposal is new before storing it
    let isNew = true;
    proposalList.map((storedProposal) => {
      if(proposal.id === storedProposal.id) {
        isNew = false;
      }
    });
    // The proposal is a new one, we store it
    if(isNew) {
      let tempList = proposalList;
      tempList.push(proposal);
      setProposalList(tempList);
    }
  }

  const addVoteToList = (vote, liveCount) => {
    // Checking if the vote is new before storing it
    let isNew = true;
    voteList.map((storedVote) => {
      if(vote.address === storedVote.address) {
        isNew = false;
      }
    });
    // If the vote is a new one, we store it
    if(!isNew){
      return;
    }
    let tempList = voteList;
    tempList.push(vote);
    setVoteList(tempList);
    // Updating the voteCount for the proposal if live counting is activated
    if(!liveCount){
      return;
    }
    tempList = proposalList;
    tempList[vote.proposalId].voteCount++;
    setProposalList(proposalList);
  }

  return (
    <EthProvider>
      <EventWatcher 
        currentState={workflowState}
        changeState={setWorkflowState}
        addVoter={addNewVoter}
        addToProposalList={addProposalToList}
        addToVoteList={addVoteToList}
        voters={voterList}
        setVoterStatus={setIsVoter}
        votes={voteList}
        setVotedStatus={setHasVoted}
      />
      <div id="App" >
        <div className="container">
          <Header isVoter={isVoter} voters={voterList} setVoterStatus={setIsVoter}/>
          <Workflow currentState={workflowState}/>
          <div className="btnWrapper">
            <AppBtn type="voters" show={toggleVoterList} currentState={workflowState} isVoter={isVoter}/>
            <AppBtn type="proposals" show={toggleProposals} currentState={workflowState} isVoter={isVoter}/>
            <AppBtn type="voting" show={toggleVoting} currentState={workflowState} isVoter={isVoter}/>
            <AppBtn type="result" show={toggleResult} currentState={workflowState} isVoter={isVoter}/>

            <Modal isShowing={isVoterListVisible} hide={toggleVoterList} title="Liste des votants">
              <Whitelist currentState={workflowState} voters={voterList} checkVoterState={calcIfVoter}/>
            </Modal>
            <Modal isShowing={areProposalsVisible} hide={toggleProposals} title="Liste des propositions">
              <Proposals currentState={workflowState} proposals={proposalList}/>
            </Modal>
            <Modal isShowing={isVotingVisible} hide={toggleVoting} title="Voter">
              <Vote votes={voteList} alreadyVoted={hasVoted} setVotedState={setHasVoted}/>
            </Modal>
            <Modal isShowing={isResultVisible} hide={toggleResult} title="Resultat">
              <Result currentState={workflowState} proposals={proposalList} />
            </Modal>
          </div>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

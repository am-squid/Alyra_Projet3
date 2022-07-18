import { IoIdCard, IoReceipt, IoFileTray, IoTrophy } from "react-icons/io5";

function AppBtn ({type, show, currentState, isVoter}) {

    const getText = () => {
        let text = "";
        switch(type) {
            case "voters":
                text="Liste des votants";
                return text;
            case "proposals": 
                if(currentState < 1) {
                    text="Les propositions ne sont pas disponibles";
                    return text;
                }
                if (!isVoter) {
                    text="Vous n'êtes pas autorisé à voir les propositions";
                    return text;
                }
                text="Liste des propositions";
                return text;
            case "voting": 
                if(currentState != 3) {
                    text="Les votes ne sont pas ouverts";
                    return text;
                }
                if (!isVoter) {
                    text="Vous n'êtes pas autorisé à voir les votes";
                    return text;
                }
                text="Voter";
                return text;
            case "result":
                if(currentState != 5) {
                    return "Les résultats ne sont pas encore disponibles";
                }
                if (!isVoter) {
                    text="Vous n'êtes pas autorisé à voir le résultat";
                    return text;
                }
                text="Voir la proposition gagnante";
                return text;
            default: break;
        }
    }

    const toggleVisibility = () => {
        if(type === "proposals" && (currentState < 1 || !isVoter)){
            return;
        }
        if(type === "voting" && (currentState != 3 || !isVoter)) {
            return;
        }
        if(type === "result" && (currentState != 5 || !isVoter )) {
            return;
        }
        show();
    }

    const getIcon = () => {
        if(type === "voters"){
            return (<IoIdCard />);
        }
        if(type === "proposals"){
            return (<IoReceipt />);
        }
        if(type === "voting"){
            return (<IoFileTray />);
        }
        if(type === "result"){
            return (<IoTrophy />)
        }
    }

    let className = "appBtn enabled";
    if(currentState < 1 && type === "proposals") {
        className = "appBtn disabled";
    }

    if(currentState != 3 && type === "voting") {
        className = "appBtn disabled";
    }

    if(currentState != 5 && type === "result") {
        className = "appBtn disabled";
    }

    return(
        <div className={className} onClick={toggleVisibility}>
            <div className="btnImg">{getIcon()}</div>
            <div className="btnText">{getText()}</div>
        </div>
    );
}

export default AppBtn;
import { IoIdCard, IoReceipt, IoFileTray, IoTrophy } from "react-icons/io5";

function AppBtn ({type, show, currentState}) {

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
                text="Liste des propositions";
                return text;
            case "voting": 
                if(currentState != 3) {
                    text="Les votes ne sont pas ouverts";
                    return text;
                }
                text="Voter";
                return text;
            case "result":
                if(currentState != 5) {
                    return "Les résultats ne sont pas encore disponibles";
                }
                text="Voir la proposition gagnante";
                return text;
            default: break;
        }
    }

    const toggleVisibility = () => {
        if(currentState < 1 && type === "proposals") {
            return;
        }
        if(currentState != 3 && type === "voting") {
            return;
        }
        if(currentState != 5 && type === "result") {
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

    let className = "appBtn";
    if(currentState < 1 && type === "proposals") {
        className += " disabled";
    }

    if(currentState != 3 && type === "voting") {
        className += " disabled";
    }

    if(currentState != 5 && type === "result") {
        className += " disabled";
    }

    return(
        <div className={className} onClick={toggleVisibility}>
            <div className="btnImg">{getIcon()}</div>
            <div className="btnText">{getText()}</div>
        </div>
    );
}

export default AppBtn;
import "./Adventure-1.css"
import Header from "../../components/Header/Header";
import AdventureCard from "./components/AdventureCard/AdventureCard";

const Adventure1 = () => {
    return (
        <div className={"adventure-1__background-container"}>
            <Header />
            <div>
                <h1>
                    Pars a l'Aventure
                </h1>
                <h3>
                    Choisit un monde pour jouer
                </h3>
            </div>
            <div className={"adventure-1__grid-container"}>
                <div className={"adventure-1__grid-item"}>
                    <AdventureCard
                        image={"img1"}
                        label={"Arithmetiques"}
                        onNoteClick={() => window.location.href="/note-de-cours/arithmetiques"}
                        onPlayClick={() => window.location.href="/aventure/arithmetiques"}
                    />
                </div>
                <div className={"adventure-1__grid-item"}>
                    <AdventureCard
                        image={"img2"}
                        label={"Algebre"}
                        onNoteClick={() => window.location.href="/note-de-cours/algebre"}
                        onPlayClick={() => window.location.href="/aventure/algebre"}
                    />
                </div>
                <div className={"adventure-1__grid-item"}>
                    <AdventureCard
                        image={"img3"}
                        label={"Geometrie"}
                        onNoteClick={() => window.location.href="/note-de-cours/geometrie"}
                        onPlayClick={() => window.location.href="/aventure/geometrie"}
                    />
                </div>
                <div className={"adventure-1__grid-item"}>
                    <AdventureCard
                        image={"img4"}
                        label={"Statistiques"}
                        onNoteClick={() => window.location.href="/note-de-cours/statistiques"}
                        onPlayClick={() => window.location.href="/aventure/statistiques"}
                    />
                </div>
                <div className={"adventure-1__grid-item"}>
                    <AdventureCard
                        image={"img5"}
                        label={"Probabilitees"}
                        onNoteClick={() => window.location.href="/note-de-cours/probabilitees"}
                        onPlayClick={() => window.location.href="/aventure/probabilitees"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Adventure1
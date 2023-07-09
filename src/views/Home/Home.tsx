import "./Home.css"
import Header from "../../components/Header/Header";
import AboutUs from "./components/AboutUs/AboutUs";
import SquareButton from "../../components/SquareButton/SquareButton";

const Home = () => {

    return (
        <div>
            <div className={"background-container"}>
                <Header />
                <div className={"grid-container"}>
                    <div className="grid-item primary-text" style={{minHeight:"120px"}}>
                        Pars a l'aventure! beuhe
                    </div>
                    <div className="grid-item card-btn">
                        <SquareButton
                            onClick={() => window.location.href = "/aventure"}
                            label={"Aventure"}
                        />
                    </div>
                    <div className="grid-item card-btn">
                        <SquareButton
                            onClick={() => window.location.href = "/note-de-cours"}
                            label={"Note de cours"}
                        />
                    </div>
                    <div className="grid-item card-btn">
                        <SquareButton
                            onClick={() => window.location.href = "/etude"}
                            label={"Etude"}
                        />
                    </div>
                    <div className="grid-item card-btn">
                        <SquareButton
                            onClick={() => window.location.href = "/tutorat"}
                            label={"Tutorat"}
                        />
                    </div>
                </div>
            </div>
            <AboutUs />
        </div>
    )
}

export default Home
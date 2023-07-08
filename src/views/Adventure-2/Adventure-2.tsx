import Header from "../../components/Header/Header";
import {useContext, useEffect, useState} from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Scroller from "../../components/Scroller/Scroller";
import MissionButton from "./components/MissionButton/MissionButton";
import Spline from "@splinetool/react-spline";
import "./adventure-2.css"
import {NoteLabels_Sec1} from "../../helper/constants/NoteLabelsSec-1";
import {useNavigate} from "react-router-dom";

const Adventure2 = () => {
    const [missions, setMissions] = useState<string[]>([])
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    useEffect(() =>{
        const url = window.location.href;
        const startIndex = url.indexOf("aventure") + "aventure".length + 1;
        const adventureCategory = url.substring(startIndex).split("/")[0];
        setCategory(adventureCategory)

        // get numbers of mission from constant for adventureCategory to avoid api call
        // get adventureCategory name from same constant, use it raw for now
        const numberOfMissions = 10;
        setMissions((): string[] => {
            const newMissions = [];
            for (let i=0; i<numberOfMissions; i++) {
                if (i < 10) {
                    newMissions.push(`Mission 0${i}`)
                } else {
                    newMissions.push(`Mission ${i}`)
                }
            }
            return newMissions
        })
    }, [])

    return (
        <div className={"adventure-2__background-container"}>
            <Header />
            <div>
                <h1>
                    Pars a l'Aventure
                </h1>
                <h3>
                    Selectionne une mission pour jouer
                </h3>
                <div className={"adventure-2__grid-container"}>
                    <div className={"adventure-2__grid-item scroll-box"}>
                        <h2 style={{padding: "15px"}}>{category}</h2>
                        <ProgressBar percentage={20} />
                        <div className="scroller-container">
                            <Scroller x_direction={false}>
                                {missions.map((mission, index) => (
                                    <MissionButton label={mission} key={index} onClick={(() => navigate(`/question/${101}`))}/>
                                ))}
                            </Scroller>
                        </div>
                    </div>
                    <div className={"adventure-2__grid-item"}>
                        <Spline scene="https://prod.spline.design/fox5ndgPessWXJ1k/scene.splinecode"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adventure2
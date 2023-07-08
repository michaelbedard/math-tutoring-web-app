import {ReactNode} from "react"
import "./Scroller.css"

type ScrollerProps = {
    children : ReactNode,
    x_direction: boolean
}

const Scroller = ({ children, x_direction }: ScrollerProps) => {
    return (
        <div className={x_direction ? "scroller--x" : "scroller--y"} >
            {children}
        </div>
    )
}

export default Scroller
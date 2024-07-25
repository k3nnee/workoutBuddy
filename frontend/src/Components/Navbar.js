import {Link} from "react-router-dom";

const linkStyle = {
    "color" : "black",
    "textDecoration" : "none"
}

const divStyle = {
    "background" : "white",
    "fontWeight" :"bold",
    "paddingLeft" : "7.5%"
}

const Navbar = () => {
    return <header>
        <div className = "container-fluid p-0">
            <Link to = "/" style = {linkStyle}>
                <h3 className = "pt-3 pb-3" style = {divStyle}> Workout Buddy</h3>
            </Link>
        </div>
    </header>
}

export default Navbar;
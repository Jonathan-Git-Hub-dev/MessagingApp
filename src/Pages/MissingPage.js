import { useNavigate } from "react-router";
import logo from '../Images/icon.jpeg';
import '../Css/MissingPage.css';

/*
    page to direct user on wrong urls to the landing page
*/

export default function MissingPage()
{
    function home()
    {
        navigate("/");
    }

    let navigate = useNavigate();

    return (
        <div className="missingPageFrame">
                <br />
                <img className="missingPageImage" src={logo} alt="icon"></img>
                <p>Could not find the requested page, click bellow to be taken to the home page</p>
                <button className="missingPageButton" onClick={home}>Home Page</button>
                
        </div>
    );
}
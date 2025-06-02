import { useNavigate } from "react-router";
import "../Css/SearchResultOld.css";

/*
    user who matches search term but already has realtionship with user so no iteraction buttons
*/

export default function SearchResultOld(props)
{
    let navigate = useNavigate();

    return (
        <div className="searchResultOldFrame">
            <p className="searchResultOldName">{props.name}</p>
        </div>
    );
}
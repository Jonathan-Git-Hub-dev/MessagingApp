import { useNavigate } from "react-router";

export default function LandingPage()
{
    let navigate = useNavigate();

    return (
        <div>
            <button 
                onClick = {() => {
                    console.log("b1");
                    navigate("/login");
                }}
            >
                Login
            </button>
            <button 
                onClick = {() => {
                    console.log("b1");
                    navigate("/create");
                }}
            >
                Create
            </button>
        </div>
    );
}
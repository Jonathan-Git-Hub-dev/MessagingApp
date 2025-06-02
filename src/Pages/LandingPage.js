import { useNavigate } from "react-router";
import '../Css/LandingPage.css';
import logo from '../Images/icon.jpeg';
import { useEffect, useState } from 'react';
import display1 from '../Images/display1.jpg';
import display2 from '../Images/display2.jpg';
import display3 from '../Images/display3.jpg';

export default function LandingPage()
{

    const imageArray = [
        [display1, "Instantly connect with friends"],
        [display2, "Use anywhere over WIFI"],
        [display3, "No personal data needed to create an account"]
    ];

    const [index, setIndex] = useState(0);


    useEffect(()=>{//use effect on load to basically redo login
        let intervalId;

        intervalId = setInterval(() => {
            setIndex(prev => {
                if(prev == imageArray.length-1)
                {
                    return 0;
                }
                else
                {
                    return prev+1;
                }
            });
        }, 10000)

        return () => {
            console.log("finishing");
            clearInterval(intervalId);
          };
    },[]);

    function login()
    {
        navigate("/login");
    }

    function create()
    {
        navigate("/create");
    }

    let navigate = useNavigate();

    return (
        <div className="landingPageFrame">
            <div
                className="landingPageHeading"
            >
                <img className="landingPageIcon" src={logo} alt="icon"></img>
                <button
                    className="landingPageButton"
                    onClick={login}
                >
                    Login
                </button>
                <button 
                    id="landingPageButtonCreate"
                    className="landingPageButton"
                    onClick={create}         
                >
                    Create
                </button>
                
            </div>
            <div className="landingPageHoldImg">
                <p className="landingPageText">{imageArray[index][1]}</p>
                <div className="landingPageHoldImg2">
                {imageArray.map((img)=>{
                    return (
                    <img 
                        key={img[0]}
                        src={img[0]}
                        className="landingPageImage"
                        style={{translate: `${-100 * index}%`}}
                    />
                    );
                })}
                </div>
            </div>

        </div>
    );
}
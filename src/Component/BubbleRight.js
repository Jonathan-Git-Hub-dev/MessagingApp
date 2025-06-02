import "../Css/BubbleRight.css";

/*
    test from active user
*/

export default function BubbleRight(props)
{
    return (
        <div className="butbbleRightFrame">
            <div className="bubbleRightTime">{props.time}</div>
            <div className="bubbleRightContent">
                {props.content}
            </div>
        </div>
    );
}
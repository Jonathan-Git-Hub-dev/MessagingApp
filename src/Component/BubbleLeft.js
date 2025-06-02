import "../Css/BubbleLeft.css";

/*
    test from the other user
*/

export default function BubbleLeft(props)
{ 
    return (
        <div className="bubbleLeftFrame">
            <div className="bubbleLeftData">
                <div className="bubbleLeftTime">{props.time}</div>
                {props.seen == 0 ? <div className="bubbleLeftSeen" >New</div> : <></>}
            </div>
            <div className="bubbleLeftContent">
                {props.content}
            </div>
        </div>
    );
}
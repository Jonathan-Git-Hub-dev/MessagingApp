export default function BubbleLeft(props)
{ 
    return (
        <div>
            <div className="float-left bg-orange-300 w-80">
                {props.content}
            </div>
            <br />
        </div>
    );
}//what if one user add while another declines
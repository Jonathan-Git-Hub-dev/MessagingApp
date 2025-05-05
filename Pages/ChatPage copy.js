import { useNavigate, useParams } from "react-router";
import $ from 'jquery';
import { useEffect, useState } from 'react';

export default function ChatPage()
{
  let navigate = useNavigate();
  let { friend } = useParams();
  const [dis, setDis] = useState('');
  
    useEffect(()=>{
        setDis(friend);
        //console.log()
        //console.log(friend)
        //if no pass leave

        //autenticate user and friend
            //if all g keep goinf

            //else straigt to landing page
    },[]);

  return (
    <div>
        <p>this is where will will put passed name {dis}</p>
        <h2>Under here is a scroll div</h2>
        <div
            className="w-96 h-96 overflow-auto outline border-orange-700"
            onScroll={(e) => {
                //console.log(e.target.scrollTop + " size of element " + e.target. );
                        const { scrollTop, scrollHeight, clientHeight } = e.target;
                        if (Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1) {
                        // User has reached the bottom of the div
                        console.log('Reached bottom!');
                        }
            }}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel pharetra risus. Sed tempor lorem tortor, porta tincidunt neque porttitor quis. Praesent porttitor ligula id molestie elementum. Pellentesque lacinia libero a varius tempus. Quisque vitae mauris libero. Donec egestas facilisis magna eget laoreet. Vivamus ac sem et erat rhoncus tempor sed vel lorem. Sed imperdiet posuere dui, eu placerat tellus dignissim eget. Ut interdum pretium malesuada. Proin ut egestas nibh. Vestibulum cursus elementum urna, ut luctus nunc tincidunt id. Proin in nibh aliquam, scelerisque felis sed, dictum turpis.
            Aenean auctor odio vitae risus viverra maximus. Donec molestie nisl vitae blandit vulputate. Nullam imperdiet molestie enim, quis vehicula diam euismod in. Nunc congue ex a nunc finibus, vel consequat enim blandit. Quisque ultrices, enim non facilisis vehicula, ex felis vulputate elit, quis semper dui tellus malesuada ante. Nam laoreet sapien sed nulla euismod sodales. Proin in dictum eros, nec condimentum neque. Nunc volutpat eros eget nunc lacinia, eu scelerisque nisi facilisis. Phasellus nec ligula est. Nulla non commodo purus. Praesent eu diam neque. Sed erat orci, bibendum in lacus vel, faucibus hendrerit est. Mauris feugiat mauris efficitur commodo consequat. Proin pretium vitae erat sed efficitur.
            Duis dolor nisl, cursus id pellentesque sit amet, ullamcorper vitae enim. Maecenas tincidunt congue diam congue porta. In elementum fermentum arcu non volutpat. Praesent semper sed arcu eu vehicula. Curabitur nec interdum neque, sed suscipit massa. Morbi nec eleifend nisl. Pellentesque et pulvinar urna. Donec vestibulum massa a hendrerit venenatis. Ut rhoncus neque sed tellus tempor varius. Praesent eu convallis turpis.
            Proin sagittis justo velit, ac elementum nunc luctus ac. Nullam iaculis vulputate dui. Etiam accumsan cursus urna vitae eleifend. Sed ex velit, molestie eu eros sit amet, consectetur fringilla magna. Suspendisse luctus gravida sollicitudin. Mauris ante justo, cursus eget volutpat vel, mattis nec est. Phasellus sem lacus, laoreet a ultricies id, fermentum ac quam. Pellentesque ac metus eget libero hendrerit imperdiet id sed est.
            Pellentesque sagittis auctor nulla, et aliquet risus gravida sed. Donec eu ligula est. Nam sodales tortor in sollicitudin varius. Fusce nisl est, malesuada eu nibh eget, dignissim efficitur odio. Ut condimentum a sapien nec interdum. Mauris ante metus, aliquam at sodales sit amet, pharetra eget lectus. Nulla quam purus, posuere ac tempor vitae, commodo non nisl. Nulla sit amet augue at nulla vehicula efficitur. Duis vestibulum diam et odio consequat, non efficitur ipsum malesuada. Quisque eu efficitur est. Pellentesque pharetra ac mi sit amet bibendum.
        </div>
        <br />
        <br />
        <br />
        <br />
    </div>
  );
}

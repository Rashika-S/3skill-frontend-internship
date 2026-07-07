import { useNavigate } from "react-router-dom";
import { FaUsers, FaPlay } from "react-icons/fa";

function Lobby() {

const navigate = useNavigate();

const players=[
"Rashika",
"Avantika",
"Katappa",
"Devasena"
];

return(

<main className="min-h-screen bg-linear-to-b from-black via-[#2B0A0A] to-black flex items-center justify-center">

<div className="bg-[#1B1B1B] p-10 rounded-2xl border border-yellow-500 w-\[600px]\">

<h1 className="text-4xl text-yellow-400 text-center mb-8"
style={{fontFamily:"Cinzel"}}
>
Royal Lobby
</h1>

<p className="text-center mb-8">
Royal Code
</p>

<div className="text-center text-3xl text-yellow-400 tracking-[10px] mb-10">
MAHI123
</div>

<div className="space-y-4">

{players.map((player,index)=>(

<div
key={index}
className="bg-[#262626] rounded-xl p-4 flex items-center gap-4"
>

<FaUsers/>

{player}

</div>

))}

</div>

<button

onClick={()=>navigate("/quiz")}

className="w-full mt-10 bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 flex justify-center gap-3 items-center"

>

<FaPlay/>

Start Quiz

</button>

</div>

</main>

);

}

export default Lobby;
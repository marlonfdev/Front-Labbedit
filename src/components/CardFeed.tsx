import Up from "../assets/arrowup.svg";
import Down from "../assets/arrowdown.svg";
import Comments from "../assets/comments.svg";
import { useState } from "react";
import { goToComments } from "../routes/Coordinator";
import { useNavigate } from "react-router-dom";

interface CardFeedProps {
   text: any;
}

const CardFeed: React.FC<CardFeedProps> = ({ text }) => {
   const navigate = useNavigate();

   const [likes, setLikes] = useState(0);
   const [comments] = useState<string[]>([]);
   const [liked, setLiked] = useState(false);

   return (
      <>
         <section className='container break-words mt-11 mb-[-2rem] w-[20rem] px-2.5 py-2 h-auto bg-neutral-50 rounded-xl border border-neutral-200 flex-col justify-start items-start gap-4 inline-flex'>
            <h3 className='text-neutral-500 text-xs font-normal'>Enviado por: labaluno12</h3>
            <p className='w-72 h-auto text-black text-lg font-normal'>{text?.content}</p>
            <div className='mt-16 flex'>
               <img
                  className='cursor-pointer'
                  src={Up}
                  alt='Botão de curtir'
                  onClick={() => {
                     if (!liked) {
                        setLiked(true);
                        setLikes(likes + 1);
                     }
                  }}
               />
               <span className='text-center text-neutral-500 text-xs font-bold ml-2 mr-2'>
                  {likes}
               </span>
               <img
                  className='cursor-pointer'
                  src={Down}
                  alt='Botão de discurtir'
                  onClick={() => {
                     if (likes > 0) {
                        setLiked(false);
                        setLikes(likes - 1);
                     }
                  }}
               />
               <img
                  className='ml-7 cursor-pointer'
                  src={Comments}
                  alt='Botão de comentário'
                  onClick={() => goToComments(navigate, text.id)}
               />
               <span className='text-center text-neutral-500 text-xs font-bold ml-2'>
                  {comments.length}
               </span>
            </div>
         </section>
      </>
   );
};

export default CardFeed;

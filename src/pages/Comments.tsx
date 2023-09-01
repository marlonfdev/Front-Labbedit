import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CardFeed from "../components/CardFeed";
import { goToFeed } from "../routes/Coordinator";
import { useEffect, useState } from "react";
import axios from "axios";

const Comments = () => {
   const navigate = useNavigate();
   const [posts, setPosts] = useState<Array[]>([]);
   const [comment, setComment] = useState("");

   const params = useParams();

   const getPosts = async () => {
      try {
         const token = localStorage.getItem("token");
         const response = await axios.get("http://localhost:3003/posts/", {
            headers: {
               Authorization: token,
            },
         });
         setPosts(response.data);
      } catch (error) {
         /* empty */
      }
   };

   const post = posts.find((post) => post.id === params.id);

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <>
         <Header />
         <button
            className='mt-[-2.3rem] mr-[17rem] text-blue-500 text-lg font-medium'
            onClick={() => goToFeed(navigate)}
         >
            Voltar
         </button>
         <form>
            <div className='mt-1 flex flex-col'>
               <CardFeed text={post} />
               <input
                  className='w-80 h-32 bg-gray-200 rounded-xl mt-12 text-neutral-500 text-lg font-normal px-4 pb-14 self-center'
                  type='text'
                  placeholder='Escreva um comentário...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
               />
               <button
                  className='mt-3 w-80 h-12 px-[7.5rem] py-2 bg-gradient-to-r from-rose-400 to-amber-300 rounded-xl self-center inline-flex text-white text-lg font-bold'
                  type='submit'
               >
                  Responder
               </button>
               <div className='mt-4 m-auto w-80 h-px border border-rose-400'></div>
            </div>
         </form>
      </>
   );
};

export default Comments;

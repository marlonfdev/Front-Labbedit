import Header from "../components/Header";
import CardFeed from "../components/CardFeed";
import { useState, useEffect } from "react";
import axios from "axios";
import useProtectedPage from "../routes/ProtectRouter";

const Feed = () => {
   useProtectedPage();

   const [posts, setPosts] = useState([]);
   const [newPost, setNewPost] = useState("");

   const getPosts = async () => {
      try {
         const token = localStorage.getItem("token");
         const response = await axios.get("http://localhost:3003/posts/", {
            headers: {
               Authorization: token,
            },
         });
         setPosts(response.data);
      } catch (error) { /* empty */ }
   };

   const newPosts = async () => {
      try {
         const body = {
            content: newPost,
         };
         const token = localStorage.getItem("token");
         const response = await axios.post("http://localhost:3003/posts/", body, {
            headers: {
               Authorization: token,
            },
         });
         setNewPost("");
         getPosts();
      } catch (error) { /* empty */ }
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <>
         <Header />
         <section>
            <form
               className='container flex flex-col text-center justify-center'
               onSubmit={getPosts}
            >
               <input
                  className='w-80 h-32 bg-gray-200 rounded-xl mt-10 text-neutral-500 text-lg font-normal px-4 pb-14 self-center'
                  type='text'
                  placeholder='Escreva seu post...'
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
               />
               <button
                  className='mt-3 w-80 h-12 px-[8.5rem] py-2 bg-gradient-to-r from-rose-400 to-amber-300 rounded-xl self-center inline-flex text-white text-lg font-bold'
                  type='submit'
                  onClick={() => {
                     if (newPost.trim() !== "") {
                        newPosts();
                     }
                  }}
               >
                  Postar
               </button>
            </form>
            <div className='mt-8 m-auto w-80 h-px border border-rose-400'></div>
         </section>
         <section className="flex flex-col">
            {posts
               .slice()
               .reverse()
               .map((post, index) => {
                  return <CardFeed text={post} key={index} />;
               })}
         </section>
      </>
   );
};

export default Feed;

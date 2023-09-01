import axios from "axios";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed } from "../routes/Coordinator";

const Register = () => {
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [checkbox, setCheckbox] = useState("");
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleCreateAccount = async (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();

      const body = {
         name,
         email,
         password,
      };

      try {
         const response = await axios.post("http://localhost:3003/users/signup", body);
         localStorage.setItem("token", response.data.token);
         goToFeed(navigate);
      } catch (error) {
         setError("Usuário(a) já cadastrado(a)");
      }
   };

   return (
      <>
         <Header />
         <section className='relative flex flex-col justify-center items-center'>
            <p className='w-80 text-neutral-700 text-3xl font-bold mt-10 text-start ml-6'>
               Olá, boas vindas ao LabEddit
            </p>
            <form
               className='container flex flex-col items-center justify-center mt-12'
               onSubmit={handleCreateAccount}
            >
               <input
                  className='p-4 w-80 h-14 bg-white rounded border border-gray-300'
                  type='text'
                  placeholder='Nome'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <input
                  className='p-4 w-80 h-14 bg-white rounded border border-gray-300 mt-2'
                  type='email'
                  placeholder='E-mail'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  className='p-4 w-80 h-14 bg-white rounded border border-gray-300 mt-2'
                  type={showPassword ? "text" : "password"}
                  placeholder='Senha'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               {error && <p className='text-red-500 mt-2 self-center'>{error}</p>}

               <p className='w-80 mt-8 text-start ml-6'>
                  <span className='text-black text-sm font-normal'>
                     Ao continuar, você concorda com o nosso
                  </span>
                  <a href='#' className='text-blue-500 text-sm font-medium'>
                     {" "}
                     Contrato de usuário
                  </a>
                  <span className='text-black text-sm font-normal'> e nossa</span>
                  <a href='#' className='text-blue-500 text-sm font-medium'>
                     {" "}
                     Política de Privacidade
                  </a>
               </p>
               <div className='container flex'>
                  <input
                     className='rounded-sm border border-stone-300'
                     type='checkbox'
                     required
                     value={checkbox}
                     onChange={(e) => setCheckbox(e.target.value)}
                  />
                  <p className='w-80 text-black text-sm font-normal text-start ml-3 mt-4'>
                     Eu concordo em receber emails sobre coisas legais no Labeddit
                  </p>
               </div>
               <button
                  className='w-80 h-12 px-32 py-3 bg-gradient-to-r from-rose-400 to-amber-300 rounded-3xl justify-center items-center gap-10 inline-flex text-center text-white text-lg font-bold mt-7'
                  type='submit'
               >
                  Cadastrar
               </button>
            </form>
            <button
               className='absolute right-7 mt-20 opacity-40'
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='12'
                     height='12'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <line x1='1' y1='1' x2='23' y2='23' />
                     <line x1='23' y1='1' x2='1' y2='23' />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='20'
                     height='20'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     <circle cx='12' cy='12' r='3' />
                     <path d='M17.6 17.6L12 12' />
                     <path d='M12 2a10 10 0 0 1 10 10' />
                  </svg>
               )}
            </button>
         </section>
      </>
   );
};

export default Register;

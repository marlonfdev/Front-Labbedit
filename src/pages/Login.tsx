import Logo from "../assets/logo.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToRegister, goToFeed } from "../routes/Coordinator";

const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   const handleLogin = async (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();

      const body = {
         email: email,
         password: password,
      };

      try {
         const response = await axios.post("http://localhost:3003/users/login", body);
         localStorage.setItem("token", response.data.token);
         goToFeed(navigate);
      } catch (error) {
         setError("Usuário(a) ou senha incorreta.");
      }
   };

   return (
      <section className='container relative flex flex-col justify-center items-center w-80 mt-10'>
         <img className='w-20 h-20 self-center' src={Logo} alt='Logotipo da Labenu' />
         <h1 className='text-neutral-700 text-4xl font-bold mt-4'>LabEddit</h1>
         <p>O projeto de rede social da Labenu</p>
         <form className='flex flex-col self-center mt-20' onSubmit={handleLogin}>
            <input
               className='border border-gray-300 rounded p-4 opacity-80 text-zinc-700 font-normal w-80 h-14'
               type='email'
               placeholder='E-mail'
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               className='border border-gray-300 rounded p-4 opacity-80 text-zinc-700 font-normal w-80 h-14 mt-2'
               type={showPassword ? "text" : "password"}
               placeholder='Senha'
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 mt-1 self-center'>{error}</p>}

            <button
               className='self-center mt-14 w-80 h-12 px-32 py-3 bg-gradient-to-r from-rose-400 to-amber-300 rounded-3xl justify-center items-center gap-10 inline-flex text-center text-white text-lg font-bold'
               type='submit'
            >
               Login
            </button>
            <div className='mt-5 m-auto w-80 h-px border border-rose-400' ></div>
            <button
               className='self-center mt-5 w-80 h-12 px-32 py-3 rounded-3xl border border-orange-500 justify-center items-center gap-10 inline-flex text-center text-orange-500 text-lg font-bold whitespace-nowrap'
               type='submit'
               onClick={() => goToRegister(navigate)}
            >
               Crie uma conta!
            </button>
         </form>
         <button
            className='absolute right-4 mt-28 opacity-40'
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
   );
};

export default Login;

import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../routes/Coordinator";

const Header = () => {
   const navigate = useNavigate();

   return (
      <header className='container w-96 h-12 bg-gray-200 flex justify-evenly m-auto'>
         <img className='w-7 h-7 self-center ml-[8rem]' src={Logo} alt='Logotipo da Labenu' />
         <button
            className='text-center text-blue-500 text-lg font-semibold ml-16'
            type='submit'
            onClick={() => (localStorage.removeItem("token"), goToLogin(navigate))}
         >
            Sair
         </button>
      </header>
   );
};

export default Header;

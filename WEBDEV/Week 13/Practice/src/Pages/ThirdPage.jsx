import Logo from "../Components/logo";
import Otp from "../Components/Otp";

const ThirdPage=()=>{
    return <div className="select-none bg-blue-800 h-screen flex justify-center items-center">
        <div>
            <div>
                <Logo/>
            </div>
            <div className="text-white text-2xl font-medium mt-10">
                Check Email For Code
            </div>
            <div className="mt-10 -ml-12">
                <Otp></Otp>
            </div>
            <button className="bg-green-800 w-44 text-white font-medium h-10 rounded-xl mt-10 ml-8">Verify</button>
        </div>
    </div>

}

export default ThirdPage;
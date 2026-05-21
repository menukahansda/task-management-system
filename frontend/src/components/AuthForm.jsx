import Register from "../pages/Register";
import Login from "../pages/Login";

function AuthForm({type, setType}){
    return(
        <>
        {type === "login" ? <Login setType={setType} /> : <Register setType={setType} />}
        </>
    );
}

export default AuthForm;



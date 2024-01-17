import Logo from "./TopBar/Logo";
import Profile from "./TopBar/Profile";
import Search from "./TopBar/Search";
import "./TopBar/topbar.css";



function TopBar({user, setUser, isLoading}) {


    
    
    return (
        <div className="top-bar">
            <div className="top-bar-left"><Search /></div>
            <Logo />
            <div className="top-bar-right"><Profile user={user} setUser={setUser} isLoading={isLoading}/></div>
        </div>
    );
}

export default TopBar
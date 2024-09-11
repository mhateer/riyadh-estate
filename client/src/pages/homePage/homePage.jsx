import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';

function HomePage() {
    const {currentUser} = useContext(AuthContext);
    
  return (
    <div className='homePage'>
    <div className="textContainer">
        <div className="wrapper">
            <h1 className='title'>
                Find your dream home in Riyadh
            </h1>
            <p>
                Welcome to the <b>Riyadh Estate</b> where you can find your dream place
                to live in Riyadh at the best rate which suits you. All the listing on 
                <b> Riyadh Estate</b> are verified by Riyadh Estate Agents before posting
                on this Website. Your money is 100% secured by Riyadh Estate. So choose 
                your dream place and get it without worring about payment issues.
            </p>
            <SearchBar />
            <div className="boxes">
                <div className="box">
                    <h1>5+</h1>
                    <h2>Years of experience</h2>
                </div>
                <div className="box">
                    <h1>200+</h1>
                    <h2>Landlords</h2>
                </div>
                <div className="box">
                    <h1>5000+</h1>
                    <h2>Property Listed</h2>
                </div>
            </div>
        </div>
    </div>
    <div className="imgContainer">
        <img src="/bg5.png" alt=""/>
        <img src="/bg1.png" alt="" className='bg1'/>
        </div>
    </div>
  );
}

export default HomePage;
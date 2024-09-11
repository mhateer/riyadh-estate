import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiRequest from '../../lib/apiRequest';
import './profilePage.scss';
import { Suspense, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/card/Card';


function ProfilePage() {
    const data = useLoaderData();
    const { updateUser, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>Profile Details</h1>
                        <button>
                            <Link to="/profile/update">
                                Update Profile
                            </Link>

                        </button>
                    </div>
                    <div className="info">
                        <span>Avatar: <img src={currentUser.avatar || "/noavatar.png"} alt="" /></span>
                        <span>Username: <b>{currentUser.username}</b></span>
                        <span>E-Mail: <b>{currentUser.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>

                    </div>
                    <div className="title">
                        <h1>My Listing</h1>
                        <Link to="/add">
                            <button>Add New Listing</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts</p>}
                        >
                            {(postResponse) => <List posts={postResponse.data.userPosts} />}
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts</p>}
                        >
                            {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.chatResponse}
                            errorElement={<p>Error loading chats</p>}
                        >
                            {(chatResponse) => <Chat chats={chatResponse.data}/>}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
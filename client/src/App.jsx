import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from './utils/auth';

// import {Footer,Likes,Comments,MusicCard,Navbar,Posts,SearchBar} from './components';
import { Footer, Likes, Comments, MusicCard, Navbar, Posts, Searchbar, Sidebar,Notification } from './components';
import MusicPlayer from './components/MusicPlayer';

import { Home, Login, Profile, CommunityPost, CreatePost, SearchPage, Register, MusicPage, ArtistPage, ProfileEdit,PostSearchPage,ProfileSearchPage } from './pages';



const httpLink = createHttpLink({
  uri: 'http://localhost:3002/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://localhost:3002/graphql',
  cache: new InMemoryCache()
});


function App() {
  const { activeSong } = useSelector((state) => state.player);


  return (
    <ApolloProvider client={client}>
      <div className='relative flex'>

        <Sidebar />
        <header className='flex-1 flex-col justify-center items-center bg-white sm:px-8 px-4 py-4 border-b border-b-white'>
          <Navbar />
          {/* <Searchbar /> */}
          <div className="px-6 mt-10 pt-5 hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile/:username' element={auth.loggedIn() ? <Profile /> : <Login />} />
                <Route path='/posts' element={<CommunityPost />} />
                <Route path='/createpost' element={<CreatePost />} />
                <Route path='/search/:searchTerm' element={<SearchPage />} />
                <Route path='/login/register' element={<Register />} />

                <Route path='/songs/:songid' element={<MusicPage />} />
                <Route path='artists/:id' element={<ArtistPage />} />

                <Route path='/profile/:username/edit' element={<ProfileEdit />} />
                <Route path='/posts/search/:searchTerm' element={<PostSearchPage />} />
                <Route path='/profile/search/:searchTerm' element={<ProfileSearchPage />} />
              </Routes>
            </div>
          </div>

        </header>

        {/* <Link to={'/'}>
        <h1 className='w-30 object-contain'>UrSpace</h1>
      </Link> */}
        {activeSong?.title && (
          <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
        )}

      </div>
    </ApolloProvider>

  )
}

export default App

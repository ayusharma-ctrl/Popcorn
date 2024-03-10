import { useEffect, useState } from 'react';
import { Button, Icon, Avatar } from 'react-native-paper';
import { View, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useUser } from '../components/UserContext';
import List from '../components/List';
import Loader from '../components/Loader';

const apiKey = "please use your api key";
const url = "https://api.themoviedb.org/3";
const popular = "popular";

const Home = ({ navigation }) => {
    const { setUser, user } = useUser();
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularShows, setPopularShows] = useState([]);

    const fetchPopularMovies = async () => {
        setIsLoading(true);
        try {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?page=${page}&api_key=${apiKey}`);
            setPopularMovies(results);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const fetchPopularShows = async () => {
        setIsLoading(true);
        try {
            const {
                data: { results },
            } = await axios.get(`${url}/tv/${popular}?page=${page}&api_key=${apiKey}`);
            setPopularShows(results);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            setUser(null);
            navigation.navigate('welcome');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (tab === 0 && !popularMovies?.length) fetchPopularMovies();
        if (tab === 1 && !popularShows?.length) fetchPopularShows();
    }, [tab]);

    useEffect(() => {
        fetchPopularMovies();
        fetchPopularShows();
    }, [page]);

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderRadius: 10, marginBottom: 10
                }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 }}>
                        {
                            user?.photoURL ?
                                <Image source={{ uri: user?.photoURL }} alt='avatar' style={{ width: 30, height: 30, borderRadius: 50 }} />
                                : <Avatar.Icon size={30} icon="account" />
                        }
                        <Text style={{ fontSize: 14, fontWeight: 500, fontStyle: 'italic' }}>Welcome {user?.displayName?.split(' ')[0]}!</Text>
                    </View>
                    <Button icon="logout" mode="outlined" onPress={logout} textColor='black'>
                        Sign Out
                    </Button>
                </View>
                <View style={{ bottom: '7%', position: 'absolute', width: '100%', height: "7%", display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 999 }}>
                    <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10, gap: 5, paddingRight: 30, paddingLeft: 30, borderRadius: 50, backgroundColor: '#fff' }}>
                        <Icon
                            source="page-first"
                            size={25}
                        />
                        <Text>Prev</Text>
                    </TouchableOpacity>
                    <Text style={{ width: 50, height: 50, fontSize: 20, fontWeight: 500, textAlign: 'center', verticalAlign: 'middle', backgroundColor: "#fff", borderRadius: 50 }}>{page}</Text>
                    <TouchableOpacity disabled={page === 10} onPress={() => setPage(page + 1)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10, gap: 5, paddingRight: 30, paddingLeft: 30, borderRadius: 50, backgroundColor: '#fff' }}>
                        <Icon
                            source="page-last"
                            size={25}
                        />
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ bottom: 0, position: 'absolute', width: '100%', height: "7%", borderWidth: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FDDFDF', zIndex: 999 }}>
                    <TouchableOpacity onPress={() => setTab(0)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10, gap: 5, paddingRight: 30, paddingLeft: 30, borderRadius: 50, backgroundColor: tab === 0 ? "#F5A2A2" : "#FDDFDF" }}>
                        <Icon
                            source="movie"
                            size={25}
                        />
                        <Text>Movies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab(1)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 10, gap: 5, paddingRight: 30, paddingLeft: 30, borderRadius: 50, backgroundColor: tab === 1 ? "#F5A2A2" : "#FDDFDF" }}>
                        <Icon
                            source="netflix"
                            size={25}
                        />
                        <Text>TV Shows</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {
                        isLoading ? <Loader /> :
                            <List data={tab === 0 ? popularMovies : popularShows} />
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Home;
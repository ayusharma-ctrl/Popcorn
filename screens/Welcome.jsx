import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useUser } from '../components/UserContext';
import AppIcon from '../assets/Popcorns.gif';

const Welcome = ({ navigation }) => {

    const { setUser } = useUser();

    const { width, height } = Dimensions.get('window');

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const user = await auth().signInWithCredential(googleCredential);
            setUser(user);
            navigation.navigate('home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                backgroundColor: "#fff",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                gap: 50,
                height: "100%",
            }}
        >
            <View style={{
                backgroundColor: "#fff",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
            }}
            >
                <Text style={Styles.appName}>Popcorn</Text>
                <Text style={Styles.appTagline}>Your Ultimate Movie Info Hub</Text>
            </View>
            <View style={{
                backgroundColor: "#fff",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
            }}
            >
                <Image source={AppIcon} alt='icon' style={{ width: width * 0.9, height: height * 0.4 }} />
            </View>
            <GoogleSigninButton onPress={signIn} style={Styles.btn} />
        </View>
    )
}

export default Welcome;


const Styles = StyleSheet.create({
    btn: {
        width: "70%",
        height: "6%",
    },
    appName: {
        fontSize: 30,
        margin: 10,
        color: '#E56565',
        fontWeight: "700",
        fontStyle: 'italic',
    },
    appTagline: {
        fontSize: 17,
        fontWeight: "500",
    },
})
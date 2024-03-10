import { ImageBackground, View, Image, Text } from 'react-native'

const List = ({ data }) => {
    const imgUrl = "https://image.tmdb.org/t/p/original";
    
    return (
        <View style={{ padding: 10, paddingBottom: 140, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            {
                data && data?.length ? data.map((show, idx) =>
                    show?.poster_path && show?.backdrop_path &&
                    <View key={idx} style={{ height: 210, minWidth: '95%', display: 'flex', alignItems: 'center', gap: 20, borderRadius: 25 }}>
                        <ImageBackground source={{ uri: `${imgUrl}${show?.backdrop_path}` }} style={{ flex: 1, overflow: 'hidden', width: '100%', borderRadius: 25 }}>
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1, borderRadius: 25 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 15, margin: 20 }}>
                                    <Image source={{ uri: `${imgUrl}${show?.poster_path}` }} style={{ borderRadius: 20, width: 120, height: 170 }} />
                                    <Text style={{ color: '#fff', fontWeight: 600, fontSize: 20, fontStyle: 'italic', marginTop: 10, flex: 1, flexWrap: 'wrap' }}>{show?.name ? show?.name : show?.title}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                ) : <Text>No data found!</Text>
            }
        </View>
    )
}

export default List;
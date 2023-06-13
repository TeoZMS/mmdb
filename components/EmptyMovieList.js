import { StyleSheet, View } from "react-native"
import { Colors } from "../constants/colors"

function EmptyMovieList() {
    function ListItem() {
        return (
            <View style={styles.container}>
                <View style={styles.image}></View>
                <View style={styles.detailsContainer}>
                    <View style={styles.title}></View>
                    <View style={styles.year}></View>
                    <View style={styles.typeContainer}>
                        <View style={styles.type}></View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </View>
    )
}

export default EmptyMovieList

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginHorizontal: 4,
        marginVertical: 2
    },
    image: {
        width: 150,
        height: 222,
        backgroundColor: Colors.gray300
    },
    detailsContainer: {
        margin: 12,
        alignItems: "stretch",
        justifyContent: "center",
        flex: 1
    },
    title: {
        marginVertical: 2,
        backgroundColor: Colors.gray300,
        height: 20
    },
    year: {
        backgroundColor: Colors.gray300,
        height: 20,
        width: 40
    },
    typeContainer: { flex: 1, justifyContent: "flex-end" },
    type: {
        backgroundColor: Colors.gray300,
        height: 20,
        width: 80
    }
})

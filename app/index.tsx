import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from "react";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function Home() {
    const [text, setText] = useState("")
    const [fruit, setFruit] = useState("")

    useEffect(() => {
        loadFruit()
    }, [])

    async function saveFruit() {
        if (text.trim() === "") return;
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    async function loadFruit() {
        const data = await AsyncStorage.getItem("fruit")
        if (data !== null) {
            setFruit(data)
        }
    }

    async function removeFruit() {
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }

    return (
        <View style={myStyles.container}>
            {/* ปรับแถบสถานะด้านบนให้เป็นสีเข้ม */}
            <StatusBar barStyle="light-content" />

            <Text style={myStyles.label}>FRUIT</Text>
            <View style={myStyles.displayBox}>
                <Text style={myStyles.fruitText}>{fruit ? fruit : "Empty"}</Text>
            </View>

            <TextInput 
                style={myStyles.input} 
                value={text} 
                placeholder="Enter fruit name..."
                placeholderTextColor="#666" // สีของตัวหนังสือจางๆ
                onChangeText={setText}
            />

            <View  style={myStyles.buttonContainer}>

                {/* ปุ่มบันทึก - โทนสีเขียว Neon ตัดกับดำ */}
                <TouchableOpacity style={[myStyles.button, myStyles.saveBtn]} onPress={saveFruit} >
                    <Text style={myStyles.saveBtnText}>SAVE</Text>
                </TouchableOpacity>

                {/* ปุ่มลบ - โทนสีแดงเข้ม/เทา */}
                <TouchableOpacity style={[myStyles.button, myStyles.removeBtn ]} onPress={removeFruit}>
                    <Text style={myStyles.removeBtnText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // พื้นหลังสีดำเข้ม
        padding: 24
    },
    label: {
        color: "#BB86FC", // สีม่วงอ่อนสไตล์ Material Dark
        fontSize: 15,
        fontWeight: "light",
        letterSpacing: 2,
        marginBottom:15,
        alignSelf: "flex-start",
        marginLeft: "5%",
    },
    displayBox: {
        backgroundColor: "#1E1E1E", // สีเทาเข้มเพื่อให้เห็นขอบเขตกล่อง
        paddingVertical: 30,
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "#333",
    },
    fruitText: {
        fontSize: 26,
        color: "#FFFFFF",
        fontWeight: "700",
        textTransform: "uppercase",
        borderColor: "#453454",
    },
    input: {
        backgroundColor: "#1E1E1E",
        width: "100%",
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 20,
        color: "#FFFFFF", // สีตัวหนังสือตอนพิมพ์
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#785788",
        marginBottom: 25,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 17,
    },
    button: {
        flex: 1,
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    saveBtn: {
        backgroundColor: "#324498", // สีเขียวมิ้นต์ (Neon นิดๆ)
    },
    saveBtnText: {
        color: "black",
        fontWeight: "800",
        fontSize: 20,
    },
    removeBtn: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#CF6679", // สีแดงชมพูสำหรับ Dark Mode
    },
    removeBtnText: {
        color: "#CF6679",
        fontWeight: "600",
        fontSize:20,
    }
})
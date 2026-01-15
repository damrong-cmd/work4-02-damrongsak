import { View,Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from "react";

export default function Home(){
    const [text, setText] = useState("")
    const [fruit, setFruit] = useState("")

    //ฟังชั่นโหลด
    useEffect (() =>{
        loadFruit()
    }, [])

    //ฟังชั่นบันทึก
    async function saveFruit(){
        await AsyncStorage.setItem("fruit", text)
        setFruit(text)
        setText("")
    }

    // ฟังชั่นโหลดคำ
    async function loadFruit(){
        const data = await AsyncStorage.getItem(fruit)
        if(data != ""){
            setFruit(data!.toString())
        }
    }
    
    // ฟังชั่นลบ
    async function removeFruit(){
        await AsyncStorage.removeItem("fruit")
        setFruit("")
    }

    return(
        <View style={myStyles.container}>
            {/* แสดงสิ่งที่บันทึก */}
            <Text>Fruit : {fruit} </Text>

            {/* รับข้อความ */}
            <TextInput style={myStyles.input} value={text} onChangeText={setText}/>

            {/* ปุ่มบันทึด */}
            <TouchableOpacity onPress={saveFruit}>
                <Text>บันทึก</Text>
            </TouchableOpacity>

            {/* ปุ่มลบ */}
            <TouchableOpacity>
                <Text>ลบ</Text>
            </TouchableOpacity>
        </View>
    )
}

const myStyles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent: "center",
        alignItems: "center"
    },
    input:{
        borderWidth:1,
        width:"80%"
    }
})
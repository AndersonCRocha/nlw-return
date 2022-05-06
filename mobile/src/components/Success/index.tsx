import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";
import { styles } from "./styles";

interface Props {
  onReset: () => void;
}

export function Success({ onReset }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onReset}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}

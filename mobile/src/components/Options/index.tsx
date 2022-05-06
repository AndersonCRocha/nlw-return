import React from "react";
import { Text, View } from "react-native";
import { FeedbackType, feedbackTypes } from "../../utils/feedbackTypes";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { styles } from "./styles";

interface Props {
  onChangeFeedbackType: (feedbackType: FeedbackType) => void;
}

export function Options({ onChangeFeedbackType }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, { title, image }]) => (
          <Option
            key={key}
            title={title}
            image={image}
            onPress={() => onChangeFeedbackType(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}

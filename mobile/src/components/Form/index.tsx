import * as FileSystem from "expo-file-system";
import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../services/api";
import { theme } from "../../theme";
import { FeedbackType, feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { styles } from "./styles";

interface Props {
  feedbackType: FeedbackType;
  onStepOver: () => void;
  onSendFeedback: () => void;
}

export function Form({ feedbackType, onStepOver, onSendFeedback }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const { title, image } = feedbackTypes[feedbackType];

  async function handleSendFeedback() {
    setIsSendingFeedback(true);

    try {
      const screenshotBase64 =
        screenshot &&
        (await FileSystem.readAsStringAsync(screenshot, {
          encoding: FileSystem.EncodingType.Base64,
        }));

      const body = {
        type: feedbackType,
        comment,
        screenshot:
          screenshotBase64 && `data:image/png;base64,${screenshotBase64}`,
      };

      await api.post("/feedbacks", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSendingFeedback(false);
      onSendFeedback();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      setIsSendingFeedback(false);
      Alert.alert("Erro", "Não foi possível enviar o feedback");
    }
  }

  async function handleTakeShot() {
    const screenshotUri = await captureScreen({
      format: "jpg",
      quality: 0.8,
    });
    setScreenshot(screenshotUri);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onStepOver}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        onChangeText={setComment}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleTakeShot}
          onRemoveShot={() => setScreenshot(null)}
        />

        <Button
          disabled={isSendingFeedback}
          isLoading={isSendingFeedback}
          onPress={handleSendFeedback}
        />
      </View>
    </View>
  );
}

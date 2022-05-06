import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import React, { FunctionComponent, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { FeedbackType } from "../../utils/feedbackTypes";
import { Form } from "../Form";
import { Options } from "../Options";
import { Success } from "../Success";
import { styles } from "./styles";

function WidgetComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Steps />
      </BottomSheet>
    </>
  );
}

function Steps() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleResetSteps() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  if (feedbackSent) {
    return <Success onReset={handleResetSteps} />;
  }

  return (
    <>
      {feedbackType ? (
        <Form
          feedbackType={feedbackType}
          onStepOver={handleResetSteps}
          onSendFeedback={() => setFeedbackSent(true)}
        />
      ) : (
        <Options onChangeFeedbackType={setFeedbackType} />
      )}
    </>
  );
}

const Widget = gestureHandlerRootHOC(WidgetComponent) as FunctionComponent;

export { Widget };

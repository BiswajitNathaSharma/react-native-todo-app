import React, { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function NoteEditorScreenComponent({
  note,
  colors,
  dynamicStyles,
  onBack,
  onSave,
  onChange,
}: any) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.editorContainer, dynamicStyles.screen]}>
        <View style={styles.editorHeader}>
          <Pressable
            onPress={onBack}
            style={[styles.headerAction, dynamicStyles.secondaryButton]}
          >
            <Text style={[styles.headerBtn, dynamicStyles.text]}>Back</Text>
          </Pressable>

          <Pressable
            onPress={onSave}
            style={[styles.headerAction, dynamicStyles.primaryButton]}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </Pressable>
        </View>

        <View style={[styles.editorCard, dynamicStyles.card]}>
          <TextInput
            placeholder="Note title"
            placeholderTextColor={colors.subText}
            value={note.title}
            onChangeText={(text) => onChange("title", text)}
            style={[styles.titleInput, dynamicStyles.input]}
          />

          <TextInput
            placeholder="Start writing here..."
            placeholderTextColor={colors.subText}
            value={note.content}
            onChangeText={(text) => onChange("content", text)}
            multiline
            textAlignVertical="top"
            style={[styles.contentInput, dynamicStyles.input]}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default memo(NoteEditorScreenComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  editorContainer: {
    flex: 1,
    paddingTop: 12,
  },

  editorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerAction: {
    minWidth: 90,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerBtn: {
    fontSize: 15,
    fontWeight: "700",
  },

  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  editorCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
  },

  titleInput: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
  },

  contentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 16,
    lineHeight: 26,
  },
});

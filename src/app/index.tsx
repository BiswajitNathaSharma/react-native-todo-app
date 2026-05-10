import NoteEditorScreen from "@/components/NoteEditorScreen";
import NotesListScreen from "@/components/NotesListScreen";
import ThemeSwitch from "@/components/SwitchTheme";
import { useAppTheme } from "@/theme/ThemeProvider";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTES = [
  {
    id: "1",
    title: "React Native",
    content: "Learning FlatList and KeyboardAvoidingView.",
    createdAt: "10 May 2026",
  },
  {
    id: "2",
    title: "Expo SDK 55",
    content: "Using latest Expo architecture and hooks.",
    createdAt: "09 May 2026",
  },
];

const defaultNewNote = {
  title: "",
  content: "",
};

export default function Index() {
  const { colors } = useAppTheme();

  const dynamicStyles = getStyles(colors);

  const [notes, setNotes] = useState(NOTES);

  const [searchQuery, setSearchQuery] = useState("");

  const [view, setView] = useState<"list" | "editor">("list");

  const [selectedNote, setSelectedNote] = useState<any>(null);

  const openEditor = (note: any) => {
    setSelectedNote(note);

    setView("editor");
  };

  const closeEditor = () => {
    setView("list");
  };

  const handleSave = () => {
    setNotes((prev) =>
      prev.some((n) => n.id === selectedNote.id)
        ? prev.map((n) => (n.id === selectedNote.id ? selectedNote : n))
        : [selectedNote, ...prev],
    );

    closeEditor();
  };

  const handleInputChange = (field: string, value: string) => {
    setSelectedNote((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createNewNote = () => {
    openEditor({
      ...defaultNewNote,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
    });
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.screen]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.heading, dynamicStyles.text]}>My Notes</Text>

          <Text style={[styles.subHeading, dynamicStyles.subText]}>
            Capture your thoughts beautifully
          </Text>
        </View>
        <ThemeSwitch />
      </View>
      {view === "list" ? (
        <NotesListScreen
          notes={notes}
          searchQuery={searchQuery}
          colors={colors}
          dynamicStyles={dynamicStyles}
          onSearchChange={setSearchQuery}
          onCreateNote={createNewNote}
          onOpenNote={openEditor}
        />
      ) : (
        <NoteEditorScreen
          note={selectedNote}
          colors={colors}
          dynamicStyles={dynamicStyles}
          onBack={closeEditor}
          onSave={handleSave}
          onChange={handleInputChange}
        />
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors: any) => ({
  screen: {
    backgroundColor: colors.background,
  },

  text: {
    color: colors.text,
  },

  subText: {
    color: colors.subText,
  },

  input: {
    backgroundColor: colors.input,
    color: colors.text,
    borderColor: colors.border,
  },

  addButton: {
    backgroundColor: colors.primary,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },

  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerRow: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subHeading: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "500",
  },
});

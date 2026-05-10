import NoteCard from "@/components/NoteCard";
import React, { memo, useMemo } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

function NotesListScreenComponent({
  notes,
  searchQuery,
  colors,
  dynamicStyles,
  onSearchChange,
  onCreateNote,
  onOpenNote,
}: any) {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes;
    }

    const query = searchQuery.toLowerCase();

    return notes.filter(
      (note: any) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query),
    );
  }, [notes, searchQuery]);

  return (
    <View>
      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={colors.subText}
        value={searchQuery}
        onChangeText={onSearchChange}
        style={[styles.searchInput, dynamicStyles.input]}
      />

      <Pressable
        onPress={onCreateNote}
        style={({ pressed }) => [
          styles.addButton,
          dynamicStyles.addButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>+ Create New Note</Text>
      </Pressable>

      <FlatList
        data={filteredNotes}
        keyExtractor={(note) => note.id}
        numColumns={isTablet ? 2 : 1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={isTablet ? styles.columnWrapper : undefined}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            isTablet={isTablet}
            onPress={() => onOpenNote(item)}
          />
        )}
      />
    </View>
  );
}

export default memo(NotesListScreenComponent);

const styles = StyleSheet.create({
  searchInput: {
    height: 56,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 15,
  },

  addButton: {
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  buttonPressed: {
    opacity: 0.9,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  listContent: {
    paddingBottom: 24,
  },

  columnWrapper: {
    justifyContent: "space-between",
    gap: 16,
  },
});

import { useAppTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const NoteCard = ({ note, isTablet, onPress }: any) => {
  const { colors } = useAppTheme();
  const dynamicStyles = getStyles(colors);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        dynamicStyles.card,
        isTablet && styles.tabletCard,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <View style={dynamicStyles.badge}>
            <Text style={dynamicStyles.badgeText}>NOTE</Text>
          </View>

          <Text style={[styles.dateText, dynamicStyles.subText]}>
            {note.createdAt}
          </Text>
        </View>

        <Text numberOfLines={1} style={[styles.title, dynamicStyles.text]}>
          {note.title || "Untitled Note"}
        </Text>

        <Text numberOfLines={3} style={[styles.content, dynamicStyles.subText]}>
          {note.content || "No content added yet."}
        </Text>
      </View>

      <View style={[styles.footer, dynamicStyles.footer]}>
        <Text numberOfLines={1} style={[styles.noteId, dynamicStyles.idText]}>
          #{note.id}
        </Text>

        <Text style={[styles.openText, dynamicStyles.primaryText]}>Open →</Text>
      </View>
    </Pressable>
  );
};

export default NoteCard;

const getStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      shadowColor: colors.shadow,
    },

    text: {
      color: colors.text,
    },

    subText: {
      color: colors.subText,
    },

    primaryText: {
      color: colors.primary,
    },

    idText: {
      color: colors.subText,
    },

    footer: {
      borderTopColor: colors.border,
    },

    badge: {
      backgroundColor: `${colors.primary}15`,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      alignSelf: "flex-start",
    },

    badgeText: {
      color: colors.primary,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 0.8,
    },
  });

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    overflow: "hidden",

    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },

  tabletCard: {
    maxWidth: "48%",
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },

  contentWrapper: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  dateText: {
    fontSize: 12,
    fontWeight: "500",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: -0.4,
  },

  content: {
    fontSize: 15,
    lineHeight: 24,
    minHeight: 72,
  },

  footer: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  noteId: {
    fontSize: 12,
    fontWeight: "600",
  },

  openText: {
    fontSize: 14,
    fontWeight: "700",
  },
});

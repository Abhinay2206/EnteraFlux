/**
 * Education / Learn Screen
 * Educational content library with categories and search
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { lightTheme } from '@/constants/theme';
import { H2, H3, H4, Body, Caption } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { TextInput } from '@/components/ui/TextInput';
import { Ionicons } from '@expo/vector-icons';

// Mock data
const FEATURED_ARTICLE = {
  title: 'Understanding GLP-1 Mechanisms',
  category: 'Science',
  readTime: '8 min read',
  image: null, // Would be an image URL
};

const CATEGORIES = [
  { id: 1, name: 'Nutrition', icon: 'restaurant' as const, color: '#10B981' },
  { id: 2, name: 'Exercise', icon: 'barbell' as const, color: '#2563EB' },
  { id: 3, name: 'Side Effects', icon: 'medical' as const, color: '#F59E0B' },
  { id: 4, name: 'Travel', icon: 'airplane' as const, color: '#8B5CF6' },
  { id: 5, name: 'Science', icon: 'flask' as const, color: '#EC4899' },
  { id: 6, name: 'Safety', icon: 'shield-checkmark' as const, color: '#EF4444' },
];

const RECENT_ARTICLES = [
  {
    id: 1,
    title: 'Managing nausea: Evidence-based strategies',
    category: 'Side Effects',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Safe food choices during treatment',
    category: 'Nutrition',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'Exercise guidelines for GLP-1 users',
    category: 'Exercise',
    readTime: '7 min',
  },
];

export default function EducationScreen() {
  const theme = lightTheme;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <H2>Learn</H2>
          <Body style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
            Evidence-based education
          </Body>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <TextInput
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon="search"
            rightIcon={searchQuery ? 'close-circle' : undefined}
            onRightIconPress={() => setSearchQuery('')}
          />
        </View>

        {/* Featured Article */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Featured</H3>
          <Card elevated style={styles.featuredCard}>
            <View style={[styles.featuredImage, { backgroundColor: theme.colors.primary + '20' }]}>
              <Ionicons name="book" size={40} color={theme.colors.primary} />
            </View>
            <View style={styles.featuredContent}>
              <Caption style={{ color: theme.colors.primary, marginBottom: 4 }}>
                {FEATURED_ARTICLE.category}
              </Caption>
              <H3 style={{ marginBottom: 8 }}>{FEATURED_ARTICLE.title}</H3>
              <View style={styles.articleMeta}>
                <Ionicons name="time" size={14} color={theme.colors.textTertiary} />
                <Caption style={{ marginLeft: 4, color: theme.colors.textTertiary }}>
                  {FEATURED_ARTICLE.readTime}
                </Caption>
              </View>
            </View>
          </Card>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <H3 style={styles.sectionTitle}>Browse by Category</H3>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => console.log(`Browse ${category.name}`)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.categoryCard,
                    { backgroundColor: category.color + '20' },
                  ]}
                >
                  <Ionicons name={category.icon} size={32} color={category.color} />
                  <H4 style={{ marginTop: 8, fontSize: 14 }}>{category.name}</H4>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Articles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <H3>Recent Articles</H3>
            <TouchableOpacity onPress={() => console.log('View all')}>
              <Body style={{ color: theme.colors.primary }}>View All →</Body>
            </TouchableOpacity>
          </View>

          {RECENT_ARTICLES.map((article) => (
            <TouchableOpacity
              key={article.id}
              onPress={() => console.log(`Read article ${article.id}`)}
              activeOpacity={0.7}
            >
              <Card style={styles.articleCard}>
                <View style={styles.articleContent}>
                  <View style={styles.articleIcon}>
                    <Ionicons name="document-text" size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.articleText}>
                    <H4 style={{ fontSize: 16, marginBottom: 4 }}>{article.title}</H4>
                    <View style={styles.articleMeta}>
                      <Caption style={{ color: theme.colors.primary }}>
                        {article.category}
                      </Caption>
                      <Caption style={{ color: theme.colors.textTertiary, marginLeft: 12 }}>
                        • {article.readTime}
                      </Caption>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bookmark Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.bookmarkButton, { borderColor: theme.colors.border }]}
            onPress={() => console.log('View bookmarks')}
          >
            <Ionicons name="bookmark" size={20} color={theme.colors.primary} />
            <Body style={{ color: theme.colors.primary, marginLeft: 8 }}>
              View Bookmarks
            </Body>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  featuredCard: {
    marginHorizontal: 16,
    padding: 0,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  articleCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 0,
  },
  articleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  articleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  articleText: {
    flex: 1,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
});
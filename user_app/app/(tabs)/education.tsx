/**
 * Education / Learn Screen
 * Comprehensive educational content about GLP-1 therapy with rich visualizations
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';

// Visual Learning Components
interface VisualizationProps {
  type: 'timeline' | 'body-diagram' | 'chart' | 'infographic';
  data?: any;
}

const Visualization: React.FC<VisualizationProps> = ({ type, data }) => {
  const [animProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animProgress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Changed to false to support height animation
    }).start();
  }, [animProgress]);

  if (type === 'timeline') {
    return (
      <View style={styles.timelineContainer}>
        <Text style={styles.visualizationTitle}>Medication Effect Timeline</Text>
        {data?.map((item: any, index: number) => (
          <Animated.View
            key={index}
            style={[
              styles.timelineItem,
              {
                opacity: animProgress,
                transform: [{
                  translateX: animProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                }],
              },
            ]}
          >
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTime}>{item.time}</Text>
              <Text style={styles.timelineText}>{item.effect}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    );
  }

  if (type === 'body-diagram') {
    return (
      <View style={styles.bodyDiagramContainer}>
        <Text style={styles.visualizationTitle}>Injection Sites</Text>
        <View style={styles.bodyDiagram}>
          <View style={styles.bodyOutline}>
            {/* Abdomen */}
            <TouchableOpacity style={[styles.injectionSite, styles.abdomenSite]}>
              <Ionicons name="location" size={24} color={theme.colors.palette.primary[600]} />
              <Text style={styles.siteLabel}>Abdomen</Text>
            </TouchableOpacity>
            {/* Thigh */}
            <TouchableOpacity style={[styles.injectionSite, styles.thighSite]}>
              <Ionicons name="location" size={24} color={theme.colors.palette.success[600]} />
              <Text style={styles.siteLabel}>Thigh</Text>
            </TouchableOpacity>
            {/* Upper Arm */}
            <TouchableOpacity style={[styles.injectionSite, styles.armSite]}>
              <Ionicons name="location" size={24} color={theme.colors.palette.info[600]} />
              <Text style={styles.siteLabel}>Upper Arm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.injectionLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.palette.primary[600] }]} />
              <Text style={styles.legendText}>Preferred Site</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.colors.palette.success[600] }]} />
              <Text style={styles.legendText}>Alternative Site</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (type === 'chart') {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.visualizationTitle}>Blood Sugar Control</Text>
        <View style={styles.chartArea}>
          {[...Array(7)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.chartBar,
                {
                  height: animProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, (index + 1) * 20],
                  }),
                  backgroundColor: theme.colors.palette.success[400],
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.chartLabels}>
          <Text style={styles.chartLabel}>Week 1</Text>
          <Text style={styles.chartLabel}>Week 4</Text>
          <Text style={styles.chartLabel}>Week 8</Text>
        </View>
      </View>
    );
  }

  return null;
};

// Quick Reference Card Component
const QuickReferenceCard: React.FC<{ title: string; items: string[]; icon: any }> = ({ title, items, icon }) => (
  <View style={styles.quickRefCard}>
    <View style={styles.quickRefHeader}>
      <Ionicons name={icon} size={24} color={theme.colors.palette.primary[600]} />
      <Text style={styles.quickRefTitle}>{title}</Text>
    </View>
    {items.map((item, index) => (
      <View key={index} style={styles.quickRefItem}>
        <Ionicons name="arrow-forward" size={14} color={theme.colors.textSecondary} />
        <Text style={styles.quickRefText}>{item}</Text>
      </View>
    ))}
  </View>
);

// Video/Media Card Component
const MediaCard: React.FC<{ title: string; duration: string; thumbnail?: string }> = ({ title, duration }) => (
  <TouchableOpacity style={styles.mediaCard}>
    <View style={styles.mediaThumbnail}>
      <Ionicons name="play-circle" size={48} color={theme.colors.palette.primary[600]} />
    </View>
    <View style={styles.mediaInfo}>
      <Text style={styles.mediaTitle}>{title}</Text>
      <View style={styles.mediaMeta}>
        <Ionicons name="time" size={14} color={theme.colors.textSecondary} />
        <Text style={styles.mediaDuration}>{duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Progress Indicator Component
const ProgressIndicator: React.FC<{ completed: number; total: number }> = ({ completed, total }) => {
  const percentage = (completed / total) * 100;
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>Learning Progress</Text>
        <Text style={styles.progressPercentage}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{completed} of {total} sections completed</Text>
    </View>
  );
};

// Educational content sections
const EDUCATION_SECTIONS = [
  {
    id: 'what-is-glp1',
    title: 'What is GLP-1?',
    icon: 'information-circle' as const,
    color: theme.colors.palette.primary[600],
    estimatedTime: '5 min read',
    difficulty: 'Beginner',
    content: [
      {
        type: 'text',
        text: 'GLP-1 (Glucagon-Like Peptide-1) is a natural hormone your body produces in your intestines after eating.',
      },
      {
        type: 'heading',
        text: 'What GLP-1 Does:',
      },
      {
        type: 'bullet',
        items: [
          'Helps regulate blood sugar levels',
          'Slows down stomach emptying',
          'Reduces appetite and food cravings',
          'Signals fullness to your brain',
          'Supports weight management',
        ],
      },
      {
        type: 'info',
        text: 'GLP-1 medications mimic this natural hormone but last much longer in your body, providing sustained benefits.',
      },
      {
        type: 'visualization',
        component: 'chart',
      },
      {
        type: 'quick-reference',
        title: 'Key Takeaways',
        items: [
          'Natural hormone produced after eating',
          'Regulates blood sugar & appetite',
          'Medications provide longer-lasting effects',
        ],
      },
    ],
  },
  {
    id: 'how-it-works',
    title: 'How GLP-1 Medications Work',
    icon: 'flask' as const,
    color: theme.colors.palette.success[600],
    estimatedTime: '7 min read',
    difficulty: 'Intermediate',
    content: [
      {
        type: 'text',
        text: 'GLP-1 medications are designed to work like your natural GLP-1 hormone, but with longer-lasting effects.',
      },
      {
        type: 'heading',
        text: 'Mechanism of Action:',
      },
      {
        type: 'numbered',
        items: [
          'Binds to GLP-1 receptors in your body',
          'Stimulates insulin release when blood sugar is high',
          'Reduces glucagon (a hormone that raises blood sugar)',
          'Slows gastric emptying (food stays in stomach longer)',
          'Acts on brain centers that control appetite',
        ],
      },
      {
        type: 'text',
        text: 'Most GLP-1 medications are injected once weekly, providing consistent levels throughout the week.',
      },
      {
        type: 'visualization',
        component: 'timeline',
        data: [
          { time: 'Within hours', effect: 'Begin slowing gastric emptying' },
          { time: '1-2 days', effect: 'Peak medication levels reached' },
          { time: '3-5 days', effect: 'Full appetite control effects' },
          { time: '1 week', effect: 'Steady state achieved' },
          { time: '4-8 weeks', effect: 'Significant weight loss begins' },
        ],
      },
      {
        type: 'media',
        title: 'Understanding GLP-1 Mechanism',
        duration: '4:32',
      },
    ],
  },
  {
    id: 'side-effects',
    title: 'Common Side Effects & Management',
    icon: 'medical' as const,
    color: theme.colors.palette.warning[600],
    estimatedTime: '10 min read',
    difficulty: 'Intermediate',
    content: [
      {
        type: 'text',
        text: 'Most side effects are mild and improve over time as your body adjusts. Here are the most common ones and how to manage them:',
      },
      {
        type: 'side-effect',
        severity: 'mild',
        name: 'Nausea',
        tips: [
          'Eat smaller, more frequent meals',
          'Avoid fatty or spicy foods',
          'Stay hydrated with small sips of water',
          'Eat slowly and chew thoroughly',
          'Try ginger tea or crackers',
        ],
      },
      {
        type: 'side-effect',
        severity: 'mild',
        name: 'Diarrhea or Constipation',
        tips: [
          'Increase fiber intake gradually',
          'Drink plenty of water (8+ glasses daily)',
          'Exercise regularly',
          'Consider probiotics (consult your doctor)',
        ],
      },
      {
        type: 'side-effect',
        severity: 'moderate',
        name: 'Fatigue',
        tips: [
          'Ensure adequate sleep (7-9 hours)',
          'Maintain balanced nutrition',
          'Stay hydrated',
          'Light exercise can boost energy',
        ],
      },
      {
        type: 'side-effect',
        severity: 'mild',
        name: 'Injection Site Reactions',
        tips: [
          'Rotate injection sites',
          'Use proper injection technique',
          'Apply ice before injection if needed',
          'Let medication reach room temperature',
        ],
      },
      {
        type: 'warning',
        text: 'Contact your healthcare provider if side effects are severe, persistent, or worsen over time.',
      },
      {
        type: 'quick-reference',
        title: 'When to Call Your Doctor',
        items: [
          'Side effects lasting > 2 weeks',
          'Unable to eat or drink',
          'Severe or worsening symptoms',
          'New unexpected symptoms',
        ],
      },
      {
        type: 'media',
        title: 'Managing Nausea & GI Side Effects',
        duration: '6:15',
      },
    ],
  },
  {
    id: 'nutrition',
    title: 'Nutrition Guidelines',
    icon: 'restaurant' as const,
    color: theme.colors.palette.success[600],
    estimatedTime: '8 min read',
    difficulty: 'Beginner',
    content: [
      {
        type: 'text',
        text: 'Proper nutrition is essential for success with GLP-1 therapy. Focus on nutrient-dense foods that support your health goals.',
      },
      {
        type: 'do-dont',
        do: [
          'Eat protein with every meal (lean meats, fish, eggs, legumes)',
          'Choose whole grains over refined carbs',
          'Include plenty of vegetables and fruits',
          'Drink water throughout the day',
          'Eat slowly and mindfully',
          'Plan smaller, more frequent meals',
        ],
        dont: [
          'Skip meals or go too long without eating',
          'Consume high-fat, greasy foods',
          'Eat very large portions',
          'Drink excessive alcohol',
          'Rely on processed or sugary foods',
          'Eat too quickly',
        ],
      },
      {
        type: 'info',
        text: 'Aim for 60-80g of protein daily to preserve muscle mass during weight loss.',
      },
      {
        type: 'quick-reference',
        title: 'Sample Daily Meal Plan',
        items: [
          'Breakfast: Greek yogurt with berries & nuts',
          'Lunch: Grilled chicken salad with olive oil',
          'Snack: Apple with almond butter',
          'Dinner: Baked salmon with vegetables',
        ],
      },
      {
        type: 'media',
        title: 'Meal Planning for GLP-1 Success',
        duration: '8:45',
      },
    ],
  },
  {
    id: 'exercise',
    title: 'Exercise Recommendations',
    icon: 'barbell' as const,
    color: theme.colors.palette.primary[600],
    estimatedTime: '6 min read',
    difficulty: 'Beginner',
    content: [
      {
        type: 'text',
        text: 'Regular physical activity enhances the benefits of GLP-1 therapy and supports overall health.',
      },
      {
        type: 'heading',
        text: 'Recommended Activities:',
      },
      {
        type: 'exercise',
        activities: [
          {
            name: 'Cardio Exercise',
            examples: 'Walking, swimming, cycling, dancing',
            frequency: '150 minutes per week (30 min, 5 days)',
            intensity: 'Moderate - can talk but not sing',
          },
          {
            name: 'Strength Training',
            examples: 'Weights, resistance bands, bodyweight exercises',
            frequency: '2-3 times per week',
            intensity: 'Focus on major muscle groups',
          },
          {
            name: 'Flexibility & Balance',
            examples: 'Yoga, stretching, tai chi',
            frequency: 'Daily or several times per week',
            intensity: 'Gentle, focus on form',
          },
        ],
      },
      {
        type: 'warning',
        text: 'Start slowly if you\'re new to exercise. Consult your healthcare provider before beginning any new exercise program.',
      },
      {
        type: 'quick-reference',
        title: 'Weekly Exercise Goal',
        items: [
          '150 minutes cardio (e.g., 30 min × 5 days)',
          '2-3 strength training sessions',
          'Daily stretching or flexibility work',
          'Gradually increase intensity',
        ],
      },
      {
        type: 'media',
        title: 'Safe Exercise During GLP-1 Therapy',
        duration: '7:20',
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel Tips',
    icon: 'airplane' as const,
    color: theme.colors.palette.info[600],
    estimatedTime: '5 min read',
    difficulty: 'Beginner',
    content: [
      {
        type: 'text',
        text: 'Traveling with GLP-1 medication requires some planning, but it\'s straightforward with proper preparation.',
      },
      {
        type: 'heading',
        text: 'Storage & Transportation:',
      },
      {
        type: 'bullet',
        items: [
          'Keep medication refrigerated (36-46°F / 2-8°C) when possible',
          'Unopened pens can be at room temperature for up to 28 days',
          'Use a medical cooler bag for flights',
          'Never freeze medication',
          'Protect from direct sunlight and heat',
        ],
      },
      {
        type: 'heading',
        text: 'TSA & Airport Security:',
      },
      {
        type: 'bullet',
        items: [
          'Carry medication in original packaging',
          'Bring prescription label or doctor\'s note',
          'Pack in carry-on luggage (never checked bags)',
          'Inform TSA agents you have medical supplies',
          'Bring extra supplies in case of delays',
        ],
      },
      {
        type: 'heading',
        text: 'Time Zone Changes:',
      },
      {
        type: 'bullet',
        items: [
          'Maintain your weekly injection schedule',
          'Adjust timing by a few hours if needed',
          'Set reminders on your phone',
          'Consult your doctor for long trips',
        ],
      },
      {
        type: 'quick-reference',
        title: 'Travel Checklist',
        items: [
          '✓ Medication in original packaging',
          '✓ Doctor\'s note & prescription',
          '✓ Medical cooler bag',
          '✓ Extra supplies for delays',
        ],
      },
    ],
  },
  {
    id: 'emergency',
    title: 'Emergency Warning Signs',
    icon: 'warning' as const,
    color: theme.colors.palette.error[600],
    estimatedTime: '4 min read',
    difficulty: 'Important',
    content: [
      {
        type: 'text',
        text: 'While serious side effects are rare, it\'s important to recognize warning signs that require immediate medical attention.',
      },
      {
        type: 'emergency',
        title: 'Seek Emergency Care Immediately If You Experience:',
        signs: [
          {
            symptom: 'Severe Abdominal Pain',
            description: 'Intense pain that doesn\'t go away, especially if radiating to your back',
            severity: 'critical',
          },
          {
            symptom: 'Persistent Vomiting',
            description: 'Unable to keep down food or liquids for 24+ hours',
            severity: 'critical',
          },
          {
            symptom: 'Signs of Pancreatitis',
            description: 'Severe upper stomach pain, fever, rapid pulse, nausea',
            severity: 'critical',
          },
          {
            symptom: 'Allergic Reaction',
            description: 'Difficulty breathing, swelling of face/throat, severe rash',
            severity: 'critical',
          },
          {
            symptom: 'Vision Changes',
            description: 'Sudden blurred vision or vision loss',
            severity: 'warning',
          },
          {
            symptom: 'Severe Dehydration',
            description: 'Extreme thirst, dark urine, dizziness, confusion',
            severity: 'warning',
          },
          {
            symptom: 'Kidney Problems',
            description: 'Decreased urination, swelling in legs/feet, fatigue',
            severity: 'warning',
          },
        ],
      },
      {
        type: 'info',
        text: 'Call 911 or go to the nearest emergency room if you experience any critical symptoms. For warning-level symptoms, contact your healthcare provider immediately.',
      },
      {
        type: 'quick-reference',
        title: 'Emergency Contacts',
        items: [
          '911 for life-threatening symptoms',
          'Doctor\'s emergency line',
          'Medication support hotline',
          'Nearest emergency room location',
        ],
      },
    ],
  },
  {
    id: 'injection',
    title: 'Injection Technique Guide',
    icon: 'medkit' as const,
    color: theme.colors.palette.primary[600],
    estimatedTime: '6 min read',
    difficulty: 'Beginner',
    content: [
      {
        type: 'text',
        text: 'Proper injection technique ensures medication effectiveness and minimizes discomfort.',
      },
      {
        type: 'heading',
        text: 'Step-by-Step Instructions:',
      },
      {
        type: 'numbered',
        items: [
          'Wash your hands thoroughly with soap and water',
          'Remove pen from refrigerator 30 minutes before injection',
          'Check medication - should be clear and colorless',
          'Attach a new needle to the pen',
          'Prime the pen (follow manufacturer instructions)',
          'Choose injection site: abdomen, thigh, or upper arm',
          'Clean site with alcohol swab and let dry',
          'Pinch skin and insert needle at 90-degree angle',
          'Press injection button and hold for 5-10 seconds',
          'Remove needle and dispose in sharps container',
        ],
      },
      {
        type: 'heading',
        text: 'Injection Site Rotation:',
      },
      {
        type: 'bullet',
        items: [
          'Rotate between different areas each week',
          'Stay at least 2 inches away from previous injection',
          'Avoid areas with scars, bruises, or skin changes',
          'Abdomen (avoid 2 inches around belly button)',
          'Front and outer thighs',
          'Back of upper arms (may need assistance)',
        ],
      },
      {
        type: 'info',
        text: 'Never share your pen with others, even if the needle is changed. Each pen is for single-patient use only.',
      },
      {
        type: 'visualization',
        component: 'body-diagram',
      },
      {
        type: 'media',
        title: 'Step-by-Step Injection Demonstration',
        duration: '5:45',
      },
      {
        type: 'quick-reference',
        title: 'Injection Quick Tips',
        items: [
          'Let pen warm to room temperature',
          'Rotate injection sites weekly',
          'Clean site & let alcohol dry',
          'Dispose needles in sharps container',
        ],
      },
    ],
  },
];

interface EducationSectionProps {
  section: typeof EDUCATION_SECTIONS[0];
  isExpanded: boolean;
  onToggle: () => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ section, isExpanded, onToggle }) => {
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <Text key={index} style={styles.contentText}>
            {item.text}
          </Text>
        );

      case 'heading':
        return (
          <Text key={index} style={styles.contentHeading}>
            {item.text}
          </Text>
        );

      case 'bullet':
        return (
          <View key={index} style={styles.listContainer}>
            {item.items.map((bullet: string, i: number) => (
              <View key={i} style={styles.bulletItem}>
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.palette.success[600]} />
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        );

      case 'numbered':
        return (
          <View key={index} style={styles.listContainer}>
            {item.items.map((step: string, i: number) => (
              <View key={i} style={styles.numberedItem}>
                <View style={styles.numberBadge}>
                  <Text style={styles.numberText}>{i + 1}</Text>
                </View>
                <Text style={styles.bulletText}>{step}</Text>
              </View>
            ))}
          </View>
        );

      case 'info':
        return (
          <View key={index} style={[styles.alertBox, { backgroundColor: theme.colors.palette.info[50] }]}>
            <Ionicons name="information-circle" size={20} color={theme.colors.palette.info[600]} />
            <Text style={[styles.alertText, { color: theme.colors.palette.info[900] }]}>{item.text}</Text>
          </View>
        );

      case 'warning':
        return (
          <View key={index} style={[styles.alertBox, { backgroundColor: theme.colors.palette.warning[50] }]}>
            <Ionicons name="warning" size={20} color={theme.colors.palette.warning[600]} />
            <Text style={[styles.alertText, { color: theme.colors.palette.warning[900] }]}>{item.text}</Text>
          </View>
        );

      case 'visualization':
        return <Visualization key={index} type={item.component} data={item.data} />;

      case 'quick-reference':
        return <QuickReferenceCard key={index} title={item.title} items={item.items} icon="bookmark" />;

      case 'media':
        return <MediaCard key={index} title={item.title} duration={item.duration} />;

      case 'side-effect':
        const severityColors = {
          mild: theme.colors.palette.success[600],
          moderate: theme.colors.palette.warning[600],
          severe: theme.colors.palette.error[600],
        };
        return (
          <View key={index} style={styles.sideEffectCard}>
            <View style={styles.sideEffectHeader}>
              <View style={[styles.severityBadge, { backgroundColor: severityColors[item.severity as keyof typeof severityColors] + '20' }]}>
                <Text style={[styles.severityText, { color: severityColors[item.severity as keyof typeof severityColors] }]}>
                  {item.severity.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.sideEffectName}>{item.name}</Text>
            </View>
            <Text style={styles.sideEffectTipsTitle}>Management Tips:</Text>
            {item.tips.map((tip: string, i: number) => (
              <View key={i} style={styles.tipItem}>
                <Ionicons name="ellipse" size={6} color={theme.colors.textSecondary} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        );

      case 'do-dont':
        return (
          <View key={index} style={styles.doDontContainer}>
            <View style={styles.doColumn}>
              <View style={styles.doHeader}>
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.palette.success[600]} />
                <Text style={styles.doHeaderText}>DO</Text>
              </View>
              {item.do.map((doItem: string, i: number) => (
                <View key={i} style={styles.doItem}>
                  <Ionicons name="checkmark" size={16} color={theme.colors.palette.success[600]} />
                  <Text style={styles.doText}>{doItem}</Text>
                </View>
              ))}
            </View>
            <View style={styles.dontColumn}>
              <View style={styles.dontHeader}>
                <Ionicons name="close-circle" size={24} color={theme.colors.palette.error[600]} />
                <Text style={styles.dontHeaderText}>DON&apos;T</Text>
              </View>
              {item.dont.map((dontItem: string, i: number) => (
                <View key={i} style={styles.dontItem}>
                  <Ionicons name="close" size={16} color={theme.colors.palette.error[600]} />
                  <Text style={styles.dontText}>{dontItem}</Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'exercise':
        return (
          <View key={index} style={styles.exerciseContainer}>
            {item.activities.map((activity: any, i: number) => (
              <View key={i} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{activity.name}</Text>
                <View style={styles.exerciseDetail}>
                  <Ionicons name="fitness" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.exerciseText}>{activity.examples}</Text>
                </View>
                <View style={styles.exerciseDetail}>
                  <Ionicons name="calendar" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.exerciseText}>{activity.frequency}</Text>
                </View>
                <View style={styles.exerciseDetail}>
                  <Ionicons name="speedometer" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.exerciseText}>{activity.intensity}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'emergency':
        return (
          <View key={index}>
            <Text style={styles.emergencyTitle}>{item.title}</Text>
            {item.signs.map((sign: any, i: number) => (
              <View
                key={i}
                style={[
                  styles.emergencyCard,
                  {
                    borderLeftColor:
                      sign.severity === 'critical'
                        ? theme.colors.palette.error[600]
                        : theme.colors.palette.warning[600],
                  },
                ]}
              >
                <View style={styles.emergencyHeader}>
                  <Ionicons
                    name={sign.severity === 'critical' ? 'alert-circle' : 'warning'}
                    size={20}
                    color={sign.severity === 'critical' ? theme.colors.palette.error[600] : theme.colors.palette.warning[600]}
                  />
                  <Text style={styles.emergencySymptom}>{sign.symptom}</Text>
                </View>
                <Text style={styles.emergencyDescription}>{sign.description}</Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
            <Ionicons name={section.icon} size={24} color={section.color} />
          </View>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionMeta}>
              <Ionicons name="time-outline" size={14} color={theme.colors.textTertiary} />
              <Text style={styles.sectionMetaText}>{section.estimatedTime}</Text>
              <View style={styles.metaDivider} />
              <Ionicons name="school-outline" size={14} color={theme.colors.textTertiary} />
              <Text style={styles.sectionMetaText}>{section.difficulty}</Text>
            </View>
          </View>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.sectionContent}>
          {section.content.map((item, index) => renderContent(item, index))}
        </View>
      )}
    </View>
  );
};

export default function EducationScreen() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['what-is-glp1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [bookmarkedSections, setBookmarkedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );

    // Mark as completed when collapsed
    if (expandedSections.includes(sectionId) && !completedSections.includes(sectionId)) {
      setCompletedSections((prev) => [...prev, sectionId]);
    }
  };

  const toggleBookmark = (sectionId: string) => {
    setBookmarkedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredSections = EDUCATION_SECTIONS.filter((section) => {
    const matchesSearch = searchQuery === '' || 
      section.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === null || 
      section.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Learn</Text>
              <Text style={styles.headerSubtitle}>
                Comprehensive guide to GLP-1 therapy
              </Text>
            </View>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search topics..."
              placeholderTextColor={theme.colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterPill, filterDifficulty === null && styles.filterPillActive]}
              onPress={() => setFilterDifficulty(null)}
            >
              <Text style={[styles.filterText, filterDifficulty === null && styles.filterTextActive]}>All</Text>
            </TouchableOpacity>
            {['Beginner', 'Intermediate', 'Important'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[styles.filterPill, filterDifficulty === difficulty && styles.filterPillActive]}
                onPress={() => setFilterDifficulty(difficulty)}
              >
                <Text style={[styles.filterText, filterDifficulty === difficulty && styles.filterTextActive]}>
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
            {bookmarkedSections.length > 0 && (
              <TouchableOpacity style={styles.filterPill}>
                <Ionicons name="bookmark" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.filterText}>Bookmarked ({bookmarkedSections.length})</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Progress Indicator */}
        <ProgressIndicator completed={completedSections.length} total={EDUCATION_SECTIONS.length} />

        {/* Medical Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Ionicons name="shield-checkmark" size={24} color={theme.colors.palette.info[600]} />
          <View style={styles.disclaimerContent}>
            <Text style={styles.disclaimerTitle}>Medical Information</Text>
            <Text style={styles.disclaimerText}>
              This content is for educational purposes only and does not replace professional medical advice.
              Always consult your healthcare provider for personalized guidance.
            </Text>
          </View>
        </View>

        {/* Quick Access Cards */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.quickAccessTitle}>Quick Access</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickAccessScroll}>
            <TouchableOpacity
              style={[styles.quickAccessCard, { borderColor: theme.colors.palette.error[400] }]}
              onPress={() => {
                const emergencySection = EDUCATION_SECTIONS.find(s => s.id === 'emergency');
                if (emergencySection) {
                  setExpandedSections(['emergency']);
                }
              }}
            >
              <Ionicons name="alert-circle" size={32} color={theme.colors.palette.error[600]} />
              <Text style={styles.quickAccessCardTitle}>Emergency Signs</Text>
              <Text style={styles.quickAccessCardText}>Know when to seek help</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAccessCard, { borderColor: theme.colors.palette.primary[400] }]}
              onPress={() => setExpandedSections(['injection'])}
            >
              <Ionicons name="medkit" size={32} color={theme.colors.palette.primary[600]} />
              <Text style={styles.quickAccessCardTitle}>Injection Guide</Text>
              <Text style={styles.quickAccessCardText}>Step-by-step tutorial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAccessCard, { borderColor: theme.colors.palette.success[400] }]}
              onPress={() => setExpandedSections(['nutrition'])}
            >
              <Ionicons name="restaurant" size={32} color={theme.colors.palette.success[600]} />
              <Text style={styles.quickAccessCardTitle}>Nutrition Tips</Text>
              <Text style={styles.quickAccessCardText}>Eating guidelines</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAccessCard, { borderColor: theme.colors.palette.info[400] }]}
              onPress={() => setExpandedSections(['travel'])}
            >
              <Ionicons name="airplane" size={32} color={theme.colors.palette.info[600]} />
              <Text style={styles.quickAccessCardTitle}>Travel Tips</Text>
              <Text style={styles.quickAccessCardText}>Medication on the go</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Education Sections */}
        <Text style={styles.sectionsTitle}>
          {searchQuery ? `Search Results (${filteredSections.length})` : 'All Topics'}
        </Text>
        {filteredSections.map((section) => (
          <View key={section.id} style={styles.sectionWrapper}>
            <EducationSection
              section={section}
              isExpanded={expandedSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => toggleBookmark(section.id)}
            >
              <Ionicons
                name={bookmarkedSections.includes(section.id) ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={theme.colors.palette.primary[600]}
              />
            </TouchableOpacity>
            {completedSections.includes(section.id) && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.palette.success[600]} />
              </View>
            )}
          </View>
        ))}

        {filteredSections.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={theme.colors.textTertiary} />
            <Text style={styles.emptyStateText}>No topics found</Text>
            <Text style={styles.emptyStateSubtext}>Try a different search term</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="call" size={20} color={theme.colors.textTertiary} />
          <Text style={styles.footerText}>
            Questions? Contact your healthcare provider or call the medication support line.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  headerIcon: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
  },
  filterContainer: {
    marginTop: theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  filterPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  progressContainer: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  progressPercentage: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  quickAccessContainer: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  quickAccessTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  quickAccessScroll: {
    marginHorizontal: -theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  quickAccessCard: {
    width: 160,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    marginRight: theme.spacing.md,
    alignItems: 'center',
  },
  quickAccessCardTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  quickAccessCardText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionsTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  sectionWrapper: {
    position: 'relative',
  },
  bookmarkButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.xl,
    padding: theme.spacing.xs,
    zIndex: 10,
  },
  completedBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.xxl + 32,
    zIndex: 10,
  },
  disclaimerCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.palette.info[50],
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.palette.info[600],
  },
  disclaimerContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  disclaimerTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.palette.info[900],
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.palette.info[800],
    lineHeight: 20,
  },
  sectionContainer: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionMetaText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.textTertiary,
    marginHorizontal: 4,
  },
  sectionContent: {
    padding: theme.spacing.lg,
    paddingTop: 0,
    gap: theme.spacing.md,
  },
  // Visualization Styles
  timelineContainer: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
  },
  visualizationTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    marginTop: 4,
    marginRight: theme.spacing.sm,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  timelineText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  bodyDiagramContainer: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
  },
  bodyDiagram: {
    alignItems: 'center',
  },
  bodyOutline: {
    width: '100%',
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  injectionSite: {
    position: 'absolute',
    alignItems: 'center',
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  abdomenSite: {
    top: '40%',
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  thighSite: {
    bottom: '20%',
    left: '30%',
  },
  armSite: {
    top: '25%',
    right: '15%',
  },
  siteLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginTop: 2,
  },
  injectionLegend: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  chartContainer: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
    paddingVertical: theme.spacing.md,
  },
  chartBar: {
    width: 30,
    borderRadius: theme.borderRadius.sm,
    minHeight: 20,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
  },
  chartLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  // Quick Reference Card Styles
  quickRefCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  quickRefHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  quickRefTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  quickRefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: 6,
  },
  quickRefText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  // Media Card Styles
  mediaCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mediaThumbnail: {
    width: 120,
    height: 80,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaInfo: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  mediaTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  mediaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mediaDuration: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  emptyStateText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
  },
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
  contentText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    lineHeight: 24,
  },
  contentHeading: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  listContainer: {
    gap: theme.spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    lineHeight: 22,
  },
  numberedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertBox: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  alertText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    lineHeight: 20,
  },
  sideEffectCard: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sideEffectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sideEffectName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  sideEffectTipsTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    marginTop: 4,
  },
  tipText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  doDontContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  doColumn: {
    flex: 1,
    backgroundColor: theme.colors.palette.success[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.palette.success[200],
  },
  dontColumn: {
    flex: 1,
    backgroundColor: theme.colors.palette.error[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.palette.error[200],
  },
  doHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  dontHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  doHeaderText: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.palette.success[900],
  },
  dontHeaderText: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.palette.error[900],
  },
  doItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  dontItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  doText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.palette.success[900],
    lineHeight: 20,
  },
  dontText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.palette.error[900],
    lineHeight: 20,
  },
  exerciseContainer: {
    gap: theme.spacing.md,
  },
  exerciseCard: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  exerciseName: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  exerciseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginTop: 4,
  },
  exerciseText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  emergencyTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emergencyCard: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    marginTop: theme.spacing.sm,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: 4,
  },
  emergencySymptom: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  emergencyDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginLeft: 28,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
  },
  footerText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textTertiary,
    lineHeight: 20,
  },
});
/**
 * Slider Component
 * Severity/intensity slider (1-5 scale)
 */

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    PanResponder,
    Animated,
} from 'react-native';
import { lightTheme } from '@/constants/theme';
import { Label, Body } from './Typography';

interface SliderProps {
    label?: string;
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
    labels?: string[];
}

export const Slider: React.FC<SliderProps> = ({
    label,
    min = 1,
    max = 5,
    value,
    onChange,
    labels = ['None', 'Mild', 'Moderate', 'Severe', 'Extreme'],
}) => {
    const theme = lightTheme;
    const [sliderWidth, setSliderWidth] = useState(0);

    const getColor = () => {
        if (value <= 2) return theme.colors.success;
        if (value <= 3) return theme.colors.advisory;
        if (value <= 4) return theme.colors.warning;
        return theme.colors.error;
    };

    const handleLayout = (event: any) => {
        setSliderWidth(event.nativeEvent.layout.width);
    };

    const handlePress = (event: any) => {
        if (sliderWidth === 0) return;
        const locationX = event.nativeEvent.locationX;
        const percentage = locationX / sliderWidth;
        const newValue = Math.round(min + percentage * (max - min));
        const clampedValue = Math.max(min, Math.min(max, newValue));
        onChange(clampedValue);
    };

    const thumbPosition = ((value - min) / (max - min)) * 100;

    return (
        <View style={styles.container}>
            {label && <Label style={styles.label}>{label}</Label>}

            <View style={styles.sliderContainer}>
                <View
                    style={styles.track}
                    onLayout={handleLayout}
                    onTouchEnd={handlePress}
                >
                    <View
                        style={[
                            styles.trackFill,
                            {
                                width: `${thumbPosition}%`,
                                backgroundColor: getColor(),
                            },
                        ]}
                    />
                    <View
                        style={[
                            styles.thumb,
                            {
                                left: `${thumbPosition}%`,
                                backgroundColor: getColor(),
                            },
                        ]}
                    >
                        <Body style={styles.thumbText}>{value}</Body>
                    </View>
                </View>
            </View>

            <View style={styles.labelsContainer}>
                <Body style={[styles.labelText, { color: theme.colors.textSecondary }]}>
                    {labels[value - 1]}
                </Body>
            </View>

            <View style={styles.scaleContainer}>
                {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((num) => (
                    <Body
                        key={num}
                        style={[
                            styles.scaleNumber,
                            {
                                color:
                                    num === value
                                        ? getColor()
                                        : theme.colors.textTertiary,
                                fontWeight: num === value ? '700' : '400',
                            },
                        ]}
                    >
                        {num}
                    </Body>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 12,
    },
    sliderContainer: {
        paddingVertical: 16,
    },
    track: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        position: 'relative',
    },
    trackFill: {
        height: 8,
        borderRadius: 4,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    thumb: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: -16,
        marginLeft: -20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    thumbText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    labelsContainer: {
        marginTop: 8,
        alignItems: 'center',
    },
    labelText: {
        fontSize: 14,
        fontWeight: '600',
    },
    scaleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 4,
    },
    scaleNumber: {
        fontSize: 12,
    },
});

export default Slider;

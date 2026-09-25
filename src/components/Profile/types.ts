
type MetricItem = {
    label: string,
    value: number,
    icon: 'graduation-cap' | 'clock-4' | 'star',
}

export type ProfileProps = {
    name: string;
    subtitle: string;
    avatar: string;
    metrics: MetricItem[];
    onPress: () => void;
    onLogout: () => void;
    userId?: string;
};
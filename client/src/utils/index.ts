
export function capitalizeAndFormat(s: string) {
    return (s[0].toUpperCase() + s.slice(1)).replace('_', ' ');
}
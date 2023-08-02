import useLocalStorage from 'use-local-storage';

function useTheme() {
    const [theme, setTheme] = useLocalStorage<string>('devify theme', 'Light');
    const switchTheme = () => {
        const newTheme: string = theme === 'Light' ? 'Dark' : 'Light';
        setTheme(newTheme);
    };
    return { theme, switchTheme };
}

export default useTheme;

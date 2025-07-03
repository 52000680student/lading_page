/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef7f0',
                    100: '#fdeee0',
                    200: '#fbd9c1',
                    300: '#f8be97',
                    400: '#f59a6b',
                    500: '#f57a26',
                    600: '#e6621e',
                    700: '#bf4d1a',
                    800: '#983f1c',
                    900: '#7c351a',
                },
                'light-blue': '#F0F8FF',
                'dark-grey': '#333333',
                'medium-grey': '#666666',
                'dark-footer': '#2c3e50',
            },
            fontFamily: {
                'nunito': ['Nunito Sans', 'sans-serif'],
                'heading': ['Inter', 'sans-serif'],
                'chakra-heading': ['Inter', 'sans-serif'],
                'body': ['Nunito Sans', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-up-delay': 'fadeInUp 0.6s ease-out 0.2s both',
                'parallax': 'parallax 20s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                parallax: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50px)' }
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(rgba(245, 122, 38, 0.7), rgba(245, 122, 38, 0.5))',
                'cta-gradient': 'linear-gradient(135deg, #f57a26, #e6621e)',
            },
            boxShadow: {
                'card': '0 5px 20px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 15px 40px rgba(245, 122, 38, 0.2)',
                'button': '0 4px 15px rgba(245, 122, 38, 0.3)',
            }
        },
    },
    plugins: [],
} 
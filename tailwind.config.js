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
                    50: '#f0fdfd',
                    100: '#ccfbfb',
                    200: '#99f6f6',
                    300: '#5eeaea',
                    400: '#26d0d0',
                    500: '#00a0a0',
                    600: '#008080',
                    700: '#006666',
                    800: '#065454',
                    900: '#0a4646',
                },
                'light-blue': '#F0F8FF',
                'dark-grey': '#333333',
                'medium-grey': '#666666',
                'dark-footer': '#2c3e50',
            },
            fontFamily: {
                'lato': ['Lato', 'sans-serif'],
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
                'hero-gradient': 'linear-gradient(rgba(0, 160, 160, 0.7), rgba(0, 160, 160, 0.5))',
                'cta-gradient': 'linear-gradient(135deg, #00A0A0, #008080)',
            },
            boxShadow: {
                'card': '0 5px 20px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 15px 40px rgba(0, 160, 160, 0.2)',
                'button': '0 4px 15px rgba(0, 160, 160, 0.3)',
            }
        },
    },
    plugins: [],
} 
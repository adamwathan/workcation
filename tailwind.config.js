module.exports = {
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '80': '20rem',
      },
      padding: {
        '5/6': '83.3333333%'
      }
    },
    customForms: theme => ({
      default: {
        'input, textarea, multiselect, select': {
          lineHeight: theme('lineHeight.snug'),
          color: theme('colors.white'),
          borderColor: 'transparent',
          borderRadius: theme('borderRadius.lg'),
          '&:focus': {
            borderColor: undefined,
            boxShadow: undefined,
          },
        },
        'input, textarea, multiselect': {
          backgroundColor: theme('colors.gray.900'),
          '&:focus': {
            color: theme('colors.gray.900'),
            backgroundColor: theme('colors.white'),
          },
        },
        'input, textarea': {
          '&::placeholder': {
            color: theme('colors.gray.600'),
          },
          '&:focus::placeholder': {
            color: theme('colors.gray.500'),
          },
        },
        select: {
          backgroundColor: theme('colors.gray.700'),
          boxShadow: theme('boxShadow.default'),
          iconColor: '#fff',
          icon: iconColor => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}"><path d="M17.62 10H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5c-1.2 0-2.3-.72-2.74-1.79l-3.5-7-.03-.06A3 3 0 0 1 5 9h5V4c0-1.1.9-2 2-2h1.62l4 8zM16 11.24L12.38 4H12v7H5a1 1 0 0 0-.93 1.36l3.5 7.02a1 1 0 0 0 .93.62H16v-8.76zm2 .76v8h2v-8h-2z"/></svg>`,
          '&:focus': {
            borderColor: undefined,
            boxShadow: undefined,
            backgroundColor: theme('colors.gray.600'),
          },
        },
        'checkbox, radio': {
          backgroundColor: theme('colors.gray.900'),
          borderColor: 'transparent',
          height: '1.5em',
          width: '1.5em',
          '&:focus': {
            borderColor: undefined,
            boxShadow: undefined,
            backgroundColor: theme('colors.gray.700'),
          },
          '&:checked': {
            iconColor: '#fff',
            backgroundColor: theme('colors.indigo.500'),
            borderColor: 'transparent',
            '&:focus': {
              backgroundColor: theme('colors.indigo.400'),
            }
          }
        },
      },
      light: {
        input: {
          backgroundColor: theme('colors.white'),
          borderColor: theme('borderColor.default'),
          placeholder: {
            color: theme('colors.gray.500'),
          },
          '&:focus': {
            borderColor: theme('colors.blue.400'),
            boxShadow: theme('boxShadow.outline'),
            placeholder: {
              color: theme('colors.gray.500'),
            },
          }
        }
      },
      sm: {
        input: {
          padding: `.25rem .5rem`,
          fontSize: `.875rem`,
          borderRadius: `4px`,
        }
      },
    })
  },
  variants: {},
  plugins: [
    require('./plugin'),
  ]
}
